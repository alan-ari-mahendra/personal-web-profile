"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { ToolIcon, SI_MAP, LUCIDE_TOOL_MAP } from "@/components/tool-icon"

const SI_ICONS = Object.keys(SI_MAP).map((slug) => ({
  value: `si:${slug}`,
  label: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/dot/g, "."),
  group: "Brand" as const,
}))

const LUCIDE_ICONS = Object.keys(LUCIDE_TOOL_MAP).map((slug) => ({
  value: `lucide:${slug}`,
  label: slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" "),
  group: "Lucide" as const,
}))

const ALL_ICONS = [...SI_ICONS, ...LUCIDE_ICONS]

interface Props {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export function ToolIconPicker({ value, onChange, onClose }: Props) {
  const [search, setSearch] = useState("")
  const overlayRef = useRef<HTMLDivElement>(null)

  const filtered = search
    ? ALL_ICONS.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()) || i.value.includes(search.toLowerCase()))
    : ALL_ICONS

  const siFiltered = filtered.filter((i) => i.group === "Brand")
  const lucideFiltered = filtered.filter((i) => i.group === "Lucide")

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="bg-[#111111] rounded-2xl shadow-2xl w-[520px] max-h-[80vh] flex flex-col overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={15} className="text-white/40 flex-shrink-0" />
          <input
            autoFocus
            placeholder="Search icons…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
          />
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 flex flex-col gap-5">
          {siFiltered.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Brand</p>
              <div className="grid grid-cols-8 gap-1.5">
                {siFiltered.map((icon) => (
                  <IconBtn
                    key={icon.value}
                    icon={icon.value}
                    label={icon.label}
                    selected={value === icon.value}
                    onSelect={() => { onChange(icon.value); onClose() }}
                  />
                ))}
              </div>
            </section>
          )}

          {lucideFiltered.length > 0 && (
            <section>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Lucide</p>
              <div className="grid grid-cols-8 gap-1.5">
                {lucideFiltered.map((icon) => (
                  <IconBtn
                    key={icon.value}
                    icon={icon.value}
                    label={icon.label}
                    selected={value === icon.value}
                    onSelect={() => { onChange(icon.value); onClose() }}
                  />
                ))}
              </div>
            </section>
          )}

          {siFiltered.length === 0 && lucideFiltered.length === 0 && (
            <p className="text-sm text-white/30 text-center py-8">No icons match "{search}"</p>
          )}
        </div>
      </div>
    </div>
  )
}

function IconBtn({ icon, label, selected, onSelect }: { icon: string; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onSelect}
      className={`group relative flex items-center justify-center w-full aspect-square rounded-lg transition-all ${
        selected
          ? "bg-white text-[#111111]"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <ToolIcon icon={icon} size={18} />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#222] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {label}
      </span>
    </button>
  )
}
