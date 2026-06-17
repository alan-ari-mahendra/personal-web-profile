import { Sidebar } from "@/components/sidebar"
import { LiveClock } from "@/components/live-clock"
import { prisma } from "@/lib/prisma"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } })

  return (
    <>
      <Sidebar socialLinks={socialLinks} />
      <div className="ml-[240px] max-sm:ml-14 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#E5E7EB] px-14 py-[14px] flex items-center justify-between max-md:px-7 max-sm:px-5">
          <a
            href="#"
            className="text-sm text-[#111111] font-medium hover:underline underline-offset-[2px]"
          >
            Reach out →
          </a>
          <span className="text-sm text-[#6B7280]">Made by Alan | © 2026</span>
          <LiveClock />
        </footer>
      </div>
    </>
  )
}
