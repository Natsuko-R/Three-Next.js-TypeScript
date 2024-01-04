import { Box } from "@/components/custom-ui/box"
import { CustomCheckBox } from "@/components/custom-ui/custom-checkbox"
import { useCallback, useMemo } from "react"
import { useGraphStore } from "../hooks/useGraphStore"
import { DateFilter } from "./date-filter"
import { SortFilter } from "./sort-filter"

export const FilterContainer = () => {

  const { fieldsList, placeList, setValue, selectedFields, selectedPlaces } = useGraphStore()

  const fieldOptions = useMemo(
    () =>
      fieldsList.map(item => (
        {
          label: item.fieldName,
          value: item.fieldType
        }
      ))
    , // 大括号里一定要写return，不然报错！
    [fieldsList]
  )

  const placeOptions = useMemo(
    () => {
      return placeList.map(item => (
        {
          label: item.placeName,
          value: `${item.locId}-${item.placeType}`
        }
      ))
    },
    [placeList]
  )

  const handleFieldChange = useCallback(
    (_: string, select?: string[]) => select && setValue({ selectedFields: select })
    , [setValue])

  const handlePlaceChange = useCallback(() => {
    (_: string, select?: string[]) => select && setValue({ selectedPlaces: select })
  }, [])

  return (
    <Box>
      <Box className="flex-col space-y-2 bg-slate-400 p-4 rounded-md">
        <CustomCheckBox
          label="計測項目"
          options={fieldOptions}
          value={selectedFields}
          layout="horizontal"
          className="flex-wrap py-3"
          labelStyle="text-lg font-semibold text-left"
          containerStyle="items-center"
          onChange={handleFieldChange}
        />
        <CustomCheckBox
          label="配置場所"
          options={placeOptions}
          value={selectedPlaces}
          layout="horizontal"
          className="flex-wrap py-3"
          labelStyle="text-lg font-semibold text-left"
          containerStyle="items-center"
          onChange={handlePlaceChange}
        />
        <DateFilter />
        <SortFilter />
      </Box>
    </Box>
  )
}
