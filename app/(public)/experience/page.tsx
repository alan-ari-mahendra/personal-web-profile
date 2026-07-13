import { experiences } from "@/lib/experiences"
import { Timeline } from "@/components/ui/timeline"

export default function ExperiencePage() {
  const data = experiences.map((exp, idx) => ({
    title: exp.period,
    content: (
      <div key={idx}>
        {/* Role · Company */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-4">
          <span className="text-base font-bold text-ink">
            {exp.role}
          </span>
          <span className="text-base text-white/20">·</span>
          <span className="text-base font-medium text-subtle">
            {exp.company}
          </span>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-2 mb-5">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-xs font-normal text-ink/80 md:text-sm leading-[1.7]"
            >
              <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-surface-2 text-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }))

  return (
    <div className="relative max-w-[960px] w-full overflow-clip mx-auto">
      <Timeline
        data={data}
      />
      <div className="h-96">
      </div>
    </div>
  )
}
