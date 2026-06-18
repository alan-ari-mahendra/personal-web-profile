import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { date: "desc" } })
  return NextResponse.json(blogs)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, tags, date, readingTime, slug, gradient, thumbnail, published, content } = body

  if (!title || !description || !slug || !gradient || !content)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

  const existing = await prisma.blog.findUnique({ where: { slug } })
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 })

  const blog = await prisma.blog.create({
    data: {
      title,
      description,
      tags: tags ?? [],
      date: date ? new Date(date) : new Date(),
      readingTime: readingTime ?? "",
      slug,
      gradient,
      thumbnail: thumbnail ?? null,
      published: published ?? false,
      content,
    },
  })

  return NextResponse.json(blog, { status: 201 })
}
