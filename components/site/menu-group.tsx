import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { NavigationMenuItem } from "@/components/ui/navigation-menu"

import { Link } from "./link"
import { LinkItemProps, MenuGroupProps } from "./menu-data"

export const MenuGroup: React.FC<MenuGroupProps> = ({ title, menus }) => {
  const pathname = usePathname()

  const Links = useMemo(
    () =>
      menus?.map(({ title, href }: LinkItemProps) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            className="block whitespace-nowrap px-2"
            key={title}
            title={title}
            href={href}
            isActive={isActive}
          />
        )
      }),
    [pathname, menus]
  )
  return (
    <div className="p-3">
      <ul className="flex flex-col gap-2">
        <NavigationMenuItem className="px-2 text-sm font-bold">
          {title}
        </NavigationMenuItem>
        {Links}
      </ul>
    </div>
  )
}

interface MenuGroupListProps {
  data: MenuGroupProps[]
  className?: string
}

export const MenuGroupList: React.FC<MenuGroupListProps> = ({
  data,
  className,
}) => {
  const List = useMemo(() => {
    return data.map(({ title, menus }) => (
      <MenuGroup title={title} menus={menus} key={title} />
    ))
  }, [])
  return (
    <div className={cn("flex justify-center gap-2", className)}>{List}</div>
  )
}
