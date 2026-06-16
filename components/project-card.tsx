"use client"
import type { Project } from "@prisma/client"
import { FollowerPointerCard } from "./ui/following-pointer"

type ProjectLink = { label: string; href: string }

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, tags, status, links, gradient, thumbnail } = project
  const parsedLinks = links as ProjectLink[]

  return (
    <FollowerPointerCard
      title={
        <TitleComponent title={title} />
      }
    >
      <div className="group flex flex-col bg-gray-50 border border-[#E5E7EB] rounded-[12px] overflow-hidden hover:border-[#D1D5DB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out group hover:scale-105">
        {/* Image / Screenshot area */}
        <div className="relative w-full h-[240px] overflow-hidden flex-shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-500 ease-out`}
              />
              <div
                className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 35%, #818cf8 0%, transparent 55%), radial-gradient(circle at 75% 65%, #34d399 0%, transparent 55%)",
                }}
              />
            </>
          )}

          {/* Status badge — top right overlay */}
          <span
            className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm ${
              status === "active"
                ? "bg-green-100/90 text-green-700"
                : "bg-white/80 text-[#9CA3AF]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                status === "active" ? "bg-green-500" : "bg-[#D1D5DB]"
              }`}
            />
            {status}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Title */}
          <div className="text-sm font-bold text-[#111111] tracking-[-0.01em] leading-[1.3]">
            {title}
          </div>

          {/* Description */}
          <p className="text-xs text-[#6B7280] leading-[1.6] flex-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-0.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] font-medium"
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
                className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E5E7EB] text-[#111111] hover:bg-[#F3F4F6] transition-colors duration-100"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </FollowerPointerCard>
  )
}

const TitleComponent = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2">
    <p>{title}</p>
  </div>
)
