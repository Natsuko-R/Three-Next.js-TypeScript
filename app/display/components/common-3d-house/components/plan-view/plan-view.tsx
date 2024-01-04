import { useCallback, useEffect, useMemo, useState } from "react"

import useController from "@/hooks/use-controller"
import { Button } from "@/components/ui/button"
import { Box } from "@/components/custom-ui/box"
import { BaseSearchHeader } from "@/components/sensor-form-base/base-search-header"

import { usePlanviewStore } from "../../hooks/usePlanviewStore"
import { Empty } from "../empty"
import { AirStatus } from "./air-status"
import { Co2PositionView } from "./co2-postion-view"
import { CO2Status } from "./co2-status"
import { IrrigationStatus } from "./irrigation-status"
import { ButtonItemType } from "./types"

export const PlanView = () => {
  const [current, setCurrent] = useState<ButtonItemType>({
    id: 1,
    label: "潅水状況",
  })
  const { controllerValue, houseValue } = useController()
  const { getData, irrigationData, co2Data, airData, co2ImgUrl } =
    usePlanviewStore()

  useEffect(() => {
    if (!controllerValue || !houseValue) return
    getData({
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
    })
  }, [getData, controllerValue, houseValue])

  const handleClick = useCallback(
    (item: ButtonItemType) => () => {
      setCurrent(item)
    },
    []
  )

  const list = useMemo(() => {
    const btn1 = !!irrigationData
      ? [
          {
            id: 1,
            label: "潅水状況",
          },
        ]
      : []
    const btn2 = !!co2Data
      ? [
          {
            id: 2,
            label: "CO₂状況",
          },
        ]
      : []
    const btn3 = !!airData
      ? [
          {
            id: 3,
            label: "Air状況",
          },
        ]
      : []
    const btn4 = !!co2ImgUrl
      ? [
          {
            id: 4,
            label: "CO₂センサ",
          },
        ]
      : []

    const list: ButtonItemType[] = [...btn1, ...btn2, ...btn3, ...btn4]
    return list
  }, [irrigationData, co2Data, airData, co2ImgUrl])

  useEffect(() => {
    list && list.length > 0 && setCurrent(list[0])
  }, [list])

  const Buttons = useMemo(() => {
    return list.map(({ id, label }) => (
      <Button
        variant={current.id === id ? "default" : "secondary"}
        size="sm"
        className="p-0 px-1 sm:px-2"
        onClick={handleClick({ id, label })}
        key={id}
      >
        {label}
      </Button>
    ))
  }, [handleClick, current, list])

  return (
    <Box className="h-full flex-col rounded-md p-0">
      <BaseSearchHeader hideArea className="max-w-screen-2xl" />
      <Box className="flex-col md:flex-row p-0 mt-2 items-center justify-center">
        <Box className="w-[100px] p-0">
          <span className="text-md font-semibold">{current.label}</span>
        </Box>
        <Box className="items-center justify-center flex-1 gap-2">
          {Buttons}
        </Box>
        <Box className="w-[100px] p-0"></Box>
      </Box>
      <Box className="flex-1 items-center justify-center">
        {current.id === 1 && irrigationData && irrigationData.length > 0 && (
          <IrrigationStatus data={irrigationData || []} />
        )}
        {current.id === 2 && <CO2Status data={co2Data || []} />}
        {current.id === 3 && <AirStatus data={airData || []} />}
        {current.id === 4 && <Co2PositionView img={co2ImgUrl} />}
      </Box>
    </Box>
  )
}
