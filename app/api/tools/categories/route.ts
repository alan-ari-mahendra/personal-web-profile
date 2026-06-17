import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const categories = await prisma.toolCategory.findMany({
    orderBy: { order: "asc" },
    include: { tools: { orderBy: { order: "asc" } } },
  })
  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  const { label, order } = await req.json()
  if (!label) return NextResponse.json({ error: "Missing label" }, { status: 400 })
  const category = await prisma.toolCategory.create({ data: { label, order: order ?? 0 } })
  return NextResponse.json(category, { status: 201 })
}
