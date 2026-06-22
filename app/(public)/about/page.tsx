export default function AboutPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-2">
        Alan Ari Mahendra
      </h1>
      <p className="text-sm text-[#6B7280] mb-12">
        Full-stack Developer · Indonesia
      </p>

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Background
        </h2>
        <div className="space-y-4">
          <p className="text-base text-[#111111] leading-[1.85]">
            I&apos;m a Full-stack Developer with over 3 years of experience building
            scalable SaaS platforms, high-traffic e-commerce systems, and custom
            internal tools. I work with distributed product teams across different
            time zones — AEST, SGT, and CET — delivering solutions for global clients.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            My core stack is the JavaScript/TypeScript ecosystem (React, Next.js,
            Node.js) and PHP (Laravel). To maximize delivery speed and code quality,
            I integrate AI-assisted development tools — Claude, Cursor, GitHub
            Copilot — into my daily workflow.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            My portfolio spans SaaS products, CRM systems, LMS platforms, franchise
            management tools, e-commerce marketplaces, and AI-integrated applications
            — all built end-to-end, from architecture to deployment.
          </p>
        </div>
      </section>

      <hr className="border-[#E5E7EB] mb-12" />

      {/* Now */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Right now
        </h2>
        <ul className="space-y-3">
          {[
            "Building and shipping full-stack products for global clients",
            "Exploring AI agent tooling and LLM-integrated applications",
            "Actively taking on new projects — open to async collaboration",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#374151] leading-[1.7]">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-[#9CA3AF] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#E5E7EB] mb-12" />

      {/* How I work */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          How I work
        </h2>
        <div className="space-y-4">
          <p className="text-base text-[#111111] leading-[1.85]">
            I bias toward shipping. A working product in two days beats a perfect
            spec in two weeks. Speed of iteration matters, especially when working
            asynchronously across time zones with distributed teams.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            I use AI tools heavily — not as a crutch, but as a force multiplier.
            The goal is always to keep the feedback loop tight: understand the
            problem, build a solution, get it in front of real users, iterate.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            I&apos;m most effective when given clear requirements and autonomy on
            implementation — I handle the full stack, from database schema to
            deployed UI, without needing to hand off between specializations.
          </p>
        </div>
      </section>

      <hr className="border-[#E5E7EB] mb-10" />

      <p className="text-sm text-[#6B7280]">
        Want to talk?{" "}
        <a
          href="/contact"
          className="text-[#111111] font-medium underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]"
        >
          Get in touch →
        </a>
      </p>
    </div>
  )
}
