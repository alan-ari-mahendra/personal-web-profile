"use client"

import {
  X,
  Link,
  GitFork,
  Camera,
  Globe,
  Mail,
  BookOpen,
  Rss,
  Video,
  AtSign,
  MessageCircle,
  Phone,
  ExternalLink,
  Send,
} from "lucide-react"

export const LUCIDE_SOCIAL_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  X,
  Link,
  GitFork,
  Camera,
  Globe,
  Mail,
  BookOpen,
  Rss,
  Video,
  AtSign,
  MessageCircle,
  Phone,
  ExternalLink,
  Send,
}

export function SocialLinkIcon({
  iconType,
  iconValue,
  size = 18,
  className,
}: {
  iconType: string
  iconValue: string
  size?: number
  className?: string
}) {
  if (iconType === "LUCIDE") {
    const Icon = LUCIDE_SOCIAL_MAP[iconValue]
    return Icon ? <Icon size={size} className={className} /> : <Globe size={size} className={className} />
  }
  return <img src={iconValue} width={size} height={size} alt="" className={`object-contain ${className ?? ""}`} />
}
