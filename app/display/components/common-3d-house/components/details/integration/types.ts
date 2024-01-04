import { ControllerRenderProps } from "react-hook-form"

type Schema = {
  integration_name: string
  crops_name: string
  initial_date: Date
  finish_date: Date
  base_temp_air: string
  integration_target_value_air: string
  base_temp_soil: string
  integration_target_value_soil: string
}

type SchemaKey = keyof Schema

export type IFieldType<T extends SchemaKey> = ControllerRenderProps<Schema, T>
