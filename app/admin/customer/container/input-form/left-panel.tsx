import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { CreateObject } from "./create-object"

export const LeftPanel: React.FC = () => {
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
        <Card className="relative flex flex-col p-8 w-[380px] h-min bg-transparent backdrop-blur-lg">
          <CardHeader className="p-0 pb-4 flex-row flex justify-between items-center">
            <span className="font-bold text-lg">新規オブジェクト作成</span>
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent",
                hidden ? "hidden" : "visible"
              )}
              onClick={toggleHidden}
            >
              <ChevronsLeft className="text-slate-800" />
            </Button>
          </CardHeader>
          {/* <CreateObject /> */}
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
