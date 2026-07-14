import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/project-card"
import { ToolIcon } from "@/components/tool-icon"
import { Reveal } from "@/components/reveal"
import {
  LayoutDashboard,
  Zap,
  Network,
  Cloud,
  Quote,
  Languages,
} from "lucide-react"

const FEATURED_TITLES = ["DineLead", "Learnify", "Finalstrip", "Mubashir"]

const PROOF_STATS = [
  { value: "3+", label: "Professional Experience" },
  { value: "38+", label: "Projects shipped" },
  { value: "9+", label: "Industries served" },
  { value: "90%", label: "Client retention rate" },
]

const SERVICES = [
  {
    number: "01",
    Icon: LayoutDashboard,
    title: "AI-Powered SaaS Development",
    description:
      "Full SaaS builds with AI at the core: auth, subscriptions, dashboards, and LLM features shipped as one production system, not bolted on after.",
  },
  {
    number: "02",
    Icon: Network,
    title: "LLM Integration & RAG Systems",
    description:
      "Grounding AI in your real data. RAG pipelines, vector search, and structured LLM outputs built to cut hallucinations and stay reliable in production.",
  },
  {
    number: "03",
    Icon: Zap,
    title: "AI Automation & Agentic Workflows",
    description:
      "Multi-step automation and agentic workflows that handle real work like lead enrichment, outreach, and data pipelines, cutting manual effort without losing control.",
  },
  {
    number: "04",
    Icon: Cloud,
    title: "Architecture & Production Deployment",
    description:
      "The engineering underneath the product: scalable system design, robust APIs, CI/CD, and the monitoring that keeps AI features dependable at scale.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Great to work with, Greatly appreciated his suggestions. Went above and beyond to make changes with the back and despite not originally hired for it",
    name: "Justin Dion",
    role: "Founder",
    company: "Finalstrip",
  },
  {
    quote:
      "Alan is a young great talent. His communication was top-notch, he met all deadlines, and his skills were reasonably strong. Will certainly hire again on our next project.",
    name: "Luca S",
    role: "Chief Product & Technology Strategist",
    company: "FLNT",
  },
  {
    quote:
      "The internal tool Alan built transformed how our team operates. Fast delivery, clean architecture, and great collaboration across time zones.",
    name: "Rodney Boyd",
    role: "CEO and Founder",
    company: "FranchiZeManager",
  },
]

export default async function Home() {
  const [allFeatured, categories] = await Promise.all([
    prisma.project.findMany({
      where: { title: { in: FEATURED_TITLES } },
    }),
    prisma.toolCategory.findMany({
      orderBy: { order: "asc" },
      include: { tools: { orderBy: { order: "asc" } } },
    }),
  ])

  const featuredProjects = FEATURED_TITLES.map((title) =>
    allFeatured.find((p) => p.title === title)
  ).filter(Boolean) as typeof allFeatured

  const topTools = categories.flatMap((c) => c.tools.slice(0, 3))

  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">

      {/* Hero */}
      <section className="mb-16">
        <Reveal>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-green-950/80 text-green-400 border border-green-900/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full text-subtle border border-line">
              <Languages size={11} className="flex-shrink-0" />
              English · Fluent
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-5xl font-bold tracking-[-0.04em] leading-[1.1] text-ink mb-3 max-md:text-4xl max-sm:text-3xl">
            Alan Ari Mahendra
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-ink/80 mb-4 max-md:text-xl">
            Building <span className="text-brand-2">AI-Powered SaaS</span>, End-to-End
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="text-base text-subtle mb-8 leading-[1.7] max-w-[560px]">
            I help startups and agencies ship production SaaS with{" "}
            <span className="text-brand-2 font-medium">AI baked in</span>: LLM
            features, RAG, and automation, with clean and reliable code from
            architecture to deploy.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/projects"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-brand text-black hover:opacity-90 transition-opacity duration-150"
            >
              View projects
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-line text-ink hover:bg-surface-2 transition-colors duration-150"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Proof bar */}
      <Reveal as="section" className="mb-16">
        <div className="grid grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line max-sm:grid-cols-2">
          {PROOF_STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1 px-5 py-4 bg-surface">
              <span className="text-xl font-bold text-ink tracking-[-0.02em] leading-none">
                {value}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-subtle leading-none">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Featured projects */}
      <Reveal as="section" className="mb-16">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Featured projects
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4 max-sm:grid-cols-1">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-subtle hover:text-brand transition-colors duration-150"
        >
          View all projects →
        </Link>
      </Reveal>

      {/* Tech stack */}
      <Reveal as="section" className="mb-16">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Tech stack
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {topTools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-line bg-surface hover:border-white/20 transition-colors duration-150"
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-black"
                style={{ backgroundColor: tool.bg }}
              >
                <ToolIcon icon={tool.icon} size={14} />
              </div>
              <span className="text-sm font-mono text-ink font-medium whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/tools"
          className="text-sm font-medium text-subtle hover:text-brand transition-colors duration-150"
        >
          View full stack →
        </Link>
      </Reveal>

      {/* Services */}
      <Reveal as="section" className="mb-16">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-mono font-semibold tracking-[0.12em] uppercase text-subtle border border-line rounded-full px-3 py-1 mb-4">
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink mb-3 max-sm:text-2xl">
            What I Build
          </h2>
          <p className="text-sm text-subtle max-w-[420px] mx-auto leading-[1.65]">
            Comprehensive solutions tailored to bring your{" "}
            <span className="text-brand-2 font-medium">vision to life</span>.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          {SERVICES.map(({ number, Icon, title, description }) => (
            <div
              key={number}
              className="relative flex flex-col gap-3 p-5 rounded-xl border border-line bg-surface hover:border-white/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:-translate-y-1 transition-all duration-300 ease-snappy"
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-semibold text-white/15 tabular-nums">
                {number}
              </span>
              <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-subtle" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink mb-1.5 leading-[1.3] pr-6">
                  {title}
                </div>
                <p className="text-xs text-subtle leading-[1.65]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Testimonials */}
      <Reveal as="section" className="mb-16">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Testimonials
        </h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {TESTIMONIALS.map(({ quote, name, role, company }) => (
            <div
              key={name + role}
              className="flex flex-col gap-4 p-5 rounded-xl border border-line bg-surface"
            >
              <Quote size={16} className="text-white/15 flex-shrink-0" />
              <p className="text-sm text-ink/80 leading-[1.7] flex-1">{quote}</p>
              <div className="border-t border-line pt-3">
                <div className="text-sm font-semibold text-ink">{name}</div>
                <div className="text-xs text-subtle">
                  {role} · {company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="py-10 px-8 rounded-xl border border-line bg-surface text-center max-sm:px-5 max-sm:py-8">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink mb-2 max-sm:text-xl">
          Let&apos;s build something together
        </h2>
        <p className="text-sm text-subtle mb-6 max-w-[380px] mx-auto leading-[1.65]">
          Open to new projects: SaaS, e-commerce, internal tools, or anything
          interesting. Async-first, available across global timezones.
        </p>
        <Link
          href="/contact"
          className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg bg-brand text-black hover:opacity-90 transition-opacity duration-150"
        >
          Get in touch →
        </Link>
      </Reveal>

    </div>
  )
}
