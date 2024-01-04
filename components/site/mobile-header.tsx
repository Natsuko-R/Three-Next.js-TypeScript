"use client"

import { Menu } from "lucide-react"

import { IconButton } from "../custom-ui/icon-button"
import { ProfileMenu } from "./profile-menu"

interface MobileHeaderProps {
  parentPath?: string
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  parentPath = "/dashboard",
}) => {
  return (
    <div className="flex w-full h-16 items-center justify-between px-2 md:hidden">
      <IconButton>
        <Menu size={22} />
      </IconButton>
      <ProfileMenu parentPath={parentPath} />
    </div>
  )
}
