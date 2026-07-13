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
      <div className="rounded-xl border border-line bg-surface p-8 flex flex-col items-center text-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-950/60 text-green-400 flex items-center justify-center text-lg">
          ✓
        </div>
        <p className="text-base font-semibold text-ink">Message sent!</p>
        <p className="text-sm text-subtle">
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-xs text-subtle underline underline-offset-2 hover:text-brand transition-colors"
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
          <label className="text-xs font-medium text-ink/80">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alan Ari"
            className="rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink/80">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-ink/80">Message</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Alan, I'd love to chat about..."
          className="rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-brand text-black text-sm font-semibold py-2.5 hover:opacity-90 active:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
