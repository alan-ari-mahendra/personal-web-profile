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
} from "lucide-react"

const LUCIDE_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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
    const Icon = LUCIDE_MAP[iconValue]
    return Icon ? <Icon size={size} className={className} /> : <Globe size={size} className={className} />
  }
  return <img src={iconValue} width={size} height={size} alt="" className={`object-contain ${className ?? ""}`} />
}
