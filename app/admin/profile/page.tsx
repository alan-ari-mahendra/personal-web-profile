import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { ProfileForm } from "@/components/admin/profile-form"

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-[#111111] mb-6">Profile</h1>
      <ProfileForm user={session!.user} />
    </div>
  )
}
