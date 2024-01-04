import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { Box } from "@/components/custom-ui/box"

const BLOCK_HEIGHT = 90

interface LedShedProps {
  id: number
  isOpen: boolean
  layersNumber: number
}

export const LedShed: React.FC<LedShedProps> = ({
  isOpen,
  layersNumber,
  id,
}) => {
  const layersNumberArr = new Array(layersNumber).fill(1)

  const BlockList = useMemo(() => {
    return layersNumberArr.map((_, idx) => (
      <Box
        className="p-0 pt-4 w-full flex-col space-y-2 justify-between"
        key={idx}
        style={{ height: BLOCK_HEIGHT }}
      >
        <Box
          className={cn(
            "h-6 w-full p-0",
            isOpen ? "bg-yellow-400" : "bg-slate-300"
          )}
        />
        <Box className="p-0 w-full h-6 border-y-2 border-black" />
      </Box>
    ))
  }, [layersNumberArr, isOpen])

  return (
    <Box className="p-0 flex-col items-center space-y-2">
      <Box className="p-0">
        <span className="text-md font-semibold">{`第 ${id} 系統`}</span>
      </Box>
      <Box className="p-8 w-full flex-col relative h-auto">
        <Box className="w-full h-6 border-y-2 border-black" />
        <Box className="p-0 w-full">
          <Box className="flex-col w-full p-0 pt-[0px]">{BlockList}</Box>
        </Box>
        <Box className="p-0 justify-between w-full h-full absolute top-0 left-0">
          <Box className="h-full border-2 border-black w-8 bg-white" />
          <Box className="h-full border-2 border-black w-6 bg-white" />
          <Box className="hidden sm:flex h-full border-2 border-black w-6 bg-white" />
          <Box className="h-full border-2 border-black w-6 bg-white" />
          <Box className="h-full border-2 border-black w-8 bg-white" />
        </Box>
      </Box>
    </Box>
  )
}
