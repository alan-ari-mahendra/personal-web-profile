import { randomBytes } from "node:crypto"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getDemo, demoInputSchema } from "@/lib/demos"
import { checkDemoQuota, clientIp } from "@/lib/demo-runs"

export const runtime = "nodejs"

// Kicks off a demo run. The n8n workflow answers on receipt and keeps working
// in the background, so this handler returns a runId straight away and the
// browser polls /api/demo/run/[runId] until the callback lands.
export async function POST(req: NextRequest, ctx: RouteContext<"/api/demo/[slug]/run">) {
  const { slug } = await ctx.params

  const demo = getDemo(slug)
  if (!demo) {
    return NextResponse.json({ error: "Unknown demo" }, { status: 404 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  // Honeypot. Real browsers leave it empty because it is visually hidden and
  // marked aria-hidden; bots that fill every field get a plausible-looking
  // success so they have nothing to tune against.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ runId: "hp_" + randomBytes(8).toString("hex") }, { status: 202 })
  }

  const parsed = demoInputSchema(demo).safeParse(body.input)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 })
  }

  const ip = clientIp(req.headers)
  const quota = await checkDemoQuota(demo, ip)
  if (!quota.allowed) {
    return NextResponse.json(
      {
        error:
          quota.scope === "ip"
            ? `You have used all ${demo.perIpPerDay} demo runs for today. Get in touch and I will run it live on your own target list.`
            : "The demo has hit its daily limit. Get in touch and I will run it live for you.",
        scope: quota.scope,
      },
      { status: 429 },
    )
  }

  const webhookUrl = process.env[demo.webhookEnv]
  if (!webhookUrl) {
    console.error(`Demo "${demo.slug}" is missing env var ${demo.webhookEnv}`)
    return NextResponse.json({ error: "The demo is not available right now." }, { status: 503 })
  }

  // Per-run bearer token. n8n echoes it back on the callback, which proves the
  // result belongs to a run this server actually started. No long-lived shared
  // secret has to be stored inside the workflow.
  const callbackToken = randomBytes(24).toString("hex")

  const run = await prisma.demoRun.create({
    data: { slug: demo.slug, ip, input: parsed.data, callbackToken },
    select: { id: true },
  })

  const origin = process.env.PUBLIC_SITE_URL ?? req.nextUrl.origin

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-secret": process.env.N8N_DEMO_SECRET ?? "",
      },
      body: JSON.stringify({
        runId: run.id,
        callbackUrl: `${origin}/api/demo/callback`,
        callbackToken,
        ...parsed.data,
      }),
      signal: AbortSignal.timeout(15_000),
    })

    if (!res.ok) throw new Error(`n8n responded ${res.status}`)
  } catch (err) {
    console.error("Failed to trigger n8n demo webhook", err)
    await prisma.demoRun.update({
      where: { id: run.id },
      data: { status: "error", reason: "trigger_failed", callbackToken: null },
    })
    return NextResponse.json({ error: "Could not start the workflow. Please try again." }, { status: 502 })
  }

  return NextResponse.json(
    { runId: run.id, remaining: quota.remaining, estimatedSeconds: demo.estimatedSeconds },
    { status: 202 },
  )
}
