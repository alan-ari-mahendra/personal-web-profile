"use client"

import {
  SiGit,
  SiGithub,
  SiFigma,
  SiLinear,
  SiAnthropic,
  SiVercel,
  SiPerplexity,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiTailwindcss,
  SiPrisma,
} from "@icons-pack/react-simple-icons"
import { Code2, Terminal, Sparkles, Bot } from "lucide-react"

type IconProps = { size?: number; className?: string }

const SI_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  linear: SiLinear,
  anthropic: SiAnthropic,
  vercel: SiVercel,
  perplexity: SiPerplexity,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  python: SiPython,
  fastapi: SiFastapi,
  tailwindcss: SiTailwindcss,
  prisma: SiPrisma,
}

const LUCIDE_MAP: Record<string, React.ComponentType<IconProps>> = {
  "code-2": Code2,
  terminal: Terminal,
  sparkles: Sparkles,
  bot: Bot,
}

export function ToolIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  if (icon.startsWith("si:")) {
    const slug = icon.slice(3)
    const Icon = SI_MAP[slug]
    return Icon ? <Icon size={size} /> : null
  }

  if (icon.startsWith("lucide:")) {
    const slug = icon.slice(7)
    const Icon = LUCIDE_MAP[slug]
    return Icon ? <Icon size={size} /> : null
  }

  // custom uploaded SVG or image path
  return <img src={icon} width={size} height={size} alt="" className="object-contain" />
}
