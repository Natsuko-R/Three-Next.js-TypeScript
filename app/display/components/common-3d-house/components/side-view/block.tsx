import { Box } from "@/components/custom-ui/box"

import { Pipe } from "./pipe"

interface BlockProps {
  long: number
  isOpen: boolean
  blockName: string
}

export const Block: React.FC<BlockProps> = ({ long, blockName, isOpen }) => {
  return (
    <Box className="relative items-center p-0">
      <Pipe long={long} isOpen={isOpen} direction="right" />
    </Box>
  )
}
