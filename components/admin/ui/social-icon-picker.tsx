"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Upload } from "lucide-react"
import { SocialLinkIcon, LUCIDE_SOCIAL_MAP } from "@/components/social-link-icon"

const LUCIDE_ICONS = Object.keys(LUCIDE_SOCIAL_MAP).map((name) => ({
  value: name,
  label: name.replace(/([A-Z])/g, " $1").trim(),
}))

type Mode = "LUCIDE" | "CUSTOM"

interface Props {
  iconType: Mode
  iconValue: string
  onChange: (iconType: Mode, iconValue: string) => void
  onCustomFile: (file: File) => void
  onClose: () => void
}

export function SocialIconPicker({ iconType, iconValue, onChange, onCustomFile, onClose }: Props) {
  const [tab, setTab] = useState<Mode>(iconType)
  const [search, setSearch] = useState("")
  const overlayRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = search
    ? LUCIDE_ICONS.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : LUCIDE_ICONS

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onCustomFile(file)
    onChange("CUSTOM", iconValue)
    onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="bg-surface rounded-2xl shadow-2xl w-[420px] max-h-[70vh] flex flex-col overflow-hidden border border-line">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <div className="flex gap-1 flex-1">
            <button
              onClick={() => { setTab("LUCIDE"); setSearch("") }}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${tab === "LUCIDE" ? "bg-brand text-black" : "text-subtle hover:text-ink"}`}
            >
              Icons
            </button>
            <button
              onClick={() => setTab("CUSTOM")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${tab === "CUSTOM" ? "bg-brand text-black" : "text-subtle hover:text-ink"}`}
            >
              Custom SVG
            </button>
          </div>
          <button onClick={onClose} className="text-subtle hover:text-ink transition-colors">
            <X size={16} />
          </button>
        </div>

        {tab === "LUCIDE" ? (
          <>
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-line">
              <Search size={14} className="text-subtle flex-shrink-0" />
              <input
                autoFocus
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-subtle outline-none"
              />
            </div>

            {/* Grid */}
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-7 gap-1.5">
                {filtered.map((icon) => (
                  <SocialIconBtn
                    key={icon.value}
                    iconValue={icon.value}
                    label={icon.label}
                    selected={tab === iconType && iconValue === icon.value}
                    onSelect={() => { onChange("LUCIDE", icon.value); onClose() }}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-sm text-subtle text-center py-8">No icons match "{search}"</p>
              )}
            </div>
          </>
        ) : (
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-surface-2 flex items-center justify-center">
              {iconType === "CUSTOM" && iconValue ? (
                <img src={iconValue} width={32} height={32} alt="" className="object-contain" />
              ) : (
                <Upload size={24} className="text-subtle" />
              )}
            </div>
            <p className="text-sm text-subtle text-center">
              Upload an SVG file to use as icon.<br />Stored as base64 data URL.
            </p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 text-sm font-medium bg-brand text-black rounded-lg hover:opacity-90 transition-colors"
            >
              Choose SVG file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".svg,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function SocialIconBtn({ iconValue, label, selected, onSelect }: { iconValue: string; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onSelect}
      className={`group relative flex items-center justify-center w-full aspect-square rounded-lg transition-all ${
        selected
          ? "bg-brand text-black"
          : "text-ink/70 hover:bg-surface-2 hover:text-ink"
      }`}
    >
      <SocialLinkIcon iconType="LUCIDE" iconValue={iconValue} size={18} />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface-2 text-ink text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {label}
      </span>
    </button>
  )
}
