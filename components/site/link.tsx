import React, { PropsWithChildren, memo, useCallback } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"

interface LinkProps extends PropsWithChildren {
  title: string
  href: string
  isActive?: boolean
  className?: string
}

export const Link: React.FC<LinkProps> = memo(
  ({ title, href, isActive, className, ...props }) => {
    const router = useRouter()
    const handleJump: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
      (e) => {
        e.preventDefault()
        router.push(href)
      },
      [href]
    )
    return (
      <NavigationMenuLink
        href={href}
        className={cn("text-sm", isActive ? "font-bold text-primary" : "", className)}
        active={isActive}
        onClick={handleJump}
        {...props}
      >
        {title}
      </NavigationMenuLink>
    )
  }
)
