"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"
import { Icon, IconName } from "@/components/custom-ui/icon"

export interface HouseCardProps {
  name: string
  path: string
  icon?: IconName
}

export const HouseCard: React.FC<HouseCardProps> = ({
  name,
  path,
  icon = "Home",
}) => {
  const router = useRouter()
  const handleClicked = useCallback(() => {
    router.push(path)
  }, [path])
  return (
    <Card className="cursor-pointer rounded bg-transparent" onClick={handleClicked}>
      <CardContent className="flex select-none flex-col items-center p-2">
        <Icon name={icon} className="text-slate-500" />
        <span className="mt-1">{name}</span>
      </CardContent>
    </Card>
  )
}
