"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"

const inputCls =
  "border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-surface-2 w-full"

export function SecurityTab() {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
      revokeOtherSessions: true,
    })
    if (result.error) {
      setStatus({ msg: "Failed: " + result.error.message, ok: false })
    } else {
      setStatus({ msg: "Password updated.", ok: true })
      setCurrent("")
      setNext("")
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-ink">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ink">Current password</label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className={inputCls}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ink">New password</label>
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className={inputCls}
              autoComplete="new-password"
              required
              minLength={8}
            />
            <p className="text-xs text-subtle">Minimum 8 characters. All other sessions will be signed out.</p>
          </div>
          <button
            type="submit"
            className="self-start border border-line bg-surface text-ink text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors"
          >
            Update password
          </button>
        </form>
      </section>

      {status && (
        <p className={`text-sm border rounded-lg px-3 py-2 ${status.ok ? "border-line text-subtle bg-surface" : "border-red-900/50 text-red-400 bg-red-950/60"}`}>
          {status.msg}
        </p>
      )}
    </div>
  )
}
