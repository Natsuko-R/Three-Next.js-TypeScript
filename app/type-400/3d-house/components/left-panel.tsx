import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AccordionPanel } from "./accordion-panel"

export const LeftPanel = () => {
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
        <Card className="relative flex flex-col px-6 ">
          <AccordionPanel />

          <div className="flex justify-between items-center my-2">
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent text-slate-400 ml-auto",
                hidden ? "hidden" : "visible"
              )}
              onClick={toggleHidden}
            >
              <ChevronsLeft />
            </Button>

          </div>

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
        <ChevronsRight />
      </motion.div>
    </>
  )
}
