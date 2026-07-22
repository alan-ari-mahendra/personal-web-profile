import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { MarketingProjectCard } from "@/components/marketing/project-card"

export const metadata: Metadata = {
  title: "Projects - Alan Ari Mahendra",
  description:
    "Systems Alan Ari Mahendra has shipped to production: ERP, CRM, LMS, e-commerce, and AI-powered web apps built with Next.js, React, Node, and more.",
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { status: "active" },
    orderBy: { createdAt: "asc" },
  })

  return (
    <main className="relative overflow-hidden">
      <div className="blob -left-32 -top-32 h-96 w-96 bg-primary-200" />
      <div className="blob -right-24 top-40 h-80 w-80 bg-secondary-100" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">Portfolio</span>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Systems I&apos;ve shipped
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            ERP, CRM, LMS, e-commerce, and AI-powered products, built end-to-end and running in
            production.
          </p>
        </div>

        {/* Live demo banner. Sits above the grid because a runnable workflow is
            the strongest proof on this page. */}
        <Link
          href="/demo/lead-enrichment"
          className="group mt-12 flex flex-col items-start gap-5 rounded-2xl border-2 border-primary-200 bg-primary-50/40 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg sm:flex-row sm:items-center sm:p-8"
        >
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary-600 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg font-bold text-slate-900">
                Lead Enrichment automation
              </span>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Live demo
              </span>
            </span>
            <span className="mt-1 block text-sm text-slate-600">
              Run the real n8n workflow yourself: pick a city, get back qualified leads with their
              pain points and a cold email already written.
            </span>
          </span>
          <span className="inline-flex flex-none items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-primary-700">
            Try it now
          </span>
        </Link>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <MarketingProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </section>
    </main>
  )
}
