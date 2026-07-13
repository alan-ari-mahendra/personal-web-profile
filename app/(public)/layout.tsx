import { headers } from "next/headers"
import { Sidebar } from "@/components/sidebar"
import { LiveClock } from "@/components/live-clock"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const imageUrl =
    session?.user?.image ??
    (await prisma.user.findFirst({ select: { image: true } }))?.image ??
    null

  return (
    <>
      <Sidebar imageUrl={imageUrl} />
      <div className="ml-[240px] max-sm:ml-14 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line px-14 py-[14px] flex items-center justify-between max-md:px-7 max-sm:px-5">
          <a
            href="/contact"
            className="text-sm text-ink font-medium hover:text-brand hover:underline underline-offset-[2px] transition-colors"
          >
            Reach out →
          </a>
          <span className="text-sm text-subtle">Made by Alan Ari Mahendra | © 2026</span>
          <LiveClock />
        </footer>
      </div>
    </>
  )
}
