import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cloudinary } from "@/lib/cloudinary"

type Params = { params: Promise<{ id: string }> }

function extractPublicId(url: string): string | null {
  // https://res.cloudinary.com/{cloud}/image/upload/v{ver}/{publicId}.{ext}
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/)
  return match ? match[1] : null
}

export async function PUT(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { title, description, tags, status, links, gradient, thumbnail } = body

  const project = await prisma.project.update({
    where: { id },
    data: { title, description, tags, status, links, gradient, thumbnail },
  })

  revalidatePath("/projects")
  revalidatePath("/")
  return NextResponse.json(project)
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.project.delete({ where: { id } })

  revalidatePath("/projects")
  revalidatePath("/")

  if (project.thumbnail) {
    const publicId = extractPublicId(project.thumbnail)
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch(() => null)
    }
  }

  return NextResponse.json({ success: true })
}
