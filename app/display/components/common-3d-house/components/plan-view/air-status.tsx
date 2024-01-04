import { useMemo } from "react"
import { Planview_a } from "@/actions/get-planview"

import { Box } from "@/components/custom-ui/box"

import { Block } from "./block-co2"
import { Pipe } from "./pipe-yellow"

interface AirStatusProps {
  data: Planview_a[]
}

export const AirStatus: React.FC<AirStatusProps> = ({ data }) => {
  const BlockList = useMemo(() => {
    return data.map((item) => (
      <Block
        key={item.area_id}
        isOpen={item.state === 1}
        long={window.innerWidth > 620 ? 400 : window.innerWidth - 220}
        label="エリア"
        id={item.area_id}
      />
    ))
  }, [data])

  const isUpPipeOpen = useMemo(() => {
    if (data.length === 1) {
      return data[0]?.state === 1
    } else {
      const filtered = data.filter(
        (item, idx) => idx <= data.length / 2 && item.state === 1
      )
      return filtered.length > 0
    }
  }, [data])

  const isDownPipeOpen = useMemo(() => {
    const filtered = data.filter(
      (item, idx) => idx > data.length / 2 && item.state === 1
    )
    return filtered.length > 0
  }, [data])

  const isMainPipeOpen = useMemo(() => {
    const filtered = data.filter((item) => item.state === 1)
    return filtered.length > 0
  }, [data])

  return (
    <Box className="p-0">
      <Box className="flex-col justify-between p-0">{BlockList}</Box>
      <Box className="flex-col p-0">
        <Pipe long={230} direction="up" isOpen={isUpPipeOpen} />
        {data.length > 1 ? (
          <Pipe long={230} direction="down" isOpen={isDownPipeOpen} />
        ) : (
          <Box className="p-0 h-[215px]" />
        )}
      </Box>
      <Box className="flex-col justify-center p-0">
        <Pipe long={60} direction="left" isOpen={isMainPipeOpen} />
      </Box>
      <Box className="flex-col justify-center p-0">
        <Box
          className="h-[160px] w-[60px] items-center justify-center bg-slate-500 p-0"
          style={{ writingMode: "vertical-lr" }}
        >
          制御盤
        </Box>
      </Box>
    </Box>
  )
}
