"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, User, FolderOpen, PenLine, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth-client"

const adminNav = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { href: "/admin/blogs", icon: PenLine, label: "Blogs" },
  { href: "/admin/profile", icon: User, label: "Profile" },
]

type AdminUser = { name: string; email: string; image?: string | null }

export function AdminSidebar({ user }: { user: AdminUser }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-[#EBEBEB] border-r border-[#E5E7EB] flex flex-col py-[18px] px-2.5 z-50">
      <div className="flex items-center gap-3 px-2 mb-[22px] py-4">
        <div className="w-12 h-12 rounded-full bg-[#D1D5DB] flex-shrink-0 overflow-hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="48" height="48" fill="#D1D5DB" />
              <circle cx="24" cy="19" r="9" fill="#9CA3AF" />
              <ellipse cx="24" cy="42" rx="15" ry="11" fill="#9CA3AF" />
            </svg>
          )}
        </div>
        <div className="leading-none min-w-0">
          <div className="font-semibold text-[#111111] mb-1 text-sm truncate">{user.name}</div>
          <div className="text-xs text-[#6B7280]">Admin</div>
        </div>
      </div>

      <nav className="flex flex-col gap-px flex-1">
        {adminNav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-[9px] px-2.5 mx-2 py-2 rounded-[7px] text-sm transition-colors ${
                active
                  ? "bg-[#111111] text-white"
                  : "text-[#111111] hover:bg-[#D1D5DB]"
              }`}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-[9px] px-2.5 mx-2 py-2 rounded-[7px] text-sm text-[#111111] hover:bg-[#D1D5DB] transition-colors"
      >
        <LogOut size={15} className="flex-shrink-0" />
        <span>Sign out</span>
      </button>
    </aside>
  )
}
