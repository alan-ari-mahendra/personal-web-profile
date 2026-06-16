import { blogs } from "@/lib/blogs"
import { BlogCard } from "@/components/blog-card"

export default function BlogsPage() {
  const publishedBlogs = blogs.filter((b) => b.published)

  return (
    <div className="relative px-14 pt-28 pb-20 max-w-[960px] w-full mx-auto md:px-14 max-md:px-7 max-sm:px-5">
      <h1 className="text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-[#111111] mb-1.5 max-md:text-4xl">
        Blog
      </h1>
      <p className="text-sm text-[#6B7280] mb-10 leading-[1.6]">
        Thoughts on engineering, AI, and building products
      </p>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  )
}
