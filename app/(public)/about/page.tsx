import { Reveal } from "@/components/reveal"

export default function AboutPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <Reveal>
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-ink mb-2">
          Alan Ari Mahendra
        </h1>
        <p className="text-sm text-subtle mb-12">
          Full-Stack · Applied AI Engineer
        </p>
      </Reveal>

      {/* Bio */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Background
        </h2>
        <div className="space-y-4">
          <p className="text-base text-ink/85 leading-[1.85]">
            I started as a full-stack developer, building SaaS platforms, dashboards,
            and internal tools with Next.js, TypeScript, and Node. Over the last
            couple of years my work shifted toward the part clients now care about
            most:{" "}
            <span className="text-brand-2 font-medium">getting AI to actually work inside a product</span>.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            That is the gap I fill. Plenty of people can call an LLM API. Far fewer
            can{" "}
            <span className="text-brand-2 font-medium">ship an AI feature that stays reliable in production</span>:
            grounded in real data with RAG, resilient to bad outputs, monitored, and
            fast enough to ship. Because I own the full stack, I do not hand off at
            the model. I take an AI idea from architecture and API design through
            deployment, and I stay accountable for how it behaves once real users hit it.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            I work async-first with founders and agencies across global timezones,
            mostly on SaaS products, automation systems, and AI-integrated tools.
            Clean code, clear communication, and delivery you can build on.
          </p>
        </div>
      </Reveal>

      <hr className="border-line mb-12" />

      {/* Now */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          Right now
        </h2>
        <ul className="space-y-3">
          {[
            "Building and shipping full-stack products for global clients",
            "Exploring AI agent tooling and LLM-integrated applications",
            "Actively taking on new projects, open to async collaboration",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink/80 leading-[1.7]">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-subtle flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <hr className="border-line mb-12" />

      {/* How I work */}
      <Reveal as="section" className="mb-12">
        <h2 className="text-xs font-mono font-semibold tracking-[0.08em] uppercase text-subtle mb-5">
          How I work
        </h2>
        <div className="space-y-4">
          <p className="text-base text-ink/85 leading-[1.85]">
            I bias toward shipping. A working product in two days beats a perfect
            spec in two weeks. Speed of iteration matters, especially when working
            asynchronously across time zones with distributed teams.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            I use AI tools heavily, not as a crutch, but as a force multiplier.
            The goal is always to keep the feedback loop tight: understand the
            problem, build a solution, get it in front of real users, iterate.
          </p>
          <p className="text-base text-ink/85 leading-[1.85]">
            I&apos;m most effective when given clear requirements and autonomy on
            implementation. I handle the full stack, from database schema to
            deployed UI, without needing to hand off between specializations.
          </p>
        </div>
      </Reveal>

      <hr className="border-line mb-10" />

      <p className="text-sm text-subtle">
        Want to talk?{" "}
        <a
          href="/contact"
          className="text-ink font-medium underline underline-offset-[2px] decoration-subtle hover:decoration-brand hover:text-brand transition-colors"
        >
          Get in touch →
        </a>
      </p>
    </div>
  )
}
