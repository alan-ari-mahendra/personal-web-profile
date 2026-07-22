import { prisma } from "@/lib/prisma"
import type { DemoDefinition } from "@/lib/demos"

/**
 * Best-effort client IP. Next 16 dropped `request.ip`, and on Vercel the real
 * client is the first entry of x-forwarded-for. Falls back to a constant so a
 * missing header buckets everyone together rather than disabling the limit.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return headers.get("x-real-ip")?.trim() || "unknown"
}

export type QuotaVerdict =
  | { allowed: true; remaining: number }
  | { allowed: false; scope: "ip" | "global" }

// Lets you hammer the demo while testing locally without waiting out the
// 24h window or editing lib/demos.ts. Double-gated on NODE_ENV so a stray
// value in .env can never disable the real limit in production: `next dev`
// always sets NODE_ENV=development, `next build`/`next start` always set it
// to production, regardless of what .env says.
const RATE_LIMIT_DISABLED =
  process.env.NODE_ENV !== "production" && process.env.DEMO_DISABLE_RATE_LIMIT === "true"

export async function checkDemoQuota(demo: DemoDefinition, ip: string): Promise<QuotaVerdict> {
  if (RATE_LIMIT_DISABLED) return { allowed: true, remaining: demo.perIpPerDay }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const [ipRuns, globalRuns] = await Promise.all([
    prisma.demoRun.count({ where: { slug: demo.slug, ip, createdAt: { gte: since } } }),
    prisma.demoRun.count({ where: { slug: demo.slug, createdAt: { gte: since } } }),
  ])

  if (ipRuns >= demo.perIpPerDay) return { allowed: false, scope: "ip" }
  if (globalRuns >= demo.globalPerDay) return { allowed: false, scope: "global" }

  return { allowed: true, remaining: demo.perIpPerDay - ipRuns - 1 }
}

/** Runs left for this IP today, for display only. Never gates anything. */
export async function remainingRuns(demo: DemoDefinition, ip: string): Promise<number> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const used = await prisma.demoRun.count({
    where: { slug: demo.slug, ip, createdAt: { gte: since } },
  })
  return Math.max(0, demo.perIpPerDay - used)
}
