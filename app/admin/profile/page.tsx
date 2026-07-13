import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { ProfileTabs } from "@/components/admin/profile-tabs"

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-ink mb-6">Settings</h1>
      <ProfileTabs user={session!.user} />
    </div>
  )
}
