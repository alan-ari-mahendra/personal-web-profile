import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { label, order } = await req.json()
  const category = await prisma.toolCategory.update({ where: { id }, data: { label, order } })
  return NextResponse.json(category)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.toolCategory.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
