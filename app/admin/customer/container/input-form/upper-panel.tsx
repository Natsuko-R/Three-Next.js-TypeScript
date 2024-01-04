import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ChevronsUp, ChevronsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { ConfirmationMessage } from "./confirmation-message"

interface AComponentProps {
  handleRenderCanvas: () => void;
}

export const UpperPanel: React.FC<AComponentProps> = ({ handleRenderCanvas }) => {
  const [hidden, setHidden] = useState(false)

  const toggleHidden = useCallback(() => {
    setHidden((prev) => !prev)
  }, [])
  return (
    <>
      <motion.div
        animate={{
          y: hidden ? "-400px" : "0",
        }}
      >
        <Card className="relative flex flex-col p-8 w-[380px] h-min bg-transparent backdrop-blur-lg">
          <CardHeader className="p-0 pb-4 flex-row flex justify-between items-center">
            <span className="font-bold text-lg">編集を終了</span>
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent",
                hidden ? "hidden" : "visible"
              )}
              onClick={toggleHidden}
            >
              <ChevronsUp className="text-slate-800" />
            </Button>
          </CardHeader>
          <ConfirmationMessage onRenderCanvas={handleRenderCanvas} />
        </Card>
      </motion.div>
      <motion.div
        className={`absolute top-0
                left-1/2 flex h-[60px]
                w-[30px] cursor-pointer
                items-center justify-center rounded-r-lg bg-transparent p-0 backdrop-blur-sm`}
        animate={{
          opacity: hidden ? 1 : 0,
        }}
        onClick={toggleHidden}
      >
        <ChevronsDown color="white" />
      </motion.div>
    </>
  )
}
