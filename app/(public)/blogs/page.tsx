import { prisma } from "@/lib/prisma"
import { BlogCard } from "@/components/blog-card"
import { Reveal } from "@/components/reveal"

export default async function BlogsPage() {
  const publishedBlogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  })

  return (
    <div className="relative px-14 pt-28 pb-20 max-w-[960px] w-full mx-auto md:px-14 max-md:px-7 max-sm:px-5">
      <Reveal>
        <h1 className="text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-ink mb-1.5 max-md:text-4xl">
          Blog
        </h1>
        <p className="text-sm text-subtle mb-10 leading-[1.6]">
          Thoughts on engineering, AI, and building products
        </p>
      </Reveal>

      <Reveal delay={0.05} className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Reveal>
    </div>
  )
}
