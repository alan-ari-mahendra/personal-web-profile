"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Pencil, Trash2, Plus, X, Upload, Eye, EyeOff } from "lucide-react"
import { RichTextEditor } from "@/components/admin/ui/rich-text-editor"

type Blog = {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  readingTime: string
  slug: string
  gradient: string
  thumbnail: string | null
  published: boolean
  content: string
  createdAt: string
}

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  date: new Date().toISOString().split("T")[0],
  readingTime: "",
  slug: "",
  gradient: "from-[#111111] via-[#222222] to-[#111111]",
  thumbnail: null as string | null,
  published: false,
  content: "",
}

const inputCls =
  "border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#111111]/20 bg-white w-full"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [editData, setEditData] = useState(emptyForm)
  const [statusMsg, setStatusMsg] = useState("")
  const [uploading, setUploading] = useState(false)
  const [editUploading, setEditUploading] = useState(false)
  const addFileRef = useRef<HTMLInputElement>(null)
  const editFileRef = useRef<HTMLInputElement>(null)

  async function fetchBlogs() {
    const res = await fetch("/api/blogs")
    setBlogs(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchBlogs() }, [])

  function flash(msg: string) {
    setStatusMsg(msg)
    setTimeout(() => setStatusMsg(""), 3000)
  }

  async function uploadThumbnail(file: File): Promise<string | null> {
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/blogs/upload", { method: "POST", body: fd })
    if (!res.ok) { flash((await res.json()).error ?? "Upload failed"); return null }
    return (await res.json()).url
  }

  async function handleAdd() {
    if (!form.title || !form.description || !form.slug || !form.content) {
      flash("Title, description, slug, and content required")
      return
    }
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    if (!res.ok) { flash(data.error ?? "Failed to create blog"); return }
    await fetchBlogs()
    setForm(emptyForm)
    setShowAdd(false)
    flash("Blog created")
  }

  async function handleUpdate() {
    if (!editId) return
    const res = await fetch(`/api/blogs/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editData,
        tags: editData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    if (!res.ok) { flash(data.error ?? "Failed to update blog"); return }
    await fetchBlogs()
    setEditId(null)
    flash("Blog updated")
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
    if (!res.ok) { flash("Failed to delete blog"); return }
    setBlogs((b) => b.filter((x) => x.id !== id))
    flash("Blog deleted")
  }

  async function togglePublished(blog: Blog) {
    const res = await fetch(`/api/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blog, tags: blog.tags, published: !blog.published }),
    })
    if (!res.ok) { flash("Failed to update"); return }
    setBlogs((b) => b.map((x) => x.id === blog.id ? { ...x, published: !x.published } : x))
  }

  function startEdit(b: Blog) {
    setEditId(b.id)
    setEditData({
      title: b.title,
      description: b.description,
      tags: b.tags.join(", "),
      date: new Date(b.date).toISOString().split("T")[0],
      readingTime: b.readingTime,
      slug: b.slug,
      gradient: b.gradient,
      thumbnail: b.thumbnail,
      published: b.published,
      content: b.content,
    })
  }

  function BlogForm({
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
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Title *</label>
            <input
              className={inputCls}
              value={data.title}
              onChange={(e) => {
                const title = e.target.value
                setData({ ...data, title, slug: slugify(title) })
              }}
              placeholder="Blog post title"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Slug *</label>
            <input
              className={inputCls}
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: slugify(e.target.value) })}
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Description *</label>
            <textarea
              className={inputCls + " resize-none"}
              rows={2}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Short description shown on listing page"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Date</label>
            <input
              type="date"
              className={inputCls}
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Reading time</label>
            <input
              className={inputCls}
              value={data.readingTime}
              onChange={(e) => setData({ ...data, readingTime: e.target.value })}
              placeholder="5 min read"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Tags (comma-separated)</label>
            <input
              className={inputCls}
              value={data.tags}
              onChange={(e) => setData({ ...data, tags: e.target.value })}
              placeholder="Next.js, TypeScript, AI"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1">Gradient *</label>
            <input
              className={inputCls}
              value={data.gradient}
              onChange={(e) => setData({ ...data, gradient: e.target.value })}
              placeholder="from-[#111111] via-[#222222] to-[#111111]"
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              id="published-toggle"
              type="checkbox"
              checked={data.published}
              onChange={(e) => setData({ ...data, published: e.target.checked })}
              className="w-4 h-4 rounded accent-[#111111]"
            />
            <label htmlFor="published-toggle" className="text-sm text-[#111111]">
              Published
            </label>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-xs font-medium text-[#6B7280] mb-1">Thumbnail</label>
          {data.thumbnail && (
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2 bg-[#F3F4F6]">
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
            className="flex items-center gap-1.5 text-xs border border-[#E5E7EB] rounded-lg px-3 py-1.5 hover:bg-[#F3F4F6] transition-colors disabled:opacity-50"
          >
            <Upload size={12} />
            {isUploading ? "Uploading…" : "Upload thumbnail"}
          </button>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-[#6B7280] mb-1">Content *</label>
          <RichTextEditor
            value={data.content}
            onChange={(md) => setData({ ...data, content: md })}
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="bg-[#111111] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#222222] transition-colors"
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
          <h1 className="text-2xl font-bold text-[#111111]">Blog</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">Manage blog posts</p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 bg-[#111111] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-[#222222] transition-colors"
          >
            <Plus size={14} /> New post
          </button>
        )}
      </div>

      {showAdd && (
        <div className="border border-[#E5E7EB] rounded-xl p-5 mb-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-[#111111]">New blog post</span>
            <button onClick={() => { setShowAdd(false); setForm(emptyForm) }} className="text-[#9CA3AF] hover:text-[#111111]">
              <X size={16} />
            </button>
          </div>
          <BlogForm
            data={form}
            setData={setForm}
            onSubmit={handleAdd}
            submitLabel="Create post"
            fileRef={addFileRef}
            isUploading={uploading}
            setIsUploading={setUploading}
          />
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[#6B7280]">Loading…</p>
      ) : blogs.length === 0 ? (
        <p className="text-sm text-[#6B7280]">No blog posts yet.</p>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.id} className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden">
              {editId === b.id ? (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-[#111111]">Edit post</span>
                    <button onClick={() => setEditId(null)} className="text-[#9CA3AF] hover:text-[#111111]">
                      <X size={16} />
                    </button>
                  </div>
                  <BlogForm
                    data={editData}
                    setData={setEditData}
                    onSubmit={handleUpdate}
                    submitLabel="Save changes"
                    fileRef={editFileRef}
                    isUploading={editUploading}
                    setIsUploading={setEditUploading}
                  />
                </div>
              ) : (
                <div className="flex items-start gap-4 p-4">
                  {b.thumbnail ? (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#F3F4F6]">
                      <Image src={b.thumbnail} alt={b.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${b.gradient}`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-[#111111] truncate">{b.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          b.published
                            ? "bg-green-50 text-green-700"
                            : "bg-[#F3F4F6] text-[#6B7280]"
                        }`}
                      >
                        {b.published ? "published" : "draft"}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1 line-clamp-1">{b.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#9CA3AF]">
                      <span>{new Date(b.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      {b.readingTime && <><span>·</span><span>{b.readingTime}</span></>}
                      <span>·</span>
                      <span className="font-mono">{b.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => togglePublished(b)}
                      title={b.published ? "Unpublish" : "Publish"}
                      className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
                    >
                      {b.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                      onClick={() => startEdit(b)}
                      className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-colors"
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

      {statusMsg && <p className="mt-4 text-sm text-[#6B7280]">{statusMsg}</p>}
    </div>
  )
}
