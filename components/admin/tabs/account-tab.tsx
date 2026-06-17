"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

type User = { id: string; name: string; email: string; image?: string | null }

const inputCls =
  "border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]/20 bg-white w-full"

export function AccountTab({ user }: { user: User }) {
  const [name, setName] = useState(user.name)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.image ?? null)
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
      setAvatarUrl(data.url + "?t=" + Date.now())
      setStatus({ msg: "Avatar updated.", ok: true })
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
        <h2 className="text-base font-semibold text-[#111111]">Avatar</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#D1D5DB] overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" width={80} height={80} className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 80 80" className="w-full h-full">
                <rect width="80" height="80" fill="#D1D5DB" />
                <circle cx="40" cy="32" r="15" fill="#9CA3AF" />
                <ellipse cx="40" cy="70" rx="25" ry="18" fill="#9CA3AF" />
              </svg>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="border border-[#E5E7EB] bg-white text-[#111111] text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-[#F9FAFB] transition-colors"
            >
              Change avatar
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <p className="text-xs text-[#6B7280] mt-1">JPEG, PNG, WebP or GIF. Max 2 MB.</p>
          </div>
        </div>
      </section>

      {/* Profile info */}
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-[#111111]">Profile Info</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#111111]">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#111111]">Email</label>
            <input type="email" value={user.email} className={inputCls + " opacity-50 cursor-not-allowed"} disabled />
            <p className="text-xs text-[#9CA3AF]">Email cannot be changed.</p>
          </div>
          <button
            type="submit"
            className="self-start bg-[#111111] text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-[#222222] transition-colors"
          >
            Save changes
          </button>
        </form>
      </section>

      {status && (
        <p className={`text-sm border rounded-lg px-3 py-2 ${status.ok ? "border-[#E5E7EB] text-[#6B7280] bg-white" : "border-red-200 text-red-600 bg-red-50"}`}>
          {status.msg}
        </p>
      )}
    </div>
  )
}
