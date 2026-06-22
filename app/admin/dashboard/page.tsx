import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const [session, projectCount, blogCount] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    prisma.project.count(),
    prisma.blog.count(),
  ])

  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Blog posts", value: blogCount },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] mb-1">Dashboard</h1>
      <p className="text-sm text-[#6B7280] mb-8">Welcome back, {session?.user.name}.</p>

      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-[#E5E7EB] rounded-xl p-5"
          >
            <div className="text-3xl font-bold text-[#111111] mb-1">{value}</div>
            <div className="text-sm text-[#6B7280]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
