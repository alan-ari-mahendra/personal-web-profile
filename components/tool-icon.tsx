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
  SiReact,
  SiJavascript,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiNodedotjs,
  SiGo,
  SiRust,
  SiSupabase,
  SiStripe,
  SiVuedotjs,
  SiSvelte,
  SiKubernetes,
  SiAstro,
  SiExpress,
  SiHtml5,
  SiCss,
  SiSass,
} from "@icons-pack/react-simple-icons"
import {
  Code2,
  Terminal,
  Sparkles,
  Bot,
  Database,
  Globe,
  Layers,
  Package,
  Server,
  Cpu,
  Zap,
  Shield,
  Cloud,
  Braces,
  FileCode2,
  Workflow,
  Boxes,
} from "lucide-react"

type IconProps = { size?: number; className?: string }

export const SI_MAP: Record<string, React.ComponentType<IconProps>> = {
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
  react: SiReact,
  javascript: SiJavascript,
  docker: SiDocker,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  graphql: SiGraphql,
  nodedotjs: SiNodedotjs,
  go: SiGo,
  rust: SiRust,
  supabase: SiSupabase,
  stripe: SiStripe,
  vuedotjs: SiVuedotjs,
  svelte: SiSvelte,
  kubernetes: SiKubernetes,
  astro: SiAstro,
  express: SiExpress,
  html5: SiHtml5,
  css: SiCss,
  sass: SiSass,
}

export const LUCIDE_TOOL_MAP: Record<string, React.ComponentType<IconProps>> = {
  "code-2": Code2,
  terminal: Terminal,
  sparkles: Sparkles,
  bot: Bot,
  database: Database,
  globe: Globe,
  layers: Layers,
  package: Package,
  server: Server,
  cpu: Cpu,
  zap: Zap,
  shield: Shield,
  cloud: Cloud,
  braces: Braces,
  "file-code-2": FileCode2,
  workflow: Workflow,
  boxes: Boxes,
}

export function ToolIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  if (icon.startsWith("si:")) {
    const slug = icon.slice(3)
    const Icon = SI_MAP[slug]
    return Icon ? <Icon size={size} /> : null
  }

  if (icon.startsWith("lucide:")) {
    const slug = icon.slice(7)
    const Icon = LUCIDE_TOOL_MAP[slug]
    return Icon ? <Icon size={size} /> : null
  }

  return <img src={icon} width={size} height={size} alt="" className="object-contain" />
}
