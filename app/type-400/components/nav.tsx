"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function Nav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/type-400/pagination"
          className={cn(
            "font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/type-400/pagination")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          農場一覧
        </Link>
        <Link
          href="/type-400/3d-house"
          className={cn(
            "font-semibold transition-colors hover:text-foreground/80",
            pathname === "/type-400/3d-house"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          3Dハウス
        </Link>
        <Link
          href="/type-400/graph"
          className={cn(
            "font-semibold transition-colors hover:text-foreground/80",
            pathname === "/type-400/graph"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          グラフ
        </Link>
        <Link
          href="/type-400/csv-download"
          className={cn(
            "font-semibold transition-colors hover:text-foreground/80",
            pathname?.startsWith("/type-400/csv-download")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          CSV出力
        </Link>
      </nav>
    </div>
  )
}
