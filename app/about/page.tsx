export default function AboutPage() {
  return (
    <div className="px-14 pt-28 pb-20 max-w-[920px] w-full mx-auto max-md:px-7 max-sm:px-5">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] mb-2">
        About
      </h1>
      <p className="text-sm text-[#6B7280] mb-12">
        A little more about who I am and how I work.
      </p>

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          Background
        </h2>
        <div className="space-y-4">
          <p className="text-base text-[#111111] leading-[1.85]">
            I&apos;m Alan — an AI Engineer and full-stack builder based in Indonesia.
            For the past 5 years I&apos;ve been turning fuzzy ideas into live products,
            from early prototype to production.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            Currently a Founding Engineer at{" "}
            <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
              startup.ai
            </a>
            . Before that I co-founded{" "}
            <a href="#" className="underline underline-offset-[2px] decoration-[#9CA3AF] hover:decoration-[#111111]">
              ProductA.ai
            </a>{" "}
            — raised $100K and shipped it to real users — alongside several other
            products I built from scratch.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            My background spans full-stack web, AI/ML integration, product design,
            and growth. I care most about the overlap between good engineering and
            things people actually want to use.
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
            "Building AI-native products at startup.ai",
            "Writing about practical AI engineering on this blog",
            "Exploring agents, RAG pipelines, and LLM infra",
            "Looking for interesting problems to collaborate on",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#374151] leading-[1.7]">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-[#9CA3AF] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#E5E7EB] mb-12" />

      {/* Philosophy */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#9CA3AF] mb-5">
          How I work
        </h2>
        <div className="space-y-4">
          <p className="text-base text-[#111111] leading-[1.85]">
            I bias toward shipping. A working prototype in two days beats a perfect
            spec in two weeks. Speed of iteration is a competitive moat, especially
            when you&apos;re small.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            I use AI tools heavily — not as a crutch, but as a force multiplier.
            The goal is always to keep the feedback loop tight: idea → code → user
            → learning → next idea.
          </p>
          <p className="text-base text-[#111111] leading-[1.85]">
            I&apos;m most energized when working on products at the edge of what&apos;s
            technically possible and what people will actually pay for.
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
