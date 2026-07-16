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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
