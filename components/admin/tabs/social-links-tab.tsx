"use client"

import { useState, useEffect } from "react"
import { SocialLinkIcon } from "@/components/social-link-icon"
import { SocialIconPicker } from "@/components/admin/ui/social-icon-picker"
import { Trash2, Pencil, Plus, Check, X } from "lucide-react"

type SocialLink = {
  id: string
  label: string
  url: string
  iconType: "LUCIDE" | "CUSTOM"
  iconValue: string
  order: number
}

type LinkForm = { label: string; url: string; iconType: "LUCIDE" | "CUSTOM"; iconValue: string; order: number }

const LUCIDE_ICONS = ["X", "Link", "GitFork", "Camera", "Globe", "Mail", "BookOpen", "Rss", "Video", "AtSign", "MessageCircle", "Phone", "ExternalLink", "Send"]

const inputCls =
  "border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 bg-surface-2"

const blankForm: LinkForm = { label: "", url: "", iconType: "LUCIDE", iconValue: "Globe", order: 0 }

type PickerTarget = "new" | string // "new" for add form, link.id for edit

function IconPickerTrigger({ iconType, iconValue, onClick }: { iconType: "LUCIDE" | "CUSTOM"; iconValue: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 bg-surface hover:bg-surface-2 transition-colors text-sm text-subtle w-full"
    >
      <div className="w-5 h-5 flex items-center justify-center text-ink">
        <SocialLinkIcon iconType={iconType} iconValue={iconValue} size={16} />
      </div>
      <span className="flex-1 text-left text-xs truncate">{iconType === "LUCIDE" ? iconValue : "Custom SVG"}</span>
      <span className="text-[10px] text-subtle">change</span>
    </button>
  )
}

export function SocialLinksTab() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState<LinkForm>({ ...blankForm })
  const [form, setForm] = useState<LinkForm>({ ...blankForm })
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [editCustomFile, setEditCustomFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [picker, setPicker] = useState<PickerTarget | null>(null)

  useEffect(() => {
    fetch("/api/social-links")
      .then((r) => r.json())
      .then((d) => { setLinks(d); setLoading(false) })
  }, [])

  async function uploadCustomIcon(file: File): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/social-links/upload", { method: "POST", body: fd })
    const data = await res.json()
    return data.url ?? data.data ?? ""
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    let iconValue = form.iconValue
    if (form.iconType === "CUSTOM" && customFile) {
      iconValue = await uploadCustomIcon(customFile)
    }
    const res = await fetch("/api/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, iconValue }),
    })
    const data = await res.json()
    if (res.ok) {
      setLinks((prev) => [...prev, data])
      setForm({ ...blankForm })
      setCustomFile(null)
      setShowAdd(false)
      setStatus("Link added.")
    } else {
      setStatus(data.error ?? "Failed to add.")
    }
  }

  function startEdit(link: SocialLink) {
    setEditId(link.id)
    setEditData({ label: link.label, url: link.url, iconType: link.iconType, iconValue: link.iconValue, order: link.order })
    setEditCustomFile(null)
  }

  async function handleUpdate(id: string) {
    let iconValue = editData.iconValue
    if (editData.iconType === "CUSTOM" && editCustomFile) {
      iconValue = await uploadCustomIcon(editCustomFile)
    }
    const res = await fetch(`/api/social-links/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editData, iconValue }),
    })
    const data = await res.json()
    if (res.ok) {
      setLinks((prev) => prev.map((l) => (l.id === id ? data : l)))
      setEditId(null)
      setStatus("Link updated.")
    } else {
      setStatus(data.error ?? "Failed to update.")
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/social-links/${id}`, { method: "DELETE" })
    setLinks((prev) => prev.filter((l) => l.id !== id))
    setStatus("Link deleted.")
  }

  // Picker handlers
  const pickerIconType = picker === "new" ? form.iconType : (editData.iconType)
  const pickerIconValue = picker === "new" ? form.iconValue : editData.iconValue

  function handlePickerChange(iconType: "LUCIDE" | "CUSTOM", iconValue: string) {
    if (picker === "new") {
      setForm((f) => ({ ...f, iconType, iconValue }))
    } else if (picker) {
      setEditData((d) => ({ ...d, iconType, iconValue }))
    }
  }

  function handlePickerCustomFile(file: File) {
    if (picker === "new") setCustomFile(file)
    else setEditCustomFile(file)
  }

  if (loading) return <p className="text-sm text-subtle">Loading…</p>

  return (
    <>
      {picker !== null && (
        <SocialIconPicker
          iconType={pickerIconType}
          iconValue={pickerIconValue}
          onChange={handlePickerChange}
          onCustomFile={handlePickerCustomFile}
          onClose={() => setPicker(null)}
        />
      )}

      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Social Links</h2>
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium border border-line text-ink px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors"
          >
            <Plus size={14} />
            Add link
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <form onSubmit={handleAdd} className="border border-line rounded-xl p-4 flex flex-col gap-3 bg-surface-2">
            <h3 className="text-sm font-semibold text-ink">New link</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-subtle">Label</label>
                <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-subtle">URL</label>
                <input type="url" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className={inputCls} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-subtle">Icon</label>
                <IconPickerTrigger
                  iconType={form.iconType}
                  iconValue={form.iconValue}
                  onClick={() => setPicker("new")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-subtle">Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: +e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="text-sm font-medium bg-brand text-black px-4 py-1.5 rounded-lg hover:opacity-90 transition-colors">
                Add
              </button>
              <button type="button" onClick={() => setShowAdd(false)} className="text-sm font-medium border border-line bg-surface px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="flex flex-col gap-2">
          {links.length === 0 && <p className="text-sm text-subtle">No social links yet.</p>}
          {links.map((link) =>
            editId === link.id ? (
              <div key={link.id} className="border border-brand/30 rounded-xl p-4 flex flex-col gap-3 bg-surface">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-subtle">Label</label>
                    <input value={editData.label} onChange={(e) => setEditData((d) => ({ ...d, label: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-subtle">URL</label>
                    <input type="url" value={editData.url} onChange={(e) => setEditData((d) => ({ ...d, url: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-subtle">Icon</label>
                    <IconPickerTrigger
                      iconType={editData.iconType}
                      iconValue={editData.iconValue}
                      onClick={() => setPicker(link.id)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-subtle">Order</label>
                    <input type="number" value={editData.order} onChange={(e) => setEditData((d) => ({ ...d, order: +e.target.value }))} className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(link.id)} className="flex items-center gap-1 text-sm font-medium bg-brand text-black px-3 py-1.5 rounded-lg hover:opacity-90 transition-colors">
                    <Check size={13} /> Save
                  </button>
                  <button onClick={() => setEditId(null)} className="flex items-center gap-1 text-sm border border-line bg-surface text-ink px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={link.id} className="border border-line rounded-xl px-4 py-3 flex items-center gap-3 bg-surface group">
                <div className="w-8 h-8 flex items-center justify-center text-ink">
                  <SocialLinkIcon iconType={link.iconType} iconValue={link.iconValue} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{link.label}</p>
                  <p className="text-xs text-subtle truncate">{link.url}</p>
                </div>
                <span className="text-xs text-subtle tabular-nums font-mono">#{link.order}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(link)} className="p-1.5 rounded-lg hover:bg-surface-2 text-subtle transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="p-1.5 rounded-lg hover:bg-red-950/60 text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {status && (
          <p className="text-sm border border-line text-subtle bg-surface rounded-lg px-3 py-2">{status}</p>
        )}
      </div>
    </>
  )
}
