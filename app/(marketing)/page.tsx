import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel"
import { MarketingProjectCard } from "@/components/marketing/project-card"

const EMAIL = "dev.alanari14@gmail.com"

const FEATURED_TITLES = ["DineLead", "Learnify", "Finalstrip", "Mubashir"]

const SERVICES = [
  {
    title: "Custom Automation Workflow",
    body: "Connecting your tools and eliminating repetitive manual work with workflows tailored to your operations.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="5" cy="12" r="2.2" /><circle cx="12" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><circle cx="19" cy="12" r="2.2" />
        <line x1="7" y1="11" x2="10" y2="7.5" /><line x1="7" y1="13" x2="10" y2="16.5" />
        <line x1="14" y1="7.5" x2="17" y2="11" /><line x1="14" y1="16.5" x2="17" y2="13" />
      </svg>
    ),
  },
  {
    title: "AI Chatbots",
    body: "Conversational assistants for support, sales, or internal ops, wired directly into your existing systems and data.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h9A2.5 2.5 0 0 1 18 6.5v5A2.5 2.5 0 0 1 15.5 14H10l-4 3.5V14H6.5A2.5 2.5 0 0 1 4 11.5v-5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 15.5v4m2-2h-4" />
      </svg>
    ),
  },
  {
    title: "Code Audit, Refactor & Scale-Up",
    body: "For vibe coders and non-technical founders who shipped fast with AI tools: I audit what’s there, refactor the fragile parts, and get it ready to handle real users.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 6 3.5 12l5 6M15.5 6l5 6-5 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 15 1.5 1.5 3-3.5" />
      </svg>
    ),
  },
  {
    title: "Custom ERP, CRM & Web Development",
    body: "Management systems, CRMs, and web platforms built around how your business actually runs, not a rigid off-the-shelf template.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4.5" width="16" height="4" rx="1.5" />
        <rect x="4" y="10" width="16" height="4" rx="1.5" />
        <rect x="4" y="15.5" width="16" height="4" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Custom Payment Integration",
    body: "Stripe, Midtrans, and other gateways wired into checkout, billing, and subscription flows so money moves without manual reconciliation.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <line x1="3.5" y1="10" x2="20.5" y2="10" />
        <circle cx="7.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

// Core tech stack, shown inside the "Who am I" section. Flat single list
// (kept compact so it fits under the bio paragraph), AI included.
const TECH_STACK = [
  "Next.js",
  "React",
  "Vue",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "Node.js",
  "Laravel",
  "Flask",
  "PHP",
  "PostgreSQL",
  "MySQL",
  "Prisma",
  "Supabase",
  "AWS",
  "ClaudeAI / LLMs",
  "RAG",
  "n8n",
  "Zapier automation",
  "Git",
  "CI/CD",
]

// Schema.org Person structured data — emitted as JSON-LD for SEO / AI crawlers.
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alan Ari Mahendra",
  jobTitle: "Fullstack Developer",
  description:
    "Fullstack developer building custom ERP, CRM, and web systems, workflow automation, and AI chatbots for teams in the US, Australia, and Europe.",
  url: "https://www.alanari.com",
  email: "mailto:dev.alanari14@gmail.com",
  sameAs: [
    "https://github.com/alan-ari-mahendra",
    "https://www.linkedin.com/in/alanarimahendra/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Semarang",
    addressCountry: "ID",
  },
  knowsAbout: [
    "ERP development",
    "CRM development",
    "Workflow automation",
    "AI chatbots",
    "LLM integration",
    "RAG",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Custom Payment integration",
  ],
  knowsLanguage: ["English", "Indonesian"],
}

const STATS = [
  { value: "3+", label: "Years of Experience" },
  { value: "38+", label: "Projects" },
  { value: "5", label: "Countries Served" },
  { value: "Fluent", label: "English", small: true },
]

const TESTIMONIALS = [
  {
    quote:
      "Great to work with. Greatly appreciated his suggestions, and went above and beyond, making back-end changes he wasn’t originally hired for.",
    initials: "JD",
    name: "Justin Dion",
    role: "Founder · Finalstrip",
  },
  {
    quote:
      "Alan is a young, great talent. His communication was top-notch, he met all deadlines, and his skills were strong. Will certainly hire again.",
    initials: "LS",
    name: "Luca S",
    role: "Chief Product & Technology Strategist · FLNT",
  },
  {
    quote:
      "The internal tool Alan built transformed how our team operates. Fast delivery, clean architecture, and great collaboration across time zones.",
    initials: "RB",
    name: "Rodney Boyd",
    role: "CEO & Founder · FranchiZeManager",
  },
]

const FAQ = [
  {
    q: "What kind of projects are the best fit?",
    a: "Custom ERP/CRM and web platforms, automation workflows, AI chatbots, payment integrations, and audits of AI-generated codebases that need to survive real production traffic.",
    open: true,
  },
  {
    q: "How does an engagement usually start?",
    a: "Send a project brief or the codebase in question. I come back with a clear read on fit and approach within one business day, then we scope it on a short call.",
    open: false,
  },
  {
    q: "Do you work with clients in the US, Australia, and Europe?",
    a: "Yes, most of my clients are there. I’m fluent in English, communicate written-first, and I’m based in Semarang (GMT+7): same working day as Australia, morning overlap with Europe, and evening overlap with the US, so no one’s ever waiting long for a reply.",
    open: false,
  },
]

const ArrowIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 9H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

export default async function MarketingPage() {
  const [allFeatured, profile] = await Promise.all([
    prisma.project.findMany({ where: { title: { in: FEATURED_TITLES } } }),
    prisma.user.findFirst({ select: { image: true } }),
  ])
  const portfolio = FEATURED_TITLES.map((t) => allFeatured.find((p) => p.title === t)).filter(
    Boolean
  ) as typeof allFeatured
  const profileImage = profile?.image ?? null

  return (
    <main id="top">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="blob -left-32 -top-32 h-96 w-96 bg-primary-300" />
        <div className="blob -right-24 top-40 h-80 w-80 bg-secondary-300" />
        <div className="blob -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-indigo-300" />
        {/* Subtle dot grid, faded toward the content below */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgb(148 163 184 / 0.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects · Fluent English · US / AU / EU
            </span>

            <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Reliable Full-Stack Developer{" "}
              <span className="bg-gradient-to-r from-primary-600 to-indigo-400 bg-clip-text text-transparent">
                &amp; AI Developer Expert
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Custom ERP, CRM, websites, workflow automation, and AI chatbots, built
              end-to-end, for teams in the US, Australia, and Europe.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700"
              >
                Tell me about your project
                <ArrowIcon />
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1zM4 15a1 1 0 011 1v1h10v-1a1 1 0 112 0v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-6 text-center">
                <div className={`font-display font-extrabold text-slate-900 ${s.small ? "text-2xl" : "text-3xl"}`}>
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who am I + core tech stack */}
      <section id="about" className="border-t border-slate-100 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12 lg:items-start">
            {/* Photo — left */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt="Alan Ari Mahendra"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100" />
                )}
              </div>
            </div>

            {/* Description + tech stack — right */}
            <div className="lg:col-span-3">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">Who am I</span>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Reliable Full-Stack Developer &amp; AI Developer Expert
              </h2>
              <p className="mt-5 text-slate-600">
                I&apos;m <strong className="font-semibold text-slate-900">Alan Ari Mahendra</strong>, a fullstack
                developer building custom ERP, CRM, and web systems, the workflow automation that connects them,
                and AI chatbots and LLM-powered features that plug straight into existing data, for teams across
                the US, Australia, and Europe. Over 3+ years and 38+ production projects, I own the full stack
                end-to-end, from database schema to deployed UI, so there is no hand-off gap between building a
                feature, automating it, and keeping it reliable once real users arrive.
              </p>

              <div className="mt-7">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tech I work with</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {TECH_STACK.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-slate-100 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">My Service</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Built to slot into your team
            </h2>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <dl className="flex flex-col gap-4">
                {SERVICES.map((s) => (
                  <div
                    key={s.title}
                    className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
                  >
                    <dt className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                      {s.icon}
                    </dt>
                    <dd>
                      <h3 className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-primary-700">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl bg-primary-600 p-8 text-white shadow-sm">
                <h3 className="font-display text-xl font-bold">Hire hourly or monthly</h3>
                <p className="mt-3 text-sm text-primary-100">
                  Scoped task or a quick fix? Go hourly, starting at $15/hr. Ongoing work or a
                  full build? A monthly retainer fits better.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-4 text-center">
                    <div className="font-display text-2xl font-extrabold text-white">
                      $15<span className="text-sm font-medium text-primary-100">/hr</span>
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-100">Hourly</div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 text-center">
                    <div className="font-display text-2xl font-extrabold text-white">
                      $1.2k<span className="text-sm font-medium text-primary-100"> to 1.5k</span>
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-100">Monthly retainer</div>
                  </div>
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-4"
                >
                  Describe your project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio (DB-driven) */}
      <section id="portfolio" className="border-t border-slate-100 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">Proof, not promises</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Systems that are live right now
            </h2>
            <p className="mt-4 text-slate-600">
              AI-powered products, shipped to production. The same standard I hold your code to.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.map((project) => (
              <MarketingProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600"
            >
              More projects
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-slate-100 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">Client voices</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What it&apos;s like to work with me
            </h2>
          </div>
          <TestimonialsCarousel items={TESTIMONIALS} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">FAQ</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-6" open={item.open}>
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                  {item.q}
                  <svg className="chev h-5 w-5 flex-none text-slate-400 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-slate-100 bg-gradient-to-br from-primary-600 to-indigo-700 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Got something worth building, or fixing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-100">
            A couple of sentences about what&apos;s going on, plus a link if there&apos;s a repo or
            live site, is enough for me to tell you if I&apos;m the right person for it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition hover:bg-primary-50"
            >
              {EMAIL}
            </a>
            <a
              href="https://github.com/alan-ari-mahendra"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
