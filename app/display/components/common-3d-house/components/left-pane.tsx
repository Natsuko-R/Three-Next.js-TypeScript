import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Box } from "@/components/custom-ui/box"
import { BaseSearchHeader } from "@/components/sensor-form-base/base-search-header"
import { Timer } from "@/components/timer"

import { InfraredMonitoring } from "./infrared-monitoring"
// import { SelectionList } from "./selection-list"
import { StatsList } from "./stats-list"

export const LeftPane: React.FC = () => {
  const [hidden, setHidden] = useState(false)

  const toggleHidden = useCallback(() => {
    setHidden((prev) => !prev)
  }, [])
  return (
    <>
      <motion.div
        animate={{
          x: hidden ? "-400px" : "0",
        }}
      >
        <Card className="relative flex h-auto w-[380px] flex-col bg-transparent p-2 backdrop-blur-md">
          <Box className="justify-between">
            <Timer />
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent",
                hidden ? "hidden" : "visible"
              )}
              onClick={toggleHidden}
            >
              <ChevronsLeft />
            </Button>
          </Box>
          <StatsList />
          <BaseSearchHeader hideArea className="bg-transparent" />
          {/* <SelectionList /> */}
          <InfraredMonitoring />
        </Card>
      </motion.div>
      <motion.div
        className={`absolute left-0
                top-1/2 flex h-[60px]
                w-[30px] cursor-pointer
                items-center justify-center rounded-r-lg bg-transparent p-0 backdrop-blur-sm`}
        animate={{
          opacity: hidden ? 1 : 0,
        }}
        onClick={toggleHidden}
      >
        <ChevronsRight color="white" />
      </motion.div>
    </>
  )
}
