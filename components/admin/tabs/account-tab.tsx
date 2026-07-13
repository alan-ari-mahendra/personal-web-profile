"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

type User = { id: string; name: string; email: string; image?: string | null }

const inputCls =
  "border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 bg-surface-2 text-ink w-full"

export function AccountTab({ user }: { user: User }) {
  const router = useRouter()
  const [name, setName] = useState(user.name)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.image ?? null)
  const [avatarKey, setAvatarKey] = useState(0)
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append("file", file)
    const res = await fetch("/api/admin/avatar", { method: "POST", body: form })
    const data = await res.json()
    if (data.url) {
      setAvatarUrl(data.url)
      setAvatarKey((k) => k + 1)
      setStatus({ msg: "Avatar updated.", ok: true })
      router.refresh()
    } else {
      setStatus({ msg: data.error ?? "Upload failed.", ok: false })
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const result = await authClient.updateUser({ name, image: avatarUrl ?? undefined })
    setStatus(result.error ? { msg: "Failed to update profile.", ok: false } : { msg: "Profile saved.", ok: true })
  }

  return (
    <div className="flex flex-col gap-8 max-w-md">
      {/* Avatar */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-ink">Avatar</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-surface-2 overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <Image key={avatarKey} src={avatarUrl} alt="Avatar" width={80} height={80} className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <rect width="80" height="80" fill="#17181a" />
                <circle cx="40" cy="32" r="15" fill="#8a8a8a" />
                <ellipse cx="40" cy="70" rx="25" ry="18" fill="#8a8a8a" />
              </svg>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="border border-line bg-surface text-ink text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors"
            >
              Change avatar
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <p className="text-xs text-subtle mt-1">JPEG, PNG, WebP or GIF. Max 2 MB.</p>
          </div>
        </div>
      </section>

      {/* Profile info */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-ink">Profile Info</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ink">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ink">Email</label>
            <input type="email" value={user.email} className={inputCls + " opacity-50 cursor-not-allowed"} disabled />
            <p className="text-xs text-subtle">Email cannot be changed.</p>
          </div>
          <button
            type="submit"
            className="self-start bg-brand text-black text-sm font-medium px-4 py-1.5 rounded-lg hover:opacity-90 transition-colors"
          >
            Save changes
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
