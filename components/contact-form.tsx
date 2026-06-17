"use client"

import { useState } from "react"

type FormState = "idle" | "submitting" | "success"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [state, setState] = useState<FormState>("idle")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState("submitting")
    // Simulate async send — replace with real API call later
    setTimeout(() => {
      setState("success")
      setName("")
      setEmail("")
      setMessage("")
    }, 800)
  }

  if (state === "success") {
    return (
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 flex flex-col items-center text-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-lg">
          ✓
        </div>
        <p className="text-base font-semibold text-[#111111]">Message sent!</p>
        <p className="text-sm text-[#6B7280]">
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-xs text-[#9CA3AF] underline underline-offset-2 hover:text-[#111111] transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#374151]">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alan Ari"
            className="rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#9CA3AF] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#374151]">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#9CA3AF] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#374151]">Message</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Alan, I'd love to chat about..."
          className="rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#111111]/10 focus:border-[#9CA3AF] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-[#111111] text-white text-sm font-semibold py-2.5 hover:bg-[#222222] active:bg-[#000000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
