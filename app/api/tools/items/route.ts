import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { name, description, icon, bg, order, categoryId } = await req.json()
  if (!name || !icon || !bg || !categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  const tool = await prisma.tool.create({
    data: { name, description: description ?? "", icon, bg, order: order ?? 0, categoryId },
  })
  return NextResponse.json(tool, { status: 201 })
}
