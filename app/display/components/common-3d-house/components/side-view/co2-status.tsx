import { useMemo } from "react"
import { Sideview_c } from "@/actions/get-sideview"

import useController from "@/hooks/use-controller"
import { Box } from "@/components/custom-ui/box"

import { Block } from "./co2-block"
import { Pipe } from "./pipe-yellow"

const BLOCK_HEIGHT = 100

interface CO2StatusProps {
  data: Sideview_c[]
}

export const CO2Status: React.FC<CO2StatusProps> = ({ data }) => {
  const { areaValue } = useController()

  const currentCo2 = useMemo(() => {
    return data?.find((item) => item.area_id === Number(areaValue))
  }, [data, areaValue])

  const isFlowing = useMemo(() => {
    return currentCo2?.state === 1
  }, [currentCo2])

  const layersNumber = useMemo(() => {
    if (!currentCo2?.co2_side_view_num) return []
    return new Array(currentCo2.co2_side_view_num).fill(1)
  }, [currentCo2])

  const BlockList = useMemo(() => {
    return layersNumber.map((_, idx) => (
      <Box
        key={idx}
        className="p-0 flex-col justify-between"
        style={{ height: BLOCK_HEIGHT }}
      >
        <Box className="p-0 h-6 border-y-2 border-black mt-2" />
        <Block
          key={idx}
          isOpen={isFlowing}
          long={window.innerWidth > 600 ? 550 : window.innerWidth * 0.8 - 80}
          blockName=""
        />
      </Box>
    ))
  }, [layersNumber, isFlowing])

  return (
    <Box className="p-8 pt-0 flex-col relative">
      {/* <Shed data={STEP_LIST} /> */}
      <Box className="p-0">
        <Box className="flex-col p-0 mt-[0px]">
          <Pipe
            long={layersNumber.length * BLOCK_HEIGHT}
            direction="down"
            isOpen={isFlowing}
          />
        </Box>
        <Box className="flex-col p-0 pt-[0px]">{BlockList}</Box>
        <Box className="flex-col p-0 mt-[0px]">
          <Pipe
            long={layersNumber.length * BLOCK_HEIGHT}
            direction="down"
            isOpen={isFlowing}
          />
        </Box>
      </Box>
      <Box className="w-full h-6 border-y-2 border-black mt-2" />
      <Box className="p-0 justify-between w-full h-full absolute top-0 left-0">
        <Box className="h-full border-2 border-black w-8 bg-white" />
        <Box className="h-full border-2 border-black w-6 bg-white" />
        <Box className="hidden sm:flex h-full border-2 border-black w-6 bg-white" />
        <Box className="h-full border-2 border-black w-6 bg-white" />
        <Box className="h-full border-2 border-black w-8 bg-white" />
      </Box>
    </Box>
  )
}
