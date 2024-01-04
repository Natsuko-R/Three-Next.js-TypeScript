import { memo, useMemo } from "react"

import { Card, CardContent } from "@/components/ui/card"

import { HouseCard, HouseCardProps } from "./house-card"

const HOUSE_LIST: HouseCardProps[] = [
  {
    name: "ハウス 1",
    path: "/dashboard/house1",
  },
  {
    name: "ハウス 2",
    path: "/dashboard/house2",
  },
  {
    name: "ハウス 3",
    path: "/dashboard/house3",
  },
]

export const HousesButtons = memo(() => {
  const HouseList = useMemo(() => {
    return HOUSE_LIST.map((house) => <HouseCard {...house} key={house.name} />)
  }, [])
  return (
    <Card className="mt-2 bg-transparent">
      <CardContent className="grid grid-cols-3 gap-2 p-2">
        {HouseList}
      </CardContent>
    </Card>
  )
})
