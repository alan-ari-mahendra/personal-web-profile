"use client"
import { motion } from "motion/react"
import type { Experience } from "@/lib/experiences"

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="grid grid-cols-[360px_1fr] gap-10 pb-12 last:pb-0 max-sm:grid-cols-1 max-sm:gap-1"
    >
      {/* Period — left column */}
      <div className="pt-1">
        <span className="text-base text-[#9CA3AF] font-medium tabular-nums whitespace-nowrap">
          {experience.period}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {/* Separator line above (except first) */}

        {/* Role · Company */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-xl font-bold text-[#111111] tracking-[-0.01em]">
            {experience.role}
          </span>
          <span className="text-lg text-[#D1D5DB]">·</span>
          <span className="text-lg font-medium text-[#6B7280]">
            {experience.company}
          </span>
        </div>

        {/* Bullet points */}
        <ul className="flex flex-col gap-1.5 mb-4">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-base text-[#6B7280] leading-[1.7]">
              <span className="mt-[6px] w-1 h-1 rounded-full bg-[#D1D5DB] flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
