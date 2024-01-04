import { useMemo } from "react"
import { Sideview_l } from "@/actions/get-sideview"

import useController from "@/hooks/use-controller"
import { Box } from "@/components/custom-ui/box"

import { LedShed } from "./led-shed"

interface LedStatusProps {
  data: Sideview_l[]
}

export const LedStatus: React.FC<LedStatusProps> = ({ data }) => {
  const { areaValue } = useController()

  const areaLedSystems = useMemo(() => {
    if (!data) return []
    return data.filter((item) => item.area_id === Number(areaValue))
  }, [data, areaValue])

  const LedShedList = useMemo(() => {
    return areaLedSystems.map((item) => (
      <LedShed
        key={item.id}
        id={item.id}
        isOpen={item.state === 1}
        layersNumber={item.led_side_view_num}
      />
    ))
  }, [areaLedSystems])

  return (
    <Box className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full h-auto p-0">
      {LedShedList}
    </Box>
  )
}
