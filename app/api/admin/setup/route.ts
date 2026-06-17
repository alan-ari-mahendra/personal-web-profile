import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// One-time admin setup endpoint. Returns 403 once a user exists.
export async function POST(req: Request) {
  const userCount = await prisma.user.count()
  if (userCount > 0) {
    return NextResponse.json({ error: "Setup already complete." }, { status: 403 })
  }

  const { name, email, password } = await req.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: "name, email, and password required." }, { status: 400 })
  }

  await auth.api.signUpEmail({
    body: { name, email, password },
  })

  return NextResponse.json({ ok: true })
}
