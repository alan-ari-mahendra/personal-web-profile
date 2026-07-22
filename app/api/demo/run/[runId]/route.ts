import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { DEMO_RUN_TIMEOUT_MS } from "@/lib/demos"

export const runtime = "nodejs"

// Polled by the browser every couple of seconds while a run is in flight. Reads
// Postgres only, so it stays cheap no matter how long the workflow takes.
export async function GET(_req: NextRequest, ctx: RouteContext<"/api/demo/run/[runId]">) {
  const { runId } = await ctx.params

  const run = await prisma.demoRun.findUnique({
    where: { id: runId },
    select: {
      id: true,
      slug: true,
      status: true,
      reason: true,
      result: true,
      durationMs: true,
      createdAt: true,
    },
  })

  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 })
  }

  // n8n has no way to tell us it died mid-execution, so a run that never got a
  // callback is written off here rather than spinning in the UI forever.
  if (run.status === "running" && Date.now() - run.createdAt.getTime() > DEMO_RUN_TIMEOUT_MS) {
    await prisma.demoRun.update({
      where: { id: run.id },
      data: { status: "error", reason: "timeout", callbackToken: null },
    })
    return NextResponse.json({ status: "error", reason: "timeout" })
  }

  return NextResponse.json({
    status: run.status,
    reason: run.reason,
    result: run.result,
    durationMs: run.durationMs,
    elapsedMs: Date.now() - run.createdAt.getTime(),
  })
}
