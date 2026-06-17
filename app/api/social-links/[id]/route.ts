import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { label, url, iconType, iconValue, order } = body

  const link = await prisma.socialLink.update({
    where: { id },
    data: { label, url, iconType, iconValue, order },
  })
  return NextResponse.json(link)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.socialLink.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
