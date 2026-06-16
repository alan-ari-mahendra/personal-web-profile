import { projects } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"

export default function ProjectsPage() {
  const activeProjects = projects.filter((p) => p.status === "active")

  return (
    <div className="relative px-14 pt-28 pb-20 max-w-[960px] w-full mx-auto md:px-14 max-md:px-7 max-sm:px-5">
      <h1 className="text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-[#111111] mb-1.5 max-md:text-4xl">
        Projects
      </h1>
      <p className="text-sm text-[#6B7280] mb-10 leading-[1.6]">
        Playground — Small MVP to Production Apps
      </p>

      {/* Active — 2 col grid */}
      <div className="grid grid-cols-2 gap-4 mb-14 max-sm:grid-cols-1">
        {activeProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

    </div>
  )
}
