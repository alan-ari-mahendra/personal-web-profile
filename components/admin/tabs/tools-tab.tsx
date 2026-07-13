"use client"

import { useState, useEffect } from "react"
import { ToolIcon } from "@/components/tool-icon"
import { ToolIconPicker } from "@/components/admin/ui/tool-icon-picker"
import { Trash2, Pencil, Plus, Check, X, ChevronDown, ChevronRight } from "lucide-react"

type Tool = {
  id: string
  name: string
  description: string
  icon: string
  bg: string
  order: number
  categoryId: string
}

type Category = {
  id: string
  label: string
  order: number
  tools: Tool[]
}

const inputCls =
  "border border-line rounded-lg px-3 py-2 text-sm bg-surface-2 text-ink placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50"

const blankTool = { name: "", description: "", icon: "lucide:code-2", bg: "#F3F4F6", order: 0 }

function IconPickerTrigger({ icon, bg, onClick }: { icon: string; bg: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 border border-line rounded-lg px-3 py-2 bg-surface-2 hover:bg-surface transition-colors text-sm text-subtle w-full"
    >
      <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-black" style={{ background: bg }}>
        <ToolIcon icon={icon} size={14} />
      </div>
      <span className="flex-1 text-left truncate text-xs font-mono">{icon}</span>
      <span className="text-[10px] text-subtle">change</span>
    </button>
  )
}

