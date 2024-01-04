import React, { useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Box } from "@/components/custom-ui/box"
import { Field } from "@/components/sensor-form-base/field"
import { ValueText } from "@/components/sensor-form-base/text"

import { IFieldType } from "./types"

interface StopConditionFieldProps {
  preview: boolean
  label: string
  field:
    | IFieldType<"base_temp_air" | "integration_target_value_air">
    | IFieldType<"base_temp_soil" | "integration_target_value_soil">
  disabled?: boolean
}

export const InputNumberField: React.FC<StopConditionFieldProps> = ({
  preview,
  field,
  label,
  disabled,
}) => {
  const PreviewField = useMemo(() => {
    return (
      <Box className="h-10 items-center p-0">
        <ValueText>{field.value}</ValueText>
      </Box>
    )
  }, [field.value])

  return (
    <Field label={label}>
      {preview ? (
        PreviewField
      ) : (
        <Box className="flex flex-1 w-[400px] flex-wrap items-center space-x-2 p-0">
          <Input
            value={field.value}
            onChange={field.onChange}
            type="number"
            className="flex-1"
            disabled={disabled}
          />
        </Box>
      )}
    </Field>
  )
}
