import { Reveal } from "@/components/reveal"

const HOW_I_WORK = [
  [
    "Audit before opinion.",
    "I don't guess. I read the codebase, map the risks, and give you a clear picture of what's broken before touching anything.",
  ],
  [
    "Pragmatic over perfect.",
    "I don't rewrite for the sake of rewriting. If AI-generated code works and is safe, it stays. I fix what actually matters: security, scalability, maintainability.",
  ],
  [
    "Production is the standard.",
    "Tests, error handling, validation, monitoring: the boring layer that AI skips and that separates a demo from a real product.",
  ],
  [
    "Full ownership.",
    "From spotting the problem to shipping the fix, I work end-to-end. No hand-off gaps.",
  ],
]

const TECH = [
  ["Frontend", "Next.js, React, Vue, TypeScript"],
  ["Backend", "Node.js, Express, Laravel, Flask"],
  ["Data", "PostgreSQL, MySQL, Supabase, Prisma"],
  ["AI", "LLM integration, RAG, structured outputs, automation"],
  ["Infra", "Docker, CI/CD, VPS deployment"],
]

export default function AboutPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <Reveal>
        <p className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-3">
          Fullstack Developer · AI Code Auditor
        </p>
        <h1 className="text-4xl font-bold tracking-[-0.03em] leading-[1.15] text-ink mb-12 max-md:text-3xl">
          I build production systems, and I fix the ones that aren&apos;t.
        </h1>
      </Reveal>

      {/* Intro */}
      <Reveal as="section" className="mb-12">
        <div className="space-y-4">
          <p className="text-base text-ink/85 leading-[1.85]">
            I&apos;m Alan Ari Mahendra, a fullstack developer who&apos;s spent the last
            few years shipping production SaaS end-to-end: architecture, backend,
            frontend, deploy. Along the way I kept running into the same pattern: teams
            moving fast with AI, then quietly drowning in the code it left behind.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            That&apos;s the work I focus on now. AI can generate a working MVP in days,
            but{" "}
            <span className="text-brand-2 font-medium">
              &quot;working&quot; and &quot;production-ready&quot; are two very different things
            </span>
            . The gap between them is where I live: auditing fragile codebases,
            refactoring the mess into something maintainable, and hardening it so it
            survives real users, real traffic, and real edge cases.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            I&apos;m not an outsider critiquing code I couldn&apos;t write. I&apos;ve
            built these systems myself: CRMs, LMS platforms, marketplaces, AI-powered
            tools, which is exactly why I know what production actually demands, and
            where AI-generated code tends to break.
          </p>
        </div>
      </Reveal>

      <hr className="border-line mb-12" />

      {/* How I work */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          How I work
        </h2>
        <ul className="space-y-4">
          {HOW_I_WORK.map(([title, body]) => (
            <li key={title} className="flex items-start gap-3 text-sm text-ink/80 leading-[1.75]">
              <span className="mt-[8px] w-1 h-1 rounded-full bg-brand flex-shrink-0" />
              <span>
                <span className="font-semibold text-ink">{title}</span> {body}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <hr className="border-line mb-12" />

      {/* Track record */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Track record
        </h2>
        <div className="space-y-4">
          <p className="text-base text-ink/85 leading-[1.85]">
            Over 3 years, I&apos;ve shipped 38+ projects across SaaS, e-commerce, LMS,
            and AI automation, working with founders and agencies from multiple time
            zones. I run a small development studio and actively work as a developer,
            technical reviewer, and project lead, which means I review code for a
            living, not just write it.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            That reviewer&apos;s eye is what I bring to every audit.
          </p>
        </div>
      </Reveal>

      <hr className="border-line mb-12" />

      {/* Tech I work across */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Tech I work across
        </h2>
        <div className="space-y-2.5">
          {TECH.map(([label, items]) => (
            <div key={label} className="flex gap-3 text-sm max-sm:flex-col max-sm:gap-0.5">
              <span className="font-mono text-[11px] uppercase tracking-wide text-subtle w-24 flex-shrink-0 pt-[3px]">
                {label}
              </span>
              <span className="text-ink/85">{items}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <hr className="border-line mb-10" />

      {/* CTA */}
      <Reveal as="section">
        <h2 className="text-xl font-bold tracking-[-0.02em] text-ink mb-2">
          Got an AI-generated codebase you&apos;re not sure about?
        </h2>
        <p className="text-sm text-subtle mb-5 leading-[1.7] max-w-[520px]">
          Whether it&apos;s a quick audit or a full refactor, let&apos;s talk about
          what it&apos;ll take to make it production-ready.
        </p>
        <a
          href="/contact"
          className="inline-block text-sm font-semibold px-5 py-2.5 rounded-lg bg-brand text-black hover:opacity-90 transition-opacity duration-150"
        >
          Get in touch →
        </a>
      </Reveal>
    </div>
  )
}
