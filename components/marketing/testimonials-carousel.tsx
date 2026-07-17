"use client"

import { useEffect, useRef, useState } from "react"

type Testimonial = {
  quote: string
  initials: string
  name: string
  role: string
}

// Shows 2 cards per screen on sm+ (1 on mobile), revealed by sliding one
// card at a time via native scroll-snap. The number of valid screen
// positions (and dots) is derived from actual DOM measurements — not a
// hardcoded items-per-view — so it adapts correctly whether 1 or 2 cards
// are visible: with 3 items shown 2-at-a-time that's 2 screens (dots), not
// 3 (which would be one per item and allow a dead extra "next" click).
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  function cardStep(): number {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>("[data-card]")
    if (!track || !card) return 0
    const style = getComputedStyle(track)
    const gap = parseFloat(style.columnGap || style.gap || "0")
    return card.getBoundingClientRect().width + gap
  }

  function recompute() {
    const track = trackRef.current
    const step = cardStep()
    if (!track || !step) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const computed = Math.max(0, Math.round(maxScroll / step))
    setMaxIndex(computed)
    setActive((a) => Math.min(a, computed))
  }

  useEffect(() => {
    recompute()
    const track = trackRef.current
    if (!track) return
    const ro = new ResizeObserver(recompute)
    ro.observe(track)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  function goTo(i: number) {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(i, maxIndex))
    track.scrollTo({ left: clamped * cardStep(), behavior: "smooth" })
    setActive(clamped)
  }

  function handleScroll() {
    const track = trackRef.current
    const step = cardStep()
    if (!track || !step) return
    setActive(Math.max(0, Math.min(Math.round(track.scrollLeft / step), maxIndex)))
  }

  const screenCount = maxIndex + 1

  return (
    <div className="mt-14">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((t) => (
          <figure
            key={t.name}
            data-card
            className="w-full flex-none snap-start sm:w-[calc(50%-12px)]"
          >
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <svg className="h-8 w-8 flex-none text-primary-200" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-600">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="font-display flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {screenCount > 1 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: screenCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to screen ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-5 bg-primary-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active >= maxIndex}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-primary-300 hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
