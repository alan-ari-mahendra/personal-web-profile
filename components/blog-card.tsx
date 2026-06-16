"use client"
import Link from "next/link"
import type { Blog } from "@/lib/blogs"
import { FollowerPointerCard } from "./ui/following-pointer"

export function BlogCard({ blog }: { blog: Blog }) {
  const { title, description, tags, date, readingTime, slug, gradient } = blog

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <FollowerPointerCard title={<TitleComponent title={title} />}>
      <Link href={`/blogs/${slug}`} className="block group">
        <div className="flex flex-col bg-gray-50 border border-[#E5E7EB] rounded-[12px] overflow-hidden hover:border-[#D1D5DB] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:scale-105">
          {/* Gradient header */}
          <div className="relative w-full h-[240px] overflow-hidden flex-shrink-0">
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

            {/* Date + reading time badge */}
            <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm bg-white/80 text-[#6B7280]">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-400" />
              {readingTime}
            </span>
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            {/* Date */}
            <span className="text-[10px] text-[#9CA3AF] font-medium">{formattedDate}</span>

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

            {/* Read more */}
            <div className="mt-1">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E5E7EB] text-[#111111] hover:bg-[#F3F4F6] transition-colors duration-100 inline-block">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FollowerPointerCard>
  )
}

const TitleComponent = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-2">
    <p>{title}</p>
  </div>
)
