import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { cloudinary } from "@/lib/cloudinary"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowed.includes(file.type))
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 })

  if (file.size > 5 * 1024 * 1024)
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "portfolio/projects" }, (err, res) => {
          if (err || !res) return reject(err)
          resolve(res)
        })
        .end(buffer)
    }
  )

  return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
}
