# n8n workflows for the live demos

`lead-enrichment-demo.json` powers <https://alanari.com/demo/lead-enrichment>.

It is a **stripped-down copy** of the production `Scrape Automation` workflow. Import it as a
separate workflow. Do not point the website at the production one.

## What was removed, and why

| Production | Public demo | Reason |
| --- | --- | --- |
| Gmail `Send Sales Email` | **Absent** | The production node mails whatever address arrives in the request body. Exposed publicly that is an open spam relay running through your Gmail account. The demo generates the copy and shows it instead. |
| No limit on places | Capped at 5 | One run in a dense city can otherwise return hundreds of places, each costing an LLM call. |
| Radius up to 10 km | Capped at 2 km | Keeps a run inside a minute. |
| Unbounded Overpass query | `out body 25 qt` cap | Without a limit in the query itself, a broad category (e.g. "restaurant", which matches 5 amenity types) in a dense area can ask Overpass's shared public server for thousands of elements. That is what trips their rate limiter, not the 5-lead cap in Pick Top Places, which only filters *after* the response already came back. |
| Data Table logging | Absent | The website stores runs in its own `DemoRun` table. |
| `Loop Over Places` batching | Absent | The LLM chain already runs once per input item, so the loop was doing nothing the chain does not. |
| Email body only from the LLM | Structured JSON | The demo shows pain points and the email separately, so the prompt now asks for `{painPoints, emailSubject, emailBody}`. |

## Request and response contract

The site sends:

```json
POST /webhook/demo-lead-enrichment
x-demo-secret: <shared secret>

{
  "runId": "clx...",
  "callbackUrl": "https://alanari.com/api/demo/callback",
  "callbackToken": "<one-time token>",
  "location": "Semarang, Indonesia",
  "category": "cafe",
  "radius": "1 km"
}
```

n8n answers on receipt and keeps working. When it finishes, `Send Result To Website` posts back:

```json
POST <callbackUrl>
x-demo-token: <the same one-time token>

{
  "runId": "clx...",
  "ok": true,
  "leads": [
    {
      "name": "Kopi Semesta",
      "category": "cafe",
      "address": "Jl. Pandanaran 12",
      "phone": null,
      "website": null,
      "email": null,
      "painPoints": ["...", "..."],
      "emailSubject": "...",
      "emailBody": "..."
    }
  ],
  "stats": { "placesScanned": 5, "leadsEnriched": 5, "radius": 1000, "category": "cafe" }
}
```

When nothing could be enriched it posts `ok: false` with a `reason` of `location_not_found`,
`no_places`, or `upstream_busy`, and the site renders a specific message for each.

The callback token is generated per run, stored on the `DemoRun` row, and cleared the moment the
callback lands. Nothing long-lived is kept inside the workflow, so this file is safe to commit.

## Setup

1. **Import** `lead-enrichment-demo.json` into n8n (Workflows → Import from File).
2. **Groq credential** — open `Groq Chat Model` and select your existing Groq account.
3. **Webhook auth** — open `Receive Demo Request`. Authentication is set to *Header Auth*; create a
   credential with header name `x-demo-secret` and a long random value. Without this, anyone who
   learns the URL can burn your Groq quota.
4. **Activate** the workflow and copy the *Production* webhook URL.
5. **Website env vars:**

   ```
   N8N_WEBHOOK_LEAD_ENRICHMENT=https://alan-workspace.app.n8n.cloud/webhook/demo-lead-enrichment
   N8N_DEMO_SECRET=<the same value as the Header Auth credential>
   PUBLIC_SITE_URL=https://alanari.com
   ```

   `PUBLIC_SITE_URL` is what the site tells n8n to call back. It must be publicly reachable, so on
   localhost you need a tunnel (`ngrok http 3000`) and that tunnel URL here. Without it n8n would be
   told to call `http://localhost:3000`, which resolves to the n8n container itself.

6. **Run limits** live in `lib/demos.ts` (`perIpPerDay`, `globalPerDay`). n8n Cloud bills per
   execution, so raise them deliberately.

## Testing without the UI

```bash
curl -X POST "$N8N_WEBHOOK_LEAD_ENRICHMENT" \
  -H "Content-Type: application/json" \
  -H "x-demo-secret: $N8N_DEMO_SECRET" \
  -d '{"runId":"test","callbackUrl":"https://webhook.site/<your-id>","callbackToken":"t","location":"Semarang, Indonesia","category":"cafe","radius":"1 km"}'
```

The result arrives at your webhook.site inbox roughly 30 to 60 seconds later.

## Troubleshooting: run stuck at "running"

`GET /api/demo/run/[runId]` just reads Postgres, so a run stuck at `status: "running"` for a long
time means the callback never landed. Check n8n's **Executions** tab for that run first — it tells
you exactly which node failed or how long each one took, which this README cannot.

Things that cause this in practice:

- **Overpass rate-limited or timed out.** `Fetch Nearby Places` has `onError: continueErrorOutput`,
  so this should resolve in ~24s with `reason: "upstream_busy"`, not hang. If you still see it hang
  past that, the query itself may be too broad for the free public Overpass instance under load —
  try a narrower category or smaller radius.
- **The callback POST failed silently.** If the site was unreachable for a moment (dev server
  restarted, ngrok tunnel reconnecting) when `Send Result To Website` fired, older versions of this
  workflow would drop the result with no retry, and the site's own 3-minute timeout
  (`DEMO_RUN_TIMEOUT_MS` in `lib/demos.ts`) is what eventually flips the row to `error`. The node
  now retries 3 times with a 2s gap, so keep the dev server and tunnel up before starting a run.
- **An uncaught error elsewhere in the graph.** Only `Fetch Nearby Places` has explicit error
  handling. A crash in `Build Overpass Query`, `Pick Top Places`, or `Analyze Lead` stops the
  execution before it ever reaches `Send Result To Website`, and the site has no way to know — it
  will always wait out the full 3-minute timeout. The Executions tab will show exactly where it
  died.
