import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { writeFile, mkdir } from "fs/promises"
import { join, extname } from "path"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE = 2 * 1024 * 1024

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, or GIF accepted" }, { status: 400 })
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: "File exceeds 2 MB limit" }, { status: 400 })

  const ext = extname(file.name) || ".jpg"
  const filename = `avatar-${session.user.id}${ext}`
  const avatarsDir = join(process.cwd(), "public", "avatars")

  await mkdir(avatarsDir, { recursive: true })
  await writeFile(join(avatarsDir, filename), Buffer.from(await file.arrayBuffer()))

  const publicPath = `/avatars/${filename}`
  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: publicPath },
  })

  return NextResponse.json({ url: publicPath })
}
