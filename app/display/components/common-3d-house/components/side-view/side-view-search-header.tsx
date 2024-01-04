import { useCallback, useEffect, useMemo } from "react"

import { Box } from "@/components/custom-ui/box"
import { CustomSelect, OptionProps } from "@/components/custom-ui/select"
import { BaseSearchHeader } from "@/components/sensor-form-base/base-search-header"

import { useSideviewStore } from "../../hooks/useSideviewStore"

interface SideViewSearchHeaderProps {
  currentView: number
}

export const SideViewSearchHeader: React.FC<SideViewSearchHeaderProps> = ({
  currentView,
}) => {
  const { irrigationData, currentBlockValue, setCurrentBLockValue } =
    useSideviewStore()

  const blockOptions: OptionProps[] = useMemo(() => {
    if (!irrigationData) return []
    return irrigationData?.map((item) => ({
      label: `ブロック ${item.valve_id}`,
      value: item.valve_id.toString(),
    }))
  }, [irrigationData])

  useEffect(() => {
    if (!blockOptions || !blockOptions[0]) return
    setCurrentBLockValue(blockOptions[0].value)
  }, [blockOptions, setCurrentBLockValue])

  const isIrrigation = useMemo(() => currentView === 1, [currentView])

  const handleBlockChange = useCallback(
    (value: string) => {
      setCurrentBLockValue(value)
    },
    [setCurrentBLockValue]
  )

  return (
    <BaseSearchHeader
      className="w-full max-w-screen-2xl"
      hideArea={isIrrigation}
    >
      {isIrrigation && (
        <Box className="justify-self-start p-0">
          <CustomSelect
            className="w-[240px]"
            placeholder=""
            label="ブロック"
            options={blockOptions}
            defaultValue={blockOptions[0]?.value}
            value={currentBlockValue}
            onChange={handleBlockChange}
          />
        </Box>
      )}
    </BaseSearchHeader>
  )
}
