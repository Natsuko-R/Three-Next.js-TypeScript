"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/context/auth-context"

import { SYSTEM_TYPE_ENUM } from "@/config/consts"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Link } from "./link"
import { BASIC_PLAN_MENU, FARM_DATA_MENU, SETTING_MENU } from "./menu-data"
import { MenuGroup, MenuGroupList } from "./menu-group"

interface LinkItemProps {
  title: string
  href: string
}

const THREE_D_LINKS: LinkItemProps[] = [
  {
    title: "3Dハウス",
    href: "/dashboard/3d-house",
  },
  {
    title: "農場一覧",
    href: "/dashboard/farm-list",
  },
  // {
  //   title: "デバイス一覧-センサ",
  //   href: "/dashboard/device-list-sensor",
  // },
  {
    title: "デバイス一覧-バルブ",
    href: "/dashboard/device-list-valve",
  },
  {
    title: "デバイス一覧-リレー",
    href: "/dashboard/device-list-relay",
  },
  {
    title: "アラート一覧",
    href: "/dashboard/alert-list",
  },
  {
    title: "天候と予報",
    href: "/dashboard/weather-forecast",
  },
  {
    title: "CSV出力",
    href: "/dashboard/csv-download",
  },
]

export function NavigationMenus() {
  const { user } = useAuthContext()

  const isController = user?.controller_type === SYSTEM_TYPE_ENUM.type1000w

  const settingMenus = useMemo(() => {
    return isController ? SETTING_MENU.slice(0, 1) : SETTING_MENU
  }, [isController])

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8">3D農場</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <ul className="grid gap-3 p-6 md:w-[200px]">{ThreeDFarm}</ul> */}
            <MenuGroup title="農場データ" menus={FARM_DATA_MENU} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8">設定</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuGroupList
              className="min-w-[200px] justify-start"
              data={settingMenus}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
        {!isController && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-8">
              基本プラン
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <MenuGroupList
                data={BASIC_PLAN_MENU}
                className="grid w-[400px] grid-cols-3 justify-center"
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {/* <NavigationMenuItem>
          <Link title="オムニアの輪" href="/dashboard/community" />
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
