import { experiences } from "@/lib/experiences"
import { Timeline } from "@/components/ui/timeline"

export default function ExperiencePage() {
  const data = experiences.map((exp, idx) => ({
    title: exp.period,
    content: (
      <div key={idx}>
        {/* Role · Company */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-4">
          <span className="text-base font-bold text-neutral-800 dark:text-neutral-200">
            {exp.role}
          </span>
          <span className="text-base text-neutral-300 dark:text-neutral-600">·</span>
          <span className="text-base font-medium text-neutral-500 dark:text-neutral-400">
            {exp.company}
          </span>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-2 mb-5">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-xs font-normal text-neutral-700 md:text-sm dark:text-neutral-300 leading-[1.7]"
            >
              <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
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
