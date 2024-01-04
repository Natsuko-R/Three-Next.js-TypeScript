import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AccordionPanel } from "./accordion-panel"
import { useJsonDataStore } from "../hooks/useJsonDataStore";
import { ReqParam, set3Ddata } from "@/actions/set-3d-data";
import { SaveButton } from "./save-button";
import { useRouter, useParams, usePathname } from "next/navigation"

export const LeftPanel = () => {
  const router = useRouter()
  const [hidden, setHidden] = useState(false)
  const { JsonData } = useJsonDataStore()
  const { customerId, controllerId, farmId, houseId } = useParams()
  const [id1, id2] = (customerId as string).split("-");
  const path = usePathname();

  const toggleHidden = useCallback(() => {
    setHidden((prev) => !prev)
  }, [])

  const handleClickSave = () => {
    console.log("Final JsonData", JsonData);

    const reqData: ReqParam = {
      farm_id: Number(farmId),
      controller_id: Number(controllerId),
      house_id: Number(houseId),
      code1: id1,
      code2: id2,
      data: JSON.stringify(JsonData, null, 2),
    };
    set3Ddata(reqData);
  }

  return (
    <>
      <motion.div
        animate={{
          x: hidden ? "-400px" : "0",
        }}
      >
        <Card className="relative flex flex-col px-6 w-[380px] bg-transparent backdrop-blur-lg">
          <AccordionPanel />

          <div className="flex justify-between items-center my-2">
            <SaveButton onSave={handleClickSave} />

            <Button
              className={cn(
                "bg-transparent hover:bg-transparent text-slate-800 ml-auto",
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
        <ChevronsRight/>
      </motion.div>
    </>
  )
}
