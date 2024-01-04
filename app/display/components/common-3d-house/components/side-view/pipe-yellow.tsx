import { CSSProperties, useMemo } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Box } from "@/components/custom-ui/box"

const ITEM_LONG = 30
const ITEM_DIAMETER = 8

const DIRECTION_MAP = {
  right: { x: "200%" },
  left: { x: "-200%" },
  down: { y: "200%" },
  up: { y: "-200%" },
}

type DirectonKeys = keyof typeof DIRECTION_MAP

interface PipeStyleProps {
  direction: DirectonKeys
  long: number
  diameter: number
}

const getPipeStyles = ({ direction, long, diameter = 20 }: PipeStyleProps) => {
  return {
    right: { width: long, height: diameter, flexDirection: "row" },
    left: { width: long, height: diameter, flexDirection: "row" },
    up: { height: long, width: diameter, flexDirection: "column" },
    down: { height: long, width: diameter, flexDirection: "column" },
  }[direction]
}

const getItemStyle = ({ direction, long, diameter = 20 }: PipeStyleProps) => {
  return {
    right: { width: long, height: diameter },
    left: { width: long, height: diameter },
    up: { height: long, width: diameter },
    down: { height: long, width: diameter },
  }[direction]
}

interface PipeProps {
  long: number
  direction: DirectonKeys
  isOpen: boolean
}

export const Pipe: React.FC<PipeProps> = ({ long, direction, isOpen }) => {
  const itemStyles = useMemo(() => {
    return getItemStyle({ direction, long: ITEM_LONG, diameter: ITEM_DIAMETER })
  }, [direction])

  const StreamItems = useMemo(() => {
    const nums = Math.floor(long / (ITEM_LONG * 2))
    const newArray = new Array(nums).fill("1")
    return newArray.map((_, idx) => (
      <motion.div
        key={idx}
        className={cn(
          `
            l-0
            t-0
            w-[8px]
            bg-yellow-600
            p-0
          `,
          direction === "left" ? "rounded-l-full" : "",
          direction === "right" ? "rounded-r-full" : "",
          direction === "up" ? "rounded-t-full" : "",
          direction === "down" ? "rounded-b-full" : ""
        )}
        style={itemStyles}
        animate={DIRECTION_MAP[direction]}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 2,
        }}
      ></motion.div>
    ))
  }, [long, direction, itemStyles])

  const styles = useMemo(() => {
    return getPipeStyles({ direction, long, diameter: 16 })
  }, [direction, long])

  return (
    <Box
      className={cn(
        `
            relative
            h-[20px]
            w-[300px]
            items-center
            gap-8
            overflow-hidden from-yellow-400 via-white via-30%
            to-yellow-700
            p-0
            
        `,
        direction === "left" ? "justify-end bg-gradient-to-b" : "",
        direction === "right" ? "justify-start bg-gradient-to-b" : "",
        direction === "up" ? "justify-end bg-gradient-to-l" : "",
        direction === "down" ? "justify-start bg-gradient-to-l" : ""
      )}
      style={styles as CSSProperties}
    >
      {isOpen && StreamItems}
    </Box>
  )
}
