import { useEffect } from "react"

import useController from "@/hooks/use-controller"
import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"
import { Box } from "@/components/custom-ui/box"

import { ControlDeviceStatus } from "./control-device-status"
import { DayNightTemp } from "./day-night-temp"
import { HouseRepresentativeValue } from "./house-representative-value"
import { HouseStatusArea } from "./house-status-area"
import { HouseStatusIrrigation } from "./house-status-irrigation"
import { HouseStatusSensor } from "./house-status-sensor"
import { OutdoorWeather } from "./outdoor-weather"
import { WindowCurtainStatus } from "./window-curtain-status"

export const PresentValue = () => {
  const { controllerValue, houseValue } = useController()
  const { getData } = usePresentValueStore()

  useEffect(() => {
    getData({
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
    })
  }, [getData])

  return (
    <Box className="h-full w-full gap-2 flex-wrap p-0">
      <HouseRepresentativeValue />
      <ControlDeviceStatus />
      <HouseStatusSensor />
      <WindowCurtainStatus />
      <HouseStatusIrrigation />
      <OutdoorWeather />
      <DayNightTemp />
      <HouseStatusArea />
    </Box>
  )
}
