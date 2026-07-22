"use client"

import { useState } from "react"
import { motion } from "motion/react"
import type { Lead } from "@/lib/demos"

function ContactChip({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="text-slate-400">{label}</span>
      <span className="truncate font-medium text-slate-700">{value}</span>
    </>
  )
  const className =
    "inline-flex max-w-full items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs"

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} transition hover:bg-slate-200`}>
        {inner}
      </a>
    )
  }
  return <span className={className}>{inner}</span>
}

function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  const [emailOpen, setEmailOpen] = useState(index === 0)
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText(`Subject: ${lead.emailSubject}\n\n${lead.emailBody}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-display text-lg font-bold text-slate-900">{lead.name}</h4>
            {lead.address && <p className="mt-0.5 text-sm text-slate-500">{lead.address}</p>}
          </div>
          {lead.category && (
            <span className="flex-none rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold capitalize text-primary-700">
              {lead.category.replace(/_/g, " ")}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {lead.phone && <ContactChip label="Phone" value={lead.phone} href={`tel:${lead.phone}`} />}
          {lead.email && <ContactChip label="Email" value={lead.email} href={`mailto:${lead.email}`} />}
          {lead.website && <ContactChip label="Web" value={lead.website.replace(/^https?:\/\//, "")} href={lead.website} />}
          {!lead.phone && !lead.email && !lead.website && (
            <ContactChip label="Contact" value="none listed publicly" />
          )}
        </div>
      </div>

      {lead.painPoints.length > 0 && (
        <div className="border-b border-slate-100 bg-amber-50/40 p-5">
          <h5 className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Likely pain points
          </h5>
          <ul className="mt-2.5 space-y-2">
            {lead.painPoints.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-5">
        <button
          onClick={() => setEmailOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Generated email
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900">
              {lead.emailSubject}
            </span>
          </span>
          <svg
            className={`h-4 w-4 flex-none text-slate-400 transition-transform ${emailOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {emailOpen && (
          <div className="mt-3">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {lead.emailBody}
            </pre>
            <button
              onClick={copyEmail}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function DemoLeadResults({ leads, durationMs }: { leads: Lead[]; durationMs: number | null }) {
  const withEmail = leads.filter((l) => l.email).length
  const withoutWebsite = leads.filter((l) => !l.website).length

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { value: String(leads.length), label: "leads enriched" },
          { value: String(withoutWebsite), label: "with no website" },
          { value: String(withEmail), label: "with public email" },
          { value: durationMs ? `${Math.round(durationMs / 1000)}s` : "-", label: "run time" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
            <div className="font-display text-xl font-extrabold text-slate-900">{stat.value}</div>
            <div className="mt-0.5 text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {leads.map((lead, i) => (
          <LeadCard key={`${lead.name}-${i}`} lead={lead} index={i} />
        ))}
      </div>
    </div>
  )
}
