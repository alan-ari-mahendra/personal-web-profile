import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/project-card"
import { ToolIcon } from "@/components/tool-icon"
import {
  Layers,
  LayoutDashboard,
  GitMerge,
  Cpu,
  Zap,
  Network,
  Cloud,
  Sparkles,
  Quote,
} from "lucide-react"

const FEATURED_TITLES = ["DineLead", "Learnify", "Finalstrip", "Mubashir"]

const PROOF_STATS = [
  { value: "3+", label: "Years experience" },
  { value: "38+", label: "Projects shipped" },
  { value: "SaaS · CRM · LMS", label: "Product types" },
  { value: "Global", label: "Async-first" },
]

const SERVICES = [
  {
    number: "01",
    Icon: Layers,
    title: "Full Stack Development",
    description:
      "End-to-end development of scalable web applications using modern frontend and backend technologies.",
  },
  {
    number: "02",
    Icon: LayoutDashboard,
    title: "SaaS Platform Development",
    description:
      "Building complete SaaS systems including authentication, subscription, dashboards, and automation workflows.",
  },
  {
    number: "03",
    Icon: GitMerge,
    title: "API & System Integration",
    description:
      "Designing robust APIs and integrating third-party services such as payment gateways, automation tools, and external platforms.",
  },
  {
    number: "04",
    Icon: Cpu,
    title: "Automation & Backend Systems",
    description:
      "Developing automation pipelines, background processing, and backend systems to improve efficiency and scalability.",
  },
  {
    number: "05",
    Icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimizing applications for speed, scalability, and reliability with production-ready performance standards.",
  },
  {
    number: "06",
    Icon: Network,
    title: "System Architecture",
    description:
      "Designing scalable and maintainable system architecture for complex web platforms and long-term growth.",
  },
  {
    number: "07",
    Icon: Cloud,
    title: "Cloud & Deployment",
    description:
      "Deploying and managing applications with modern cloud infrastructure, CI/CD, and reliable production environments.",
  },
  {
    number: "08",
    Icon: Sparkles,
    title: "AI & Automation Integration",
    description:
      "Integrating AI and automation into web systems to build smarter, more efficient, and intelligent applications.",
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
        <h1 className="text-5xl font-bold tracking-[-0.04em] leading-[1.1] text-[#111111] mb-3 max-md:text-4xl max-sm:text-3xl">
          Alan Ari Mahendra
        </h1>
        <p className="text-2xl font-semibold tracking-[-0.02em] text-[#374151] mb-4 max-md:text-xl">
          Building Scalable Digital Experiences
        </p>
        <p className="text-base text-[#6B7280] mb-8 leading-[1.7] max-w-[560px]">
          Helping startups, businesses, and agencies build scalable,
          high-performance web applications and AI-integrated systems —
          end-to-end, with clean and reliable code.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/projects"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#111111] text-white hover:bg-[#333333] transition-colors duration-150"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#111111] hover:bg-[#F3F4F6] transition-colors duration-150"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Proof bar */}
      <section className="mb-16">
        <div className="grid grid-cols-4 gap-px bg-[#E5E7EB] rounded-xl overflow-hidden border border-[#E5E7EB] max-sm:grid-cols-2">
          {PROOF_STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1 px-5 py-4 bg-white">
              <span className="text-xl font-bold text-[#111111] tracking-[-0.02em] leading-none">
                {value}
              </span>
              <span className="text-[11px] text-[#9CA3AF] leading-none">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mb-16">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Featured projects
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4 max-sm:grid-cols-1">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-[#6B7280] hover:text-[#111111] transition-colors duration-150"
        >
          View all projects →
        </Link>
      </section>

      {/* Tech stack */}
      <section className="mb-16">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Tech stack
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {topTools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] transition-colors duration-150"
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tool.bg }}
              >
                <ToolIcon icon={tool.icon} size={14} />
              </div>
              <span className="text-sm text-[#111111] font-medium whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/tools"
          className="text-sm font-medium text-[#6B7280] hover:text-[#111111] transition-colors duration-150"
        >
          View full stack →
        </Link>
      </section>

      {/* Services */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#9CA3AF] border border-[#E5E7EB] rounded-full px-3 py-1 mb-4">
            Services
          </span>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#111111] mb-3 max-sm:text-2xl">
            What I Build
          </h2>
          <p className="text-sm text-[#6B7280] max-w-[420px] mx-auto leading-[1.65]">
            Comprehensive solutions tailored to bring your vision to life.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          {SERVICES.map(({ number, Icon, title, description }) => (
            <div
              key={number}
              className="relative flex flex-col gap-3 p-5 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <span className="absolute top-4 right-4 text-xs font-semibold text-[#D1D5DB] tabular-nums">
                {number}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#6B7280]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111] mb-1.5 leading-[1.3] pr-6">
                  {title}
                </div>
                <p className="text-xs text-[#6B7280] leading-[1.65]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Testimonials
        </h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {TESTIMONIALS.map(({ quote, name, role, company }) => (
            <div
              key={name + role}
              className="flex flex-col gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-white"
            >
              <Quote size={16} className="text-[#D1D5DB] flex-shrink-0" />
              <p className="text-sm text-[#374151] leading-[1.7] flex-1">{quote}</p>
              <div className="border-t border-[#F3F4F6] pt-3">
                <div className="text-sm font-semibold text-[#111111]">{name}</div>
                <div className="text-xs text-[#9CA3AF]">
                  {role} · {company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-8 rounded-xl border border-[#E5E7EB] bg-white text-center max-sm:px-5 max-sm:py-8">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#111111] mb-2 max-sm:text-xl">
          Let&apos;s build something together
        </h2>
        <p className="text-sm text-[#6B7280] mb-6 max-w-[380px] mx-auto leading-[1.65]">
          Open to new projects — SaaS, e-commerce, internal tools, or anything
          interesting. Async-first, available across global timezones.
        </p>
        <Link
          href="/contact"
          className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg bg-[#111111] text-white hover:bg-[#333333] transition-colors duration-150"
        >
          Get in touch →
        </Link>
      </section>

    </div>
  )
}
