import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { ProjectsAdmin } from "@/components/admin/projects-admin"

export default async function AdminProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/login")

  return <ProjectsAdmin />
}
