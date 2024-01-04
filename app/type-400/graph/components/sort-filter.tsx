import { useCallback } from "react"

import { Box } from "@/components/custom-ui/box"
import { CustomRadioGroup } from "@/components/custom-ui/radio-group"

import { useGraphStore } from "../hooks/useGraphStore"

export const SortFilter = () => {
  const { setValue, sortValue } = useGraphStore()

  const handleDateTypeSwith = useCallback(
    (value: string) => {
      setValue({ sortValue: value })
    },
    [setValue]
  )

  return (
    <Box className="p-0 items-end">
      <CustomRadioGroup
        value={sortValue}
        className="flex-col"
        radiosContentStyle="py-3"
        label="並べ替え"
        layout="vertical"
        options={[
          {
            label: "配置場所・計測項目を優先",
            value: "loc_id-fieldtype",
          },
          {
            label: "計測項目・配置場所を優先",
            value: "fieldtype-loc_id",
          }
        ]}
        onChange={handleDateTypeSwith}
      />
    </Box>
  )
}
