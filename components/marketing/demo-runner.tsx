"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import type { DemoDefinition, Lead } from "@/lib/demos"
import { demoDefaults } from "@/lib/demos"
import { DemoLeadResults } from "@/components/marketing/demo-lead-results"

type RunState = "idle" | "running" | "done" | "empty" | "error"

const POLL_INTERVAL_MS = 2000

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"

function emptyMessage(reason: string | null): string {
  if (reason === "location_not_found")
    return "I could not find that location on the map. Try a more specific place, for example \"Semarang, Indonesia\" instead of just \"Semarang\"."
  if (reason === "upstream_busy")
    return "The OpenStreetMap query service is rate limiting right now. Give it a minute and run it again."
  return "No businesses of that type were found in this radius. Try a bigger radius or a busier area."
}

function errorMessage(reason: string | null): string {
  if (reason === "timeout")
    return "The workflow took longer than expected and the run was dropped. This happens when the OpenStreetMap API is busy."
  return "Something went wrong while running the workflow."
}

export function DemoRunner({ demo }: { demo: DemoDefinition }) {
  const [values, setValues] = useState<Record<string, string>>(() => demoDefaults(demo))
  const [honeypot, setHoneypot] = useState("")
  const [state, setState] = useState<RunState>("idle")
  const [leads, setLeads] = useState<Lead[]>([])
  const [durationMs, setDurationMs] = useState<number | null>(null)
  const [reason, setReason] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimers = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current)
    if (tickRef.current) clearInterval(tickRef.current)
    pollRef.current = null
    tickRef.current = null
  }, [])

  useEffect(() => stopTimers, [stopTimers])

  const poll = useCallback(
    async (runId: string) => {
      try {
        const res = await fetch(`/api/demo/run/${runId}`, { cache: "no-store" })
        if (res.status === 404) {
          // No such run, so no callback is ever coming. Bail out rather than
          // polling a dead id forever.
          stopTimers()
          setState("error")
          return
        }
        if (!res.ok) return
        const data = await res.json()

        if (data.status === "running") return

        stopTimers()
        setReason(data.reason ?? null)

        if (data.status === "success") {
          setLeads(data.result?.leads ?? [])
          setDurationMs(data.durationMs ?? null)
          setState("done")
        } else if (data.status === "empty") {
          setState("empty")
        } else {
          setState("error")
        }
      } catch {
        // Network blip. The next tick retries, and the server-side timeout is
        // the ultimate backstop.
      }
    },
    [stopTimers],
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "running") return

    stopTimers()
    setState("running")
    setLeads([])
    setMessage(null)
    setReason(null)
    setElapsed(0)

    try {
      const res = await fetch(`/api/demo/${demo.slug}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: values, company: honeypot }),
      })
      const data = await res.json()

      if (!res.ok) {
        setState("error")
        setMessage(data.error ?? "Could not start the workflow.")
        return
      }

      if (typeof data.remaining === "number") setRemaining(data.remaining)

      const started = Date.now()
      tickRef.current = setInterval(() => setElapsed(Date.now() - started), 250)
      pollRef.current = setInterval(() => void poll(data.runId), POLL_INTERVAL_MS)
    } catch {
      setState("error")
      setMessage("Could not reach the server. Please try again.")
    }
  }

  function applyPreset(preset: Record<string, string>) {
    setValues((current) => ({ ...current, ...preset }))
  }

  // The stepper is paced off the estimate rather than real per-node progress,
  // so it never claims the last step is finished until the result is in.
  const stepDuration = (demo.estimatedSeconds * 1000) / demo.steps.length
  const activeStep = Math.min(Math.floor(elapsed / stepDuration), demo.steps.length - 1)
  const running = state === "running"

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28"
      >
        <h3 className="font-display text-lg font-bold text-slate-900">Run it yourself</h3>
        <p className="mt-1 text-sm text-slate-500">
          Pick a target and the real workflow runs on my n8n instance.
        </p>

        <div className="mt-5 space-y-4">
          {demo.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-xs font-semibold text-slate-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  value={values[field.name]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                  className={inputClass}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type="text"
                  required
                  maxLength={field.maxLength}
                  value={values[field.name]}
                  placeholder={field.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                  className={inputClass}
                />
              )}
            </div>
          ))}
        </div>

        {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-700">Or try a preset</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {demo.presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.values)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={running}
          className="mt-6 w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? "Running workflow…" : "Run the automation"}
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">
          {remaining !== null
            ? `${remaining} of ${demo.perIpPerDay} runs left today`
            : `${demo.perIpPerDay} runs per visitor per day · no sign-up`}
        </p>
      </form>

      {/* Output */}
      <div className="min-h-[420px] rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        {state === "idle" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-500">
              Results appear here. The workflow scans real businesses, infers what each one is
              struggling with, and drafts a cold email for it.
            </p>
          </div>
        )}

        {running && (
          <div className="flex h-full min-h-[360px] flex-col justify-center">
            <ol className="mx-auto w-full max-w-sm space-y-4">
              {demo.steps.map((step, i) => {
                const done = i < activeStep
                const current = i === activeStep
                return (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold transition ${
                        done
                          ? "bg-emerald-500 text-white"
                          : current
                            ? "bg-primary-600 text-white"
                            : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-sm transition ${
                        current ? "font-semibold text-slate-900" : done ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {step}
                    </span>
                    {current && (
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500"
                      />
                    )}
                  </li>
                )
              })}
            </ol>
            <p className="mt-8 text-center text-xs text-slate-400">
              {Math.round(elapsed / 1000)}s elapsed · usually finishes in about {demo.estimatedSeconds}s
            </p>
          </div>
        )}

        {state === "done" && (
          <div>
            <DemoLeadResults leads={leads} durationMs={durationMs} />
            <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/60 p-5 text-center">
              <p className="font-display text-base font-bold text-slate-900">
                Want this pointed at your actual market?
              </p>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-600">
                The production version runs on a schedule, has no cap on leads, and sends the emails
                for you.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                Let&apos;s talk about your workflow
              </Link>
            </div>
          </div>
        )}

        {state === "empty" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
            <p className="font-display text-base font-bold text-slate-900">Nothing to enrich</p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">{emptyMessage(reason)}</p>
            <button
              onClick={() => setState("idle")}
              className="mt-4 text-xs font-semibold text-primary-600 underline underline-offset-2"
            >
              Try another search
            </button>
          </div>
        )}

        {state === "error" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
            <p className="font-display text-base font-bold text-slate-900">The demo is taking a break</p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">{message ?? errorMessage(reason)}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setState("idle")}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
              >
                Try again
              </button>
              <Link
                href="/contact"
                className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
              >
                Ask me to run it for you
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
