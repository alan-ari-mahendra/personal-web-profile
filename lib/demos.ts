import { z } from "zod"

// Registry of the live workflow demos exposed at /demo/[slug].
//
// Config lives in code rather than the database on purpose: the result renderer
// has to be written by hand anyway, so a DB-backed config would only move half
// the definition out of sight without removing a deploy.

export type DemoSelectField = {
  name: string
  label: string
  type: "select"
  options: { value: string; label: string }[]
  defaultValue: string
}

export type DemoTextField = {
  name: string
  label: string
  type: "text"
  placeholder: string
  defaultValue: string
  maxLength: number
}

export type DemoField = DemoTextField | DemoSelectField

export type DemoDefinition = {
  slug: string
  title: string
  tagline: string
  /** The business problem, in the client's words rather than the engineer's. */
  problem: string
  /** What the automation replaces. Rendered as a stat strip. */
  impact: { value: string; label: string }[]
  /** Honest description of what the public demo does and does not do. */
  guardrails: string[]
  /** Labels for the progress stepper while the run is in flight. */
  steps: string[]
  fields: DemoField[]
  presets: { label: string; values: Record<string, string> }[]
  /** Rough wall-clock time, used to pace the stepper. */
  estimatedSeconds: number
  /** Env var holding the n8n webhook URL. Never sent to the browser. */
  webhookEnv: string
  repoUrl: string
  /** Runs allowed per IP per rolling 24h. */
  perIpPerDay: number
  /** Runs allowed across all visitors per rolling 24h. */
  globalPerDay: number
}

export const DEMOS: DemoDefinition[] = [
  {
    slug: "lead-enrichment",
    title: "Lead Enrichment for local F&B",
    tagline:
      "Point it at a city, get back qualified restaurant leads with their likely pain points and a personalised cold email already written.",
    problem:
      "Finding local businesses to pitch is hours of manual work: search maps, copy names into a sheet, open each website, guess what they need, then write every email from scratch. This workflow does the whole pass in under a minute.",
    impact: [
      { value: "~15 hrs", label: "saved per week" },
      { value: "5 leads", label: "enriched per run" },
      { value: "< 60 s", label: "end to end" },
    ],
    guardrails: [
      "The demo caps each run at 5 leads and a 2 km radius. The production workflow has no cap.",
      "No email is sent. The demo generates the copy and shows it to you. Sending is wired up in the production version.",
      "Business data comes from OpenStreetMap, which is public and open licensed.",
    ],
    steps: [
      "Resolving the location",
      "Scanning nearby businesses",
      "Reading each business profile",
      "Inferring pain points with AI",
      "Writing personalised emails",
    ],
    fields: [
      {
        name: "location",
        label: "City or area",
        type: "text",
        placeholder: "Jakarta, Indonesia",
        defaultValue: "Semarang, Indonesia",
        maxLength: 80,
      },
      {
        name: "category",
        label: "Business type",
        type: "select",
        defaultValue: "restaurant",
        options: [
          { value: "restaurant", label: "Restaurants (all F&B)" },
          { value: "cafe", label: "Cafes and coffee shops" },
          { value: "fast food", label: "Fast food" },
          { value: "bar", label: "Bars and pubs" },
        ],
      },
      {
        name: "radius",
        label: "Search radius",
        type: "select",
        defaultValue: "1 km",
        options: [
          { value: "500 m", label: "500 m" },
          { value: "1 km", label: "1 km" },
          { value: "2 km", label: "2 km" },
        ],
      },
    ],
    presets: [
      { label: "Cafes in Semarang", values: { location: "Semarang, Indonesia", category: "cafe", radius: "1 km" } },
      { label: "Restaurants in Jakarta", values: { location: "Jakarta, Indonesia", category: "restaurant", radius: "1 km" } },
      { label: "Bars in Bali", values: { location: "Seminyak, Bali", category: "bar", radius: "2 km" } },
      { label: "Cafes in Singapore", values: { location: "Tanjong Pagar, Singapore", category: "cafe", radius: "1 km" } },
    ],
    estimatedSeconds: 40,
    webhookEnv: "N8N_WEBHOOK_LEAD_ENRICHMENT",
    repoUrl: "https://github.com/alan-ari-mahendra",
    perIpPerDay: 3,
    globalPerDay: 80,
  },
]

export function getDemo(slug: string): DemoDefinition | undefined {
  return DEMOS.find((d) => d.slug === slug)
}

export const demoSlugs = DEMOS.map((d) => d.slug)

/** Field defaults, used to seed the form on first paint. */
export function demoDefaults(demo: DemoDefinition): Record<string, string> {
  return Object.fromEntries(demo.fields.map((f) => [f.name, f.defaultValue]))
}

/**
 * Builds a zod schema from the field list so the browser and the route handler
 * can never drift apart. Selects are validated against their own option list,
 * which also stops anyone hand-rolling a request with a wild category value.
 */
export function demoInputSchema(demo: DemoDefinition) {
  const shape: Record<string, z.ZodType<string>> = {}
  for (const field of demo.fields) {
    if (field.type === "select") {
      const allowed = field.options.map((o) => o.value)
      shape[field.name] = z.string().refine((v) => allowed.includes(v), {
        message: `Invalid value for ${field.name}`,
      })
    } else {
      shape[field.name] = z.string().trim().min(2).max(field.maxLength)
    }
  }
  return z.object(shape)
}

// ---------------------------------------------------------------------------
// Result shape returned by the n8n callback. Validated on the way in, because
// it arrives over the public internet.

export const leadSchema = z.object({
  name: z.string(),
  category: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  painPoints: z.array(z.string()).default([]),
  emailSubject: z.string().default(""),
  emailBody: z.string().default(""),
})

export const demoResultSchema = z.object({
  runId: z.string().min(1),
  ok: z.boolean(),
  reason: z.string().optional(),
  stats: z
    .object({
      placesScanned: z.number().optional(),
      leadsEnriched: z.number().optional(),
      radius: z.number().optional(),
      category: z.string().optional(),
    })
    .optional(),
  leads: z.array(leadSchema).default([]),
})

export type Lead = z.infer<typeof leadSchema>
export type DemoResult = z.infer<typeof demoResultSchema>

/** A run stuck in `running` past this is treated as failed by the poll route. */
export const DEMO_RUN_TIMEOUT_MS = 3 * 60 * 1000
