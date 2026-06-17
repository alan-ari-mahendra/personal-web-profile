import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(links)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { label, url, iconType, iconValue, order } = body

  if (!label || !url || !iconType || !iconValue) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const link = await prisma.socialLink.create({
    data: { label, url, iconType, iconValue, order: order ?? 0 },
  })
  return NextResponse.json(link, { status: 201 })
}
