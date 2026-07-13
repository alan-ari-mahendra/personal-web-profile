"use client"

import { useState } from "react"
import { AccountTab } from "@/components/admin/tabs/account-tab"
import { SecurityTab } from "@/components/admin/tabs/security-tab"
import { SocialLinksTab } from "@/components/admin/tabs/social-links-tab"
import { ToolsTab } from "@/components/admin/tabs/tools-tab"

type User = { id: string; name: string; email: string; image?: string | null }

const TABS = ["Profile", "Security", "Social Links", "Tools"] as const
type Tab = (typeof TABS)[number]

export function ProfileTabs({ user }: { user: User }) {
  const [active, setActive] = useState<Tab>("Profile")

  return (
    <div className="flex flex-col gap-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-line pb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2 ${
              active === tab
                ? "border-brand text-ink"
                : "border-transparent text-subtle hover:text-ink hover:border-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-2">
        {active === "Profile" && <AccountTab user={user} />}
        {active === "Security" && <SecurityTab />}
        {active === "Social Links" && <SocialLinksTab />}
        {active === "Tools" && <ToolsTab />}
      </div>
    </div>
  )
}
