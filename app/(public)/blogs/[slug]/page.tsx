import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { BlogContentRenderer } from "@/components/blog-content-renderer"

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return blogs.map((b: { slug: string }) => ({ slug: b.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({ where: { slug } })

  if (!blog || !blog.published) notFound()

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div>
      {/* Hero */}
      <div className={`relative w-full h-[320px] bg-gradient-to-br ${blog.gradient} overflow-hidden`}>
        {blog.thumbnail ? (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 35%, #818cf8 0%, transparent 55%), radial-gradient(circle at 75% 65%, #34d399 0%, transparent 55%)",
            }}
          />
        )}
        {/* Back link */}
        <Link
          href="/blogs"
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors duration-150 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          ← Blog
        </Link>
        {/* Reading time */}
        <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-[#6B7280]">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          {blog.readingTime}
        </span>
      </div>

      {/* Article body */}
      <div className="max-w-[720px] mx-auto px-14 pt-10 pb-24 max-md:px-7 max-sm:px-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B7280] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-[-0.03em] leading-[1.15] text-[#111111] mb-3 max-md:text-3xl max-sm:text-2xl">
          {blog.title}
        </h1>

        {/* Meta */}
        <p className="text-xs text-[#9CA3AF] font-medium">
          {formattedDate} · {blog.readingTime}
        </p>

        <hr className="border-[#E5E7EB] my-6" />

        {/* Content */}
        <BlogContentRenderer content={blog.content} />

        <hr className="border-[#E5E7EB] mt-12 mb-6" />

        {/* Bottom nav */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111111] transition-colors duration-150"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  )
}
