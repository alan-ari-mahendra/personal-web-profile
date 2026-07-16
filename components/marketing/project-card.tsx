import type { Project } from "@prisma/client"

type ProjectLink = { label: string; href: string }

// Light-theme project card for the marketing landing + /projects. Uses the same
// Cloudinary thumbnails as the old design, with a gradient fallback.
export function MarketingProjectCard({ project }: { project: Project }) {
  const links = (project.links as ProjectLink[]) ?? []
  const visit = links.find((l) => l.label.toLowerCase() === "visit") ?? links[0]
  const subtitle = project.category?.length
    ? project.category.join(" · ")
    : project.tags.slice(0, 2).join(" · ")

  return (
    <a
      href={visit?.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image / screenshot (same Cloudinary assets as the old design, gradient fallback) */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 35%, #818cf8 0%, transparent 55%), radial-gradient(circle at 75% 65%, #34d399 0%, transparent 55%)",
              }}
            />
          </>
        )}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
          {project.status === "active" ? "Live" : "Archived"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-slate-900">{project.title}</h3>
          <svg
            className="h-4 w-4 flex-none text-slate-300 transition group-hover:text-primary-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 9H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {subtitle && (
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{subtitle}</p>
        )}
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
