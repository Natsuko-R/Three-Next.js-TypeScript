"use client"

import { useEffect } from "react"

// import useController from "@/hooks/use-controller"
import { Box } from "@/components/custom-ui/box"

// import { useGraphStore } from "../hooks/useGraphStore"
// import { ChartTabContainer } from "./chart-tab-container"
import { EchartsLine } from "./echats-line"
import { FilterContainer } from "./filter-container"

export const GraphClient = () => {
  // const { controllerValue } = useController()
  // const { getDeviceTabs, getFilterOptions } = useGraphStore()

  // useEffect(() => {
  //   getDeviceTabs({ controller_id: Number(controllerValue) })
  //   getFilterOptions({ controller_id: Number(controllerValue) })
  // }, [getDeviceTabs, getFilterOptions, controllerValue])

  return (
    <Box className="p-0 flex-col w-full max-w-screen-2xl">
      {/* 
      <ChartTabContainer />
      */}
      <FilterContainer />
      <EchartsLine />
    </Box>
  )
}
