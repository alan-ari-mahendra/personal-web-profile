import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const message = typeof body?.message === "string" ? body.message.trim() : ""

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  await prisma.contactMessage.create({
    data: { name, email, message },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
