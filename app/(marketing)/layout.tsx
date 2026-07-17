import type { Metadata } from "next"
import Link from "next/link"
import { Open_Sans, Rubik } from "next/font/google"
import { prisma } from "@/lib/prisma"
import "./marketing.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
})

const EMAIL = "dev.alanari14@gmail.com"

export const metadata: Metadata = {
  title: "Alan Ari Mahendra - ERP, CRM & Automation Systems Developer",
  description:
    "I build custom ERP, CRM, and web systems, automate the workflows behind them, and ship AI chatbots that actually work. 38+ projects shipped. Remote, async-first, GMT+7.",
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profileImage = (await prisma.user.findFirst({ select: { image: true } }))?.image ?? null

  return (
    <div
      className={`${openSans.variable} ${rubik.variable} min-h-screen bg-white text-slate-800 antialiased`}
      style={{ fontFamily: "var(--font-open-sans), ui-sans-serif, system-ui", colorScheme: "light" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/60 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="/#top" className="font-display flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
            {profileImage ? (
              <span className="relative flex h-12 w-12 flex-none overflow-hidden rounded-full ring-1 ring-slate-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImage}
                  alt="Alan Ari Mahendra"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </span>
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-sm text-white">A</span>
            )}
            <span className="text-primary-600">alanari.com</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="/#about" className="transition hover:text-primary-600">About</a>
            <a href="/#services" className="transition hover:text-primary-600">Services</a>
            <a href="/#portfolio" className="transition hover:text-primary-600">Portfolio</a>
            <a href="/#testimonials" className="transition hover:text-primary-600">Testimonials</a>
          </nav>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition hover:bg-primary-700"
          >
            Get in touch
          </Link>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="/#top" className="font-display flex items-center gap-2 text-base font-extrabold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs">A</span>
              alanari.com
            </a>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
              <a href={`mailto:${EMAIL}`} className="transition hover:text-white">Email</a>
              <a href="https://github.com/alan-ari-mahendra" className="transition hover:text-white">GitHub</a>
              <Link href="/projects" className="transition hover:text-white">All projects</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs sm:flex-row">
            <span>© 2026 Alan Ari Mahendra</span>
            <span>Indonesia · GMT+7 · Fluent English · Serving US, Australia &amp; Europe</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
