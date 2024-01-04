import { Box } from "@/components/custom-ui/box"

import { Pipe } from "./pipe-yellow"

interface BlockProps {
  label: string
  long: number
  isOpen: boolean
  id: number
}

export const Block: React.FC<BlockProps> = ({ long, id, isOpen, label }) => {
  return (
    <Box className="relative items-center p-0">
      <p className="mr-2 w-[70px] text-xs whitespace-nowrap overflow-hidden text-ellipsis">
        {label} {id}
      </p>
      <Pipe long={long} isOpen={isOpen} direction="left" />
    </Box>
  )
}
