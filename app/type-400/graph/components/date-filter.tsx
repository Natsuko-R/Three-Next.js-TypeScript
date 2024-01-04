import { useCallback } from "react"
import { Box } from "@/components/custom-ui/box"
import { CustomRadioGroup } from "@/components/custom-ui/radio-group"

import { useGraphStore } from "../hooks/useGraphStore"
import { DatePickerWithRange } from "./date-range-picker-new"
import { DateRange } from "react-day-picker"

export const DateFilter = () => {
  const { dateRange, dateType, setValue } = useGraphStore()

  const handleDateTypeSwith = useCallback(
    (value: string) => {
      setValue({ dateType: value as "1" | "2" })
    }, [setValue])

  const handleDateRangeChanged = useCallback(
    (range: DateRange | undefined) => {
      setValue({ dateRange: range })
    }, [setValue])

  return (
    <Box className="p-0 sm:items-end flex-col sm:flex-row">
      <CustomRadioGroup
        value={dateType}
        className="flex-col"
        label="graph data"
        options={[
          {
            label: "label1",
            value: "1",
          },
          {
            label: "label2",
            value: "2",
          },
        ]}
        layout="vertical"
        onChange={handleDateTypeSwith}
      />
      {dateType === "2" && (
        <DatePickerWithRange
          placeholder=""
          className="ml-0 sm:ml-4"
          onDateChange={handleDateRangeChanged}
        />
      )}
    </Box>
  )
}
