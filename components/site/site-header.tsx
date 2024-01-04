"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "./logo"

import { MobileHeader } from "./mobile-header"
import { NavigationMenus } from "./nav-menus"
import { ProfileMenu } from "./profile-menu"
import { Sidebar } from "./side-bar"

interface SiteHeaderProps {
  simple?: boolean
  extraMenu?: React.ReactNode
  parentPath?: string
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  simple,
  extraMenu,
  parentPath = "/dashboard",
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 flex flex-col z-40 w-full border-b bg-slate-600 px-2 items-center"
      )}
    >
      <div className="hidden w-full items-center space-x-4 py-2 sm:justify-between sm:space-x-0 md:flex max-w-screen-2xl">
        <div className="flex gap-6 md:gap-10">
          <Link
            href={parentPath}
            className="hidden items-center space-x-2 md:flex"
          >
            <Logo />
          </Link>
          {!simple && <NavigationMenus />}
          {extraMenu}
        </div>
        <ProfileMenu parentPath={parentPath} />
      </div>
      <MobileHeader parentPath={parentPath} />
      <Sidebar />
    </header>
  )
}
