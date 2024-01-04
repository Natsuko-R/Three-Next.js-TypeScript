import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuthContext } from "@/context/auth-context"

import { SYSTEM_TYPE_ENUM } from "@/config/consts"
import useController from "@/hooks/use-controller"
import { Button } from "@/components/ui/button"
import { Box } from "@/components/custom-ui/box"

import { useSideviewStore } from "../../hooks/useSideviewStore"
import { Empty } from "../empty"
import { CO2Status } from "./co2-status"
import { IrrigationStatus } from "./irrigation-status"
import { LedStatus } from "./led-status"
import { SideViewSearchHeader } from "./side-view-search-header"
import { ButtonItemType } from "./types"

export const SideView = () => {
  const [current, setCurrent] = useState<ButtonItemType>({
    id: 1,
    label: "潅水状況",
  })

  const { controllerValue, houseValue } = useController()
  const { getData, irrigationData, co2Data, ledData } = useSideviewStore()
  const { user } = useAuthContext()
  const isType1000wUser = user?.controller_type === SYSTEM_TYPE_ENUM.type1000w

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

  const Buttons = useMemo(() => {
    const list: ButtonItemType[] = [
      {
        id: 1,
        label: "潅水状況",
      },
      {
        id: 2,
        label: "CO₂状況",
      },
    ]
    // 1000w has no led tab
    if (!isType1000wUser) {
      list.push({
        id: 3,
        label: "LED状況",
      })
    }

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
  }, [handleClick, current])

  return (
    <Box className="h-full flex-col rounded-md p-0 w-full">
      <SideViewSearchHeader currentView={Number(current.id)} />
      <Box className="flex-col md:flex-row p-0 mt-2 items-center justify-center">
        <Box className="w-[100px] p-0">
          <span className="text-md font-semibold">{current.label}</span>
        </Box>
        <Box className="items-center justify-center flex-1 gap-2">
          {Buttons}
        </Box>
        <Box className="w-[100px]" />
      </Box>
      <Box className="flex-1 items-center justify-center">
        {current.id === 1 &&
          (irrigationData && irrigationData.length !== 0 ? (
            <IrrigationStatus data={irrigationData || []} />
          ) : (
            <Empty />
          ))}
        {current.id === 2 &&
          (co2Data && co2Data.length !== 0 ? (
            <CO2Status data={co2Data || []} />
          ) : (
            <Empty />
          ))}
        {current.id === 3 &&
          (ledData && ledData.length !== 0 ? (
            <LedStatus data={ledData || []} />
          ) : (
            <Empty />
          ))}
      </Box>
    </Box>
  )
}
