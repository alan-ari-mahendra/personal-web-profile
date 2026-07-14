"use client"

import { useMemo, useState } from "react"
import type { Project } from "@prisma/client"
import { ProjectCard } from "@/components/project-card"
import { Reveal } from "@/components/reveal"

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => (p.category ?? []).forEach((c) => set.add(c)))
    return Array.from(set).sort()
  }, [projects])

  const filtered = selected ? projects.filter((p) => (p.category ?? []).includes(selected)) : projects

  return (
    <Reveal delay={0.05}>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className={`text-xs font-mono font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors duration-150 ${
              selected === null
                ? "bg-brand text-black border-brand"
                : "border-line text-subtle hover:text-ink hover:border-white/20"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelected(cat)}
              className={`text-xs font-mono font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                selected === cat
                  ? "bg-brand text-black border-brand"
                  : "border-line text-subtle hover:text-ink hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-14 max-sm:grid-cols-1">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-subtle mb-14">No projects in this category yet.</p>
      )}
    </Reveal>
  )
}
