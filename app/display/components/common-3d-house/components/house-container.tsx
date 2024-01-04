"use client"

import React, { useEffect } from "react"
import { useAuthContext } from "@/context/auth-context"

import { SYSTEM_TYPE_ENUM } from "@/config/consts"
import useController from "@/hooks/use-controller"
import useFarm from "@/hooks/use-farm"
import { useThreeHouseStore } from "@/components/common-3d-house/hooks/useThreeHouseStore"
import { SiderSheet } from "@/components/custom-ui/sider-sheet"
import { ValveRelayClient } from "@/app/dashboard/valve-relay-setting/components/client"

import { House400Canvas } from "./house-400-canvas"
import { HouseCanvas } from "../../../pages/house-canvas"
import { LeftPane } from "./left-pane"

export const HouseContainer: React.FC = () => {
  const { currentFarm } = useFarm()
  const { controllerValue, houseValue } = useController()
  const { getData, has3D } = useThreeHouseStore()
  const { user } = useAuthContext()

  const isType1000User = user?.controller_type === SYSTEM_TYPE_ENUM.type1000
  const isType400User = user?.controller_type === SYSTEM_TYPE_ENUM.type400

  useEffect(() => {
    if (!currentFarm || !controllerValue || !houseValue || !user) {
      return
    }
    getData({
      farm_id: Number(currentFarm.farm_id),
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
      code1: user.code1,
      code2: user.code2,
    })
  }, [getData, controllerValue, houseValue, currentFarm?.farm_id])

  return (
    <div
      className="h-full bg-gradient-to-r select-none
            to-indigo-500 from-10% via-sky-500 via-30%
            from-emerald-500 to-90% rounded p-2 relative
            overflow-hidden flex justify-between"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 w-auto">
        {/* {has3D && isType1000User && <HouseCanvas />} */}
        <HouseCanvas />
        {/* {has3D && isType400User && <House400Canvas />} */}
      </div>
      {isType1000User && (
        <div className="absolute right-6 top-6">
          <SiderSheet triggerText="ハウス操作" title="バルブ・リレー設定">
            <ValveRelayClient />
          </SiderSheet>
        </div>
      )}
      <LeftPane />
    </div>
  )
}
