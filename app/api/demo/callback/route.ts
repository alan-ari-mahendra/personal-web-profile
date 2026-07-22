import { timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { demoResultSchema } from "@/lib/demos"

export const runtime = "nodejs"

function tokensMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

// Receives the finished run from n8n. Authenticated by the per-run token that
// /api/demo/[slug]/run generated, which is cleared here so it cannot be
// replayed to overwrite a completed run.
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-demo-token")
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = demoResultSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { runId, ok, reason, leads, stats } = parsed.data

  const run = await prisma.demoRun.findUnique({
    where: { id: runId },
    select: { id: true, status: true, callbackToken: true, createdAt: true },
  })

  if (!run || !run.callbackToken || !tokensMatch(run.callbackToken, token)) {
    // Same response for unknown run and bad token so the endpoint cannot be
    // used to probe which run ids exist.
    return NextResponse.json({ error: "Not authorised" }, { status: 401 })
  }

  // `ok: false` means the workflow ran fine but found nothing to enrich, e.g.
  // the location did not resolve. That is an empty result, not a failure.
  const status = ok && leads.length > 0 ? "success" : "empty"

  await prisma.demoRun.update({
    where: { id: run.id },
    data: {
      status,
      reason: reason ?? null,
      result: { leads, stats: stats ?? {} },
      durationMs: Date.now() - run.createdAt.getTime(),
      callbackToken: null,
    },
  })

  return NextResponse.json({ received: true })
}
