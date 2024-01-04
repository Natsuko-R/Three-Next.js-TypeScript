import { useMemo } from "react"
import { Sideview_i } from "@/actions/get-sideview"

import { Box } from "@/components/custom-ui/box"

import { useSideviewStore } from "../../hooks/useSideviewStore"
import { Block } from "./block"
import { Pipe } from "./pipe"

const BLOCK_HEIGHT = 100

interface IrrigationStatusProps {
  data: Sideview_i[]
}

export const IrrigationStatus: React.FC<IrrigationStatusProps> = ({ data }) => {
  const { currentBlockValue } = useSideviewStore()

  const currentIrrigation = useMemo(() => {
    return data?.find((item) => item.valve_id === Number(currentBlockValue))
  }, [data, currentBlockValue])

  const isFlowing = useMemo(() => {
    return currentIrrigation?.state === 1
  }, [currentIrrigation])

  const layersNumber = useMemo(() => {
    if (!currentIrrigation?.side_view_num) return []
    return new Array(currentIrrigation.side_view_num).fill(1)
  }, [currentIrrigation])

  const BlockList = useMemo(() => {
    return layersNumber.map((_, idx) => (
      <Box className="p-0 flex-col space-y-2" style={{ height: BLOCK_HEIGHT }}>
        <Block
          key={idx}
          isOpen={isFlowing}
          long={window.innerWidth > 600 ? 564 : window.innerWidth * 0.8 - 80}
          blockName=""
        />
        <Box className="p-0 h-6 border-y-2 border-black" />
      </Box>
    ))
  }, [layersNumber, isFlowing])

  if (!data) return null

  return (
    <Box className="p-8 pb-0 flex-col relative">
      <Box className="w-full h-6 border-y-2 border-black" />
      <Box className="p-0">
        <Box className="flex-col p-0 pt-[50px]">
          <Pipe
            long={layersNumber.length * BLOCK_HEIGHT}
            direction="up"
            isOpen={isFlowing}
          />
        </Box>
        <Box className="flex-col p-0 pt-[50px]">{BlockList}</Box>
      </Box>
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
