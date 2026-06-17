import { prisma } from "@/lib/prisma"
import { SocialLinkIcon } from "./social-link-icon"

export async function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string
  itemClassName?: string
}) {
  const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } })

  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          <SocialLinkIcon iconType={link.iconType} iconValue={link.iconValue} />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  )
}
