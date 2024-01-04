"use client"

import { useCallback, useMemo } from "react"

import useController from "@/hooks/use-controller"
import { CustomSelect } from "@/components/custom-ui/select"

export const SelectionList = () => {
  const { controllerList, controllerValue, houseList, houseValue, setValue } =
    useController()

  const controlerOptions = useMemo(() => {
    return controllerList.map((item) => ({
      label: item.name,
      value: item.controller_id.toString(),
    }))
  }, [controllerList])

  const houseOptions = useMemo(() => {
    return houseList.map((item) => ({
      label: item.house_name,
      value: item.house_id.toString(),
    }))
  }, [houseList])

  const handleControllerChange = useCallback(
    (value: string) => {
      setValue({ controllerValue: value, houseValue: "", areaValue: "" })
    },
    [setValue]
  )

  const handleHouseChange = useCallback(
    (value: string) => {
      setValue({ houseValue: value })
    },
    [setValue]
  )

  return (
    <div className="mt-2 grid gap-2">
      <CustomSelect
        placeholder="制御盤を選択"
        label="制御盤"
        options={controlerOptions}
        value={controllerValue}
        selectLabel="制御盤を選択してください"
        onChange={handleControllerChange}
      />
      <CustomSelect
        placeholder="ハウスを選択"
        label="ハウス"
        options={houseOptions}
        value={houseValue}
        selectLabel="ハウスを選択してください"
        onChange={handleHouseChange}
      />
    </div>
  )
}
