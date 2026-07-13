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
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-surface border-r border-line flex flex-col py-[18px] px-2.5 z-50">
      <div className="flex items-center gap-3 px-2 mb-[22px] py-4">
        <div className="w-12 h-12 rounded-full bg-surface-2 flex-shrink-0 overflow-hidden">
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
              <rect width="48" height="48" fill="#17181a" />
              <circle cx="24" cy="19" r="9" fill="#8a8a8a" />
              <ellipse cx="24" cy="42" rx="15" ry="11" fill="#8a8a8a" />
            </svg>
          )}
        </div>
        <div className="leading-none min-w-0">
          <div className="font-semibold text-ink mb-1 text-sm truncate">{user.name}</div>
          <div className="text-xs text-subtle">Admin</div>
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
                  ? "bg-brand text-black"
                  : "text-ink hover:bg-surface-2"
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
        className="flex items-center gap-[9px] px-2.5 mx-2 py-2 rounded-[7px] text-sm text-ink hover:bg-surface-2 transition-colors"
      >
        <LogOut size={15} className="flex-shrink-0" />
        <span>Sign out</span>
      </button>
    </aside>
  )
}
