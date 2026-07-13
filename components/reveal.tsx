"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  /** Delay in seconds before this element animates in (for light stagger). */
  delay?: number
  /** Render as <section> instead of <div> to preserve semantics. */
  as?: "div" | "section"
  className?: string
}

const VIEWPORT = { once: true, margin: "-80px" } as const
const INITIAL = { opacity: 0, y: 16 }
const IN_VIEW = { opacity: 1, y: 0 }

/**
 * Scroll-reveal wrapper: fades + rises its children once when they scroll into
 * view. Snappy spring character. Fully disabled under prefers-reduced-motion
 * (renders a plain element, content always visible).
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    if (as === "section") return <section className={className}>{children}</section>
    return <div className={className}>{children}</div>
  }

  const transition = { type: "spring" as const, stiffness: 260, damping: 22, delay }

  if (as === "section") {
    return (
      <motion.section
        className={className}
        initial={INITIAL}
        whileInView={IN_VIEW}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.div
      className={className}
      initial={INITIAL}
      whileInView={IN_VIEW}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
