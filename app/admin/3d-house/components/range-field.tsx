import React, { useCallback, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Box } from "@/components/custom-ui/box"
import { Field } from "./field"

import { IFieldType, SchemaKey } from "./types"

interface RangeFieldProps {
  preview: boolean
  label: string
  foobar: string
  field: IFieldType<SchemaKey>
}

export const RangeField: React.FC<RangeFieldProps> = ({
  preview,
  label,
  foobar,
  field,
}) => {
  const handleBeforeChanged = useCallback(
    (e: React.BaseSyntheticEvent) => {
      field.onChange({ ...field })
    },
    [field.onChange, field.value]
  )

  const PreviewField = useMemo(() => {
    return (
      <Box className="">
        <div>{foobar}</div>
        <div>{field.value}</div>
      </Box>
    )
  }, [field.value, foobar])

  return (
    <Field label={label}>
      {preview ? (
        PreviewField
      ) : (
        <Box className="">
          <div>{foobar}</div>
          <Input
            type="number"
            value={field.value}
            onChange={handleBeforeChanged}
          />
        </Box>
      )}
    </Field>
  )
}
