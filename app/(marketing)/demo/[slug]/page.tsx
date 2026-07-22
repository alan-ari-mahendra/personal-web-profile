import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DEMOS, getDemo } from "@/lib/demos"
import { DemoRunner } from "@/components/marketing/demo-runner"

export function generateStaticParams() {
  return DEMOS.map((demo) => ({ slug: demo.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const demo = getDemo(slug)
  if (!demo) return {}

  return {
    title: `${demo.title} - Live demo - Alan Ari Mahendra`,
    description: demo.tagline,
  }
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const demo = getDemo(slug)
  if (!demo) notFound()

  return (
    <main className="relative overflow-hidden">
      <div className="blob -left-32 -top-32 h-96 w-96 bg-primary-200" />
      <div className="blob -right-24 top-40 h-80 w-80 bg-secondary-100" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live demo · runs the real workflow
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {demo.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{demo.tagline}</p>

          <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-4">
            {demo.impact.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-extrabold text-primary-600">{stat.value}</div>
                <div className="mt-0.5 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The problem */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">The problem it solves</h2>
          <p className="mt-3 text-slate-600">{demo.problem}</p>
        </div>

        {/* Runner */}
        <div className="mt-10">
          <DemoRunner demo={demo} />
        </div>

        {/* How it works */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900">
            What happens when you press run
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demo.steps.map((step, i) => (
              <li key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-sm font-bold text-primary-600">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-900">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Guardrails, stated plainly rather than buried */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold text-slate-900">
            How the demo differs from the production build
          </h2>
          <ul className="mt-4 space-y-3">
            {demo.guardrails.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing CTA */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700"
            >
              Build something like this for me
            </Link>
            <a
              href={demo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-600"
            >
              See the workflow on GitHub
            </a>
          </div>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
