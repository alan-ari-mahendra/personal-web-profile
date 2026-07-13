import type { Project } from "@prisma/client"

type ProjectLink = { label: string; href: string }

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, tags, status, links, gradient, thumbnail } = project
  const parsedLinks = links as ProjectLink[]

  return (
    <div className="group flex flex-col bg-surface border border-line rounded-[12px] overflow-hidden hover:border-white/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:-translate-y-1 transition-all duration-300 ease-snappy">
        {/* Image / Screenshot area */}
        <div className="relative w-full h-[240px] overflow-hidden flex-shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              />
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 35%, #818cf8 0%, transparent 55%), radial-gradient(circle at 75% 65%, #34d399 0%, transparent 55%)",
                }}
              />
            </>
          )}

          {/* Status badge — top right overlay */}
          <span
            className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full backdrop-blur-sm ${
              status === "active"
                ? "bg-green-950/80 text-green-400"
                : "bg-black/60 text-subtle"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                status === "active" ? "bg-green-500" : "bg-white/30"
              }`}
            />
            {status}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Title */}
          <div className="text-sm font-bold text-ink group-hover:text-brand transition-colors duration-200 tracking-[-0.01em] leading-[1.3]">
            {title}
          </div>

          {/* Description */}
          <p className="text-xs text-subtle leading-[1.6] flex-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-0.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-surface-2 text-subtle font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {parsedLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-line text-ink hover:bg-surface-2 transition-colors duration-100"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
    </div>
  )
}
