import React, { useCallback, useMemo } from "react"
import dayjs from "dayjs"

import { Box } from "@/components/custom-ui/box"
import { DatePicker } from "@/components/custom-ui/date-picker"
import { Field } from "@/components/sensor-form-base/field"
import { ValueText } from "@/components/sensor-form-base/text"

import { IFieldType } from "./types"

interface StopConditionFieldProps {
  preview: boolean
  label: string
  field: IFieldType<"initial_date"> | IFieldType<"finish_date">
}

export const DateField: React.FC<StopConditionFieldProps> = ({
  preview,
  field,
  label,
}) => {
  const PreviewField = useMemo(() => {
    return (
      <Box className="h-10 items-center p-0">
        <ValueText>
          {dayjs(field.value).format("YYYY-MM-DD HH:mm:ss")}
        </ValueText>
      </Box>
    )
  }, [field.value])

  const handleDateChange = useCallback((date: Date | undefined) => {
    date && field.onChange(date)
  }, [])

  return (
    <Field label={label}>
      {preview ? (
        PreviewField
      ) : (
        <Box className="flex flex-1 w-[400px] flex-wrap items-center space-x-2 p-0">
          <DatePicker
            className="w-[400px]"
            value={field.value}
            onDateChange={handleDateChange}
          />
        </Box>
      )}
    </Field>
  )
}
