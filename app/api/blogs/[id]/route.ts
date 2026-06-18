import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cloudinary } from "@/lib/cloudinary"

type Params = { params: Promise<{ id: string }> }

function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/)
  return match ? match[1] : null
}

export async function PUT(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { title, description, tags, date, readingTime, slug, gradient, thumbnail, published, content } = body

  const existing = await prisma.blog.findFirst({ where: { slug, NOT: { id } } })
  if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 409 })

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      description,
      tags,
      date: date ? new Date(date) : undefined,
      readingTime,
      slug,
      gradient,
      thumbnail,
      published,
      content,
    },
  })

  return NextResponse.json(blog)
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const blog = await prisma.blog.findUnique({ where: { id } })
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.blog.delete({ where: { id } })

  if (blog.thumbnail) {
    const publicId = extractPublicId(blog.thumbnail)
    if (publicId) await cloudinary.uploader.destroy(publicId).catch(() => null)
  }

  return NextResponse.json({ success: true })
}
