"use client"

import { memo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/auth-context"
import { HelpCircle, Key, LogOut, User } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileMenuProps {
  parentPath: string
}

export const ProfileMenu: React.FC<ProfileMenuProps> = memo(
  ({ parentPath }) => {
    const { signOut, user } = useAuthContext()
    const router = useRouter()
    const handleLogout = useCallback(() => {
      signOut()
      router.push("/login")
    }, [])

    const toChangePassword = useCallback(() => {
      router.push(`${parentPath}/change-password`)
    }, [])

    const toProfile = useCallback(() => {
      router.push(`${parentPath}/profile`)
    }, [router])

    const toHelper = useCallback(() => {
      router.push(`${parentPath}/helper`)
    }, [router])

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center">
            <span className="mr-2 text-sm text-slate-600">
              {/* {user?.customername} 様 */}
              Natsuki 様
            </span>
            {/* <Avatar className="w-[28px] h-[28px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />s
              <AvatarFallback className="text-slate-400">U</AvatarFallback>
            </Avatar> */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={toChangePassword}
            >
              <Key className="mr-2 h-4 w-4" />
              <span>パスワードを変更する</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={toProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>プロフィール</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={toHelper}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>ヘルプ</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>ログアウト</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)
