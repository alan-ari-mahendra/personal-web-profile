import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { name, description, icon, bg, order, categoryId } = await req.json()
  const tool = await prisma.tool.update({
    where: { id },
    data: { name, description, icon, bg, order, categoryId },
  })
  return NextResponse.json(tool)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.tool.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
