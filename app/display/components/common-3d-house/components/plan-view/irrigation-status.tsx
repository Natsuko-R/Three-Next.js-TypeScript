import { useMemo } from "react"
import { Planview_i } from "@/actions/get-planview"

import { Box } from "@/components/custom-ui/box"

import { Block } from "./block"
import { Pipe } from "./pipe"

interface IrrigationStatusProps {
  data: Planview_i[]
}

export const IrrigationStatus: React.FC<IrrigationStatusProps> = ({ data }) => {
  const BlockList = useMemo(() => {
    return data.map((item) => (
      <Block
        key={item.valve_id}
        isOpen={item.state === 1}
        long={window.innerWidth > 500 ? 400 : window.innerWidth - 100}
        id={item.valve_id}
        label="ブロック"
      />
    ))
  }, [data])

  const isUpPipeOpen = useMemo(() => {
    if (data.length === 1) {
      return data[0]?.state === 1
    } else {
      const filtered = data.filter(
        (item, idx) => idx <= (data.length * 140) / 320 && item.state === 1
      )
      return filtered.length > 0
    }
  }, [data])

  const isDownPipeOpen = useMemo(() => {
    const filtered = data.filter(
      (item, idx) => idx > (data.length * 140) / 320 && item.state === 1
    )
    return filtered.length > 0
  }, [data])

  return (
    <Box className="p-0">
      <Box className="flex-col justify-between p-0">{BlockList}</Box>
      <Box className="flex-col p-0">
        <Pipe long={140} direction="up" isOpen={isUpPipeOpen} />
        {data.length > 1 ? (
          <Pipe long={320} direction="down" isOpen={isDownPipeOpen} />
        ) : (
          <Box className="p-0 h-[320px]" />
        )}
      </Box>
      <Box className="hidden md:flex h-[260px] w-[249px] bg-[url('/images/co2.gif')] bg-right-top"></Box>
    </Box>
  )
}
