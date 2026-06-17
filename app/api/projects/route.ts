import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, tags, status, links, gradient, thumbnail } = body

  if (!title || !description || !gradient)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

  const project = await prisma.project.create({
    data: {
      title,
      description,
      tags: tags ?? [],
      status: status ?? "active",
      links: links ?? [],
      gradient,
      thumbnail: thumbnail ?? null,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
