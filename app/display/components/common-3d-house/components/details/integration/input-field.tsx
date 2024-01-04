import React, { useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Box } from "@/components/custom-ui/box"
import { Field } from "@/components/sensor-form-base/field"
import { ValueText } from "@/components/sensor-form-base/text"

import { IFieldType } from "./types"

interface StopConditionFieldProps {
  preview: boolean
  label: string
  field: IFieldType<"integration_name"> | IFieldType<"crops_name">
}

export const InputField: React.FC<StopConditionFieldProps> = ({
  preview,
  field,
  label,
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
            onChange={(e) => {
              field.onChange(e)
            }}
            className="flex-1"
          />
        </Box>
      )}
    </Field>
  )
}
