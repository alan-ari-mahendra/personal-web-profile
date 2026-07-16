import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { SocialLinkIcon } from "@/components/social-link-icon"

const EMAIL = "dev.alanari14@gmail.com"

export const metadata: Metadata = {
  title: "Contact - Alan Ari Mahendra",
  description:
    "Get in touch with Alan Ari Mahendra, fullstack developer building ERP, CRM, web systems, automation, and AI chatbots. Email, GitHub, LinkedIn, WhatsApp. Remote, async-first, GMT+7.",
}

function hostLabel(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export default async function ContactPage() {
  const dbLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } })
  // Show the real, non-placeholder socials from the DB. The email channel is
  // rendered separately below with the marketing email, so drop the DB "Email".
  const socials = dbLinks.filter((l) => l.url !== "#" && l.label.toLowerCase() !== "email")

  return (
    <main className="relative overflow-hidden">
      <div className="blob -left-32 -top-32 h-96 w-96 bg-primary-200" />
      <div className="blob -right-24 top-40 h-80 w-80 bg-secondary-100" />

      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects · Usually replies within a day
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s talk about your project
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Whether it&apos;s a new build, a workflow automation, an AI chatbot, or an audit of an
            existing codebase, tell me what you&apos;re working on. I&apos;m based in Semarang
            (GMT+7), remote and async-first, and I reply in fluent English.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 6.5 8.5 6 8.5-6" />
              </svg>
              Email me
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 hover:text-primary-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1zM4 15a1 1 0 011 1v1h10v-1a1 1 0 112 0v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Contact channels */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 6.5 8.5 6 8.5-6" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900">Email</span>
              <span className="block truncate text-sm text-slate-500">{EMAIL}</span>
            </span>
          </a>

          {/* Social / contact links from the DB */}
          {socials.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <SocialLinkIcon iconType={link.iconType} iconValue={link.iconValue} size={20} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-slate-900">{link.label}</span>
                <span className="block truncate text-sm text-slate-500">{hostLabel(link.url) || link.url}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