export function ToolsTab() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<string | null>(null)
  const [picker, setPicker] = useState<{ target: "new" | string } | null>(null)

  // Category state
  const [showAddCat, setShowAddCat] = useState(false)
  const [newCatLabel, setNewCatLabel] = useState("")
  const [newCatOrder, setNewCatOrder] = useState(0)
  const [editCatId, setEditCatId] = useState<string | null>(null)
  const [editCatData, setEditCatData] = useState({ label: "", order: 0 })

  // Tool state
  const [addToolCatId, setAddToolCatId] = useState<string | null>(null)
  const [newTool, setNewTool] = useState({ ...blankTool })
  const [editToolId, setEditToolId] = useState<string | null>(null)
  const [editToolData, setEditToolData] = useState({ ...blankTool, categoryId: "" })

  useEffect(() => {
    fetch("/api/tools/categories")
      .then((r) => r.json())
      .then((d) => { setCategories(d); setLoading(false) })
  }, [])

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/tools/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newCatLabel, order: newCatOrder }),
    })
    const data = await res.json()
    if (res.ok) {
      setCategories((prev) => [...prev, { ...data, tools: [] }])
      setNewCatLabel("")
      setNewCatOrder(0)
      setShowAddCat(false)
      setStatus("Category added.")
    } else {
      setStatus(data.error ?? "Failed.")
    }
  }

  async function handleUpdateCategory(id: string) {
    const res = await fetch(`/api/tools/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCatData),
    })
    const data = await res.json()
    if (res.ok) {
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
      setEditCatId(null)
      setStatus("Category updated.")
    } else {
      setStatus(data.error ?? "Failed.")
    }
  }

  async function handleDeleteCategory(id: string) {
    await fetch(`/api/tools/categories/${id}`, { method: "DELETE" })
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setStatus("Category deleted.")
  }

  async function handleAddTool(e: React.FormEvent, categoryId: string) {
    e.preventDefault()
    const res = await fetch("/api/tools/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTool, categoryId }),
    })
    const data = await res.json()
    if (res.ok) {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, tools: [...c.tools, data] } : c))
      )
      setNewTool({ ...blankTool })
      setAddToolCatId(null)
      setStatus("Tool added.")
    } else {
      setStatus(data.error ?? "Failed.")
    }
  }

  async function handleUpdateTool(id: string) {
    const res = await fetch(`/api/tools/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editToolData),
    })
    const data = await res.json()
    if (res.ok) {
      setCategories((prev) =>
        prev.map((c) => ({
          ...c,
          tools: c.tools.map((t) => (t.id === id ? { ...t, ...data } : t)),
        }))
      )
      setEditToolId(null)
      setStatus("Tool updated.")
    } else {
      setStatus(data.error ?? "Failed.")
    }
  }

  async function handleDeleteTool(id: string, categoryId: string) {
    await fetch(`/api/tools/items/${id}`, { method: "DELETE" })
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, tools: c.tools.filter((t) => t.id !== id) } : c))
    )
    setStatus("Tool deleted.")
  }

  const currentPickerValue = picker?.target === "new" ? newTool.icon : editToolData.icon

  function handlePickerSelect(value: string) {
    if (picker?.target === "new") {
      setNewTool((d) => ({ ...d, icon: value }))
    } else if (picker?.target) {
      setEditToolData((d) => ({ ...d, icon: value }))
    }
    setPicker(null)
  }

  if (loading) return <p className="text-sm text-subtle">Loading…</p>

  return (
    <>
      {picker && (
        <ToolIconPicker
          value={currentPickerValue}
          onChange={handlePickerSelect}
          onClose={() => setPicker(null)}
        />
      )}

      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Tools & Stack</h2>
          <button
            onClick={() => setShowAddCat((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium bg-brand text-black px-3 py-1.5 rounded-lg hover:opacity-90 transition-colors"
          >
            <Plus size={14} />
            Add category
          </button>
        </div>

        {/* Add category form */}
        {showAddCat && (
          <form onSubmit={handleAddCategory} className="border border-line rounded-xl p-4 flex flex-col gap-3 bg-surface-2">
            <h3 className="text-sm font-semibold text-ink">New category</h3>
            <div className="flex gap-3">
              <input
                placeholder="Label"
                value={newCatLabel}
                onChange={(e) => setNewCatLabel(e.target.value)}
                className={inputCls + " flex-1"}
                required
              />
              <input
                type="number"
                placeholder="Order"
                value={newCatOrder}
                onChange={(e) => setNewCatOrder(+e.target.value)}
                className={inputCls + " w-24"}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="text-sm font-medium border border-line text-ink px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">Add</button>
              <button type="button" onClick={() => setShowAddCat(false)} className="text-sm font-medium border border-line text-ink px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {/* Categories */}
        {categories.length === 0 && <p className="text-sm text-subtle">No categories yet.</p>}
        {categories.map((cat) => (
          <div key={cat.id} className="border border-line rounded-xl overflow-hidden bg-surface">
            {/* Category header */}
            {editCatId === cat.id ? (
              <div className="px-4 py-3 bg-surface-2 flex items-center gap-3">
                <input
                  value={editCatData.label}
                  onChange={(e) => setEditCatData((d) => ({ ...d, label: e.target.value }))}
                  className={inputCls + " flex-1"}
                />
                <input
                  type="number"
                  value={editCatData.order}
                  onChange={(e) => setEditCatData((d) => ({ ...d, order: +e.target.value }))}
                  className={inputCls + " w-20"}
                />
                <button onClick={() => handleUpdateCategory(cat.id)} className="p-1.5 rounded-lg border border-line text-ink hover:bg-surface-2 transition-colors">
                  <Check size={14} />
                </button>
                <button onClick={() => setEditCatId(null)} className="p-1.5 rounded-lg border border-line text-subtle hover:bg-surface-2 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 flex items-center gap-2 bg-surface-2 group">
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [cat.id]: !c[cat.id] }))}
                  className="text-subtle hover:text-ink transition-colors"
                >
                  {collapsed[cat.id] ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                </button>
                <span className="flex-1 text-sm font-semibold text-ink">{cat.label}</span>
                <span className="text-xs text-subtle font-mono tabular-nums">#{cat.order}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditCatId(cat.id); setEditCatData({ label: cat.label, order: cat.order }) }}
                    className="p-1.5 rounded-lg hover:bg-surface-2 text-subtle transition-colors"
                  >
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 rounded-lg hover:bg-red-950/60 text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* Tools list */}
            {!collapsed[cat.id] && (
              <div className="divide-y divide-line">
                {cat.tools.map((tool) =>
                  editToolId === tool.id ? (
                    <div key={tool.id} className="p-4 flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-subtle">Name</label>
                          <input value={editToolData.name} onChange={(e) => setEditToolData((d) => ({ ...d, name: e.target.value }))} className={inputCls} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-subtle">Icon</label>
                          <IconPickerTrigger
                            icon={editToolData.icon}
                            bg={editToolData.bg}
                            onClick={() => setPicker({ target: tool.id })}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-subtle">Description</label>
                          <input value={editToolData.description} onChange={(e) => setEditToolData((d) => ({ ...d, description: e.target.value }))} className={inputCls} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-subtle">BG color</label>
                          <div className="flex gap-2 items-center">
                            <input value={editToolData.bg} onChange={(e) => setEditToolData((d) => ({ ...d, bg: e.target.value }))} className={inputCls + " flex-1"} placeholder="#F3F4F6" />
                            <input type="color" value={editToolData.bg} onChange={(e) => setEditToolData((d) => ({ ...d, bg: e.target.value }))} className="w-8 h-8 rounded border border-line cursor-pointer p-0.5" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-subtle">Order</label>
                          <input type="number" value={editToolData.order} onChange={(e) => setEditToolData((d) => ({ ...d, order: +e.target.value }))} className={inputCls} />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateTool(tool.id)} className="flex items-center gap-1 text-sm font-medium border border-line text-ink px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">
                          <Check size={13} /> Save
                        </button>
                        <button onClick={() => setEditToolId(null)} className="flex items-center gap-1 text-sm border border-line text-ink px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={tool.id} className="px-4 py-3 flex items-center gap-3 group">
                      <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 text-black" style={{ background: tool.bg }}>
                        <ToolIcon icon={tool.icon} size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink">{tool.name}</p>
                        <p className="text-xs text-subtle truncate">{tool.description}</p>
                      </div>
                      <span className="text-xs text-subtle font-mono tabular-nums">#{tool.order}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditToolId(tool.id)
                            setEditToolData({ name: tool.name, description: tool.description, icon: tool.icon, bg: tool.bg, order: tool.order, categoryId: tool.categoryId })
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-2 text-subtle transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => handleDeleteTool(tool.id, cat.id)} className="p-1.5 rounded-lg hover:bg-red-950/60 text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )
                )}

                {/* Add tool form */}
                {addToolCatId === cat.id ? (
                  <form onSubmit={(e) => handleAddTool(e, cat.id)} className="p-4 flex flex-col gap-3 bg-surface-2">
                    <p className="text-xs font-semibold text-subtle">New tool in {cat.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-subtle">Name</label>
                        <input value={newTool.name} onChange={(e) => setNewTool((d) => ({ ...d, name: e.target.value }))} className={inputCls} required />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-subtle">Icon</label>
                        <IconPickerTrigger
                          icon={newTool.icon}
                          bg={newTool.bg}
                          onClick={() => setPicker({ target: "new" })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-subtle">Description</label>
                        <input value={newTool.description} onChange={(e) => setNewTool((d) => ({ ...d, description: e.target.value }))} className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-subtle">BG color</label>
                        <div className="flex gap-2 items-center">
                          <input value={newTool.bg} onChange={(e) => setNewTool((d) => ({ ...d, bg: e.target.value }))} className={inputCls + " flex-1"} placeholder="#F3F4F6" />
                          <input type="color" value={newTool.bg} onChange={(e) => setNewTool((d) => ({ ...d, bg: e.target.value }))} className="w-8 h-8 rounded border border-line cursor-pointer p-0.5" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-subtle">Order</label>
                        <input type="number" value={newTool.order} onChange={(e) => setNewTool((d) => ({ ...d, order: +e.target.value }))} className={inputCls} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="text-sm font-medium border border-line text-ink px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">Add</button>
                      <button type="button" onClick={() => { setAddToolCatId(null); setNewTool({ ...blankTool }) }} className="text-sm font-medium border border-line text-ink px-4 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => { setAddToolCatId(cat.id); setNewTool({ ...blankTool }) }}
                    className="w-full px-4 py-2.5 flex items-center gap-2 text-xs font-medium text-subtle hover:text-ink hover:bg-surface-2 transition-colors"
                  >
                    <Plus size={13} /> Add tool to {cat.label}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {status && (
          <p className="text-sm border border-line text-subtle bg-surface rounded-lg px-3 py-2">{status}</p>
        )}
      </div>
    </>
  )
}
