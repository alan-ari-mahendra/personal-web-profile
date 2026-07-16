import { prisma } from "@/lib/prisma"
import { ProjectsFilter } from "@/components/projects-filter"
import { Reveal } from "@/components/reveal"

export default async function ProjectsPage() {
  const activeProjects = await prisma.project.findMany({
    where: { status: "active" },
    orderBy: { createdAt: "asc" },
  })

  return (
    <div className="relative px-14 pt-28 pb-20 max-w-[960px] w-full mx-auto md:px-14 max-md:px-7 max-sm:px-5">
      <Reveal>
        <h1 className="text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-ink mb-1.5 max-md:text-4xl">
          Projects
        </h1>
        <p className="text-sm text-subtle mb-10 leading-[1.6]">
          Playground — Small MVP to Production Apps
        </p>
      </Reveal>

      {/* Category filter + grid */}
      <ProjectsFilter projects={activeProjects} />

    </div>
  )
}
