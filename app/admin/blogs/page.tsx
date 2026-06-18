import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { BlogsAdmin } from "@/components/admin/blogs-admin"

export default async function AdminBlogsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  return <BlogsAdmin />
}
