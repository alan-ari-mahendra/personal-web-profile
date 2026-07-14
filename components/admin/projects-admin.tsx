"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Pencil, Trash2, Plus, X, Upload, ExternalLink } from "lucide-react"

type ProjectLink = { label: string; href: string }

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  category: string[]
  status: "active" | "archived"
  links: ProjectLink[]
  gradient: string
  thumbnail: string | null
  createdAt: string
}

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  category: "",
  status: "active" as "active" | "archived",
  links: [{ label: "", href: "" }] as ProjectLink[],
  gradient: "from-[#111111] via-[#222222] to-[#111111]",
  thumbnail: null as string | null,
}

const inputCls =
  "border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 bg-surface w-full"

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [editData, setEditData] = useState(emptyForm)
  const [status, setStatus] = useState("")
  const [uploading, setUploading] = useState(false)
  const [editUploading, setEditUploading] = useState(false)
  const addFileRef = useRef<HTMLInputElement>(null)
  const editFileRef = useRef<HTMLInputElement>(null)

  async function fetchProjects() {
    const res = await fetch("/api/projects")
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  function flash(msg: string) {
    setStatus(msg)
    setTimeout(() => setStatus(""), 3000)
  }

  async function uploadThumbnail(file: File): Promise<string | null> {
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/projects/upload", { method: "POST", body: fd })
    if (!res.ok) {
      const err = await res.json()
      flash(err.error ?? "Upload failed")
      return null
    }
    const { url } = await res.json()
    return url
  }

  async function handleAdd() {
    if (!form.title || !form.description || !form.gradient) {
      flash("Title, description, and gradient required")
      return
    }
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        category: form.category.split(",").map((c) => c.trim()).filter(Boolean),
        links: form.links.filter((l) => l.label && l.href),
      }),
    })
    if (!res.ok) { flash("Failed to create project"); return }
    await fetchProjects()
    setForm(emptyForm)
    setShowAdd(false)
    flash("Project created")
  }

  async function handleUpdate() {
    if (!editId) return
    const res = await fetch(`/api/projects/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editData,
        tags: editData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        category: editData.category.split(",").map((c) => c.trim()).filter(Boolean),
        links: editData.links.filter((l) => l.label && l.href),
      }),
    })
    if (!res.ok) { flash("Failed to update project"); return }
    await fetchProjects()
    setEditId(null)
    flash("Project updated")
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
    if (!res.ok) { flash("Failed to delete project"); return }
    setProjects((p) => p.filter((x) => x.id !== id))
    flash("Project deleted")
  }

  function startEdit(p: Project) {
    setEditId(p.id)
    setEditData({
      title: p.title,
      description: p.description,
      tags: p.tags.join(", "),
      category: (p.category ?? []).join(", "),
      status: p.status,
      links: p.links.length ? p.links : [{ label: "", href: "" }],
      gradient: p.gradient,
      thumbnail: p.thumbnail,
    })
  }

  function updateFormLink(
    data: typeof emptyForm,
    setData: (v: typeof emptyForm) => void,
    idx: number,
    field: keyof ProjectLink,
    value: string
  ) {
    const links = [...data.links]
    links[idx] = { ...links[idx], [field]: value }
    setData({ ...data, links })
  }

  function addLink(data: typeof emptyForm, setData: (v: typeof emptyForm) => void) {
    setData({ ...data, links: [...data.links, { label: "", href: "" }] })
  }

  function removeLink(data: typeof emptyForm, setData: (v: typeof emptyForm) => void, idx: number) {
    setData({ ...data, links: data.links.filter((_, i) => i !== idx) })
  }

  // Render helper (NOT a nested component). Rendering this via a JSX element
  // (<ProjectForm/>) would give it a fresh component identity on every parent
  // render, remounting the inputs and dropping focus after each keystroke.
  // Calling it as a plain function inlines its elements into the parent tree,
  // so the inputs keep their DOM identity and focus is preserved.
  function renderProjectForm({
    data,
    setData,
    onSubmit,
    submitLabel,
    fileRef,
    isUploading,
    setIsUploading,
  }: {
    data: typeof emptyForm
    setData: (v: typeof emptyForm) => void
    onSubmit: () => void
    submitLabel: string
    fileRef: React.RefObject<HTMLInputElement | null>
    isUploading: boolean
    setIsUploading: (v: boolean) => void
  }) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-subtle mb-1">Title *</label>
            <input
              className={inputCls}
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Project name"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-subtle mb-1">Description *</label>
            <textarea
              className={inputCls + " resize-none"}
              rows={3}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Short project description"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-subtle mb-1">Tags (comma-separated)</label>
            <input
              className={inputCls}
              value={data.tags}
              onChange={(e) => setData({ ...data, tags: e.target.value })}
              placeholder="Next.js, TypeScript, AI"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-subtle mb-1">Category (comma-separated, for /projects filter)</label>
            <input
              className={inputCls}
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              placeholder="SaaS, LLM, Automation"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-subtle mb-1">Status</label>
            <select
              className={inputCls}
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value as "active" | "archived" })}
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-subtle mb-1">Gradient *</label>
            <input
              className={inputCls}
              value={data.gradient}
              onChange={(e) => setData({ ...data, gradient: e.target.value })}
              placeholder="from-[#111111] via-[#222222] to-[#111111]"
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <label className="block text-xs font-medium text-subtle mb-1">Links</label>
          <div className="space-y-2">
            {data.links.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  className={inputCls}
                  value={link.label}
                  onChange={(e) => updateFormLink(data, setData, idx, "label", e.target.value)}
                  placeholder="Label"
                />
                <input
                  className={inputCls}
                  value={link.href}
                  onChange={(e) => updateFormLink(data, setData, idx, "href", e.target.value)}
                  placeholder="https://..."
                />
                {data.links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(data, setData, idx)}
                    className="text-subtle hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLink(data, setData)}
              className="flex items-center gap-1 text-xs text-subtle hover:text-ink transition-colors"
            >
              <Plus size={12} /> Add link
            </button>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-xs font-medium text-subtle mb-1">Thumbnail</label>
          {data.thumbnail && (
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2 bg-surface-2">
              <Image src={data.thumbnail} alt="thumbnail" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setData({ ...data, thumbnail: null })}
                className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setIsUploading(true)
              const url = await uploadThumbnail(file)
              if (url) setData({ ...data, thumbnail: url })
              setIsUploading(false)
              e.target.value = ""
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-1.5 text-xs border border-line rounded-lg px-3 py-1.5 hover:bg-surface-2 transition-colors disabled:opacity-50"
          >
            <Upload size={12} />
            {isUploading ? "Uploading…" : "Upload thumbnail"}
          </button>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="bg-brand text-black text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Projects</h1>
          <p className="text-sm text-subtle mt-0.5">Manage portfolio projects</p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 bg-brand text-black text-sm px-3 py-1.5 rounded-lg hover:opacity-90 transition-colors"
          >
            <Plus size={14} /> Add project
          </button>
        )}
      </div>

      {showAdd && (
        <div className="border border-line rounded-xl p-5 mb-6 bg-surface">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-ink">New project</span>
            <button onClick={() => { setShowAdd(false); setForm(emptyForm) }} className="text-subtle hover:text-ink">
              <X size={16} />
            </button>
          </div>
          {renderProjectForm({
            data: form,
            setData: setForm,
            onSubmit: handleAdd,
            submitLabel: "Create project",
            fileRef: addFileRef,
            isUploading: uploading,
            setIsUploading: setUploading,
          })}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-subtle">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-subtle">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="border border-line rounded-xl bg-surface overflow-hidden">
              {editId === p.id ? (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-ink">Edit project</span>
                    <button onClick={() => setEditId(null)} className="text-subtle hover:text-ink">
                      <X size={16} />
                    </button>
                  </div>
                  {renderProjectForm({
                    data: editData,
                    setData: setEditData,
                    onSubmit: handleUpdate,
                    submitLabel: "Save changes",
                    fileRef: editFileRef,
                    isUploading: editUploading,
                    setIsUploading: setEditUploading,
                  })}
                </div>
              ) : (
                <div className="flex items-start gap-4 p-4">
                  {p.thumbnail ? (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-surface-2">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${p.gradient}`}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-ink truncate">{p.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          p.status === "active"
                            ? "bg-green-950/60 text-green-400"
                            : "bg-surface-2 text-subtle"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-subtle mb-1.5 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {(p.category ?? []).map((cat) => (
                        <span key={cat} className="text-[10px] bg-brand/15 text-brand px-1.5 py-0.5 rounded-full font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-surface-2 text-subtle px-1.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {(p.links as ProjectLink[]).length > 0 && (
                      <div className="flex gap-2 mt-1.5">
                        {(p.links as ProjectLink[]).map((link, i) => (
                          <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-0.5 text-[10px] text-subtle hover:text-ink transition-colors"
                          >
                            <ExternalLink size={10} /> {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="p-1.5 rounded-lg text-subtle hover:text-ink hover:bg-surface-2 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-subtle hover:text-red-400 hover:bg-red-950/60 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {status && (
        <p className="mt-4 text-sm text-subtle">{status}</p>
      )}
    </div>
  )
}
