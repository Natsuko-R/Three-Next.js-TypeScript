import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getDayNightTemperature_Data } from "../details-datas"

export type DataType = {
  id: string
  items: string
  value: string
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "items",
  },
  {
    accessorKey: "value",
  },
]

export const DayNightTemp = () => {
  const { data } = usePresentValueStore()
  const dataSource = useMemo(
    () =>
      data?.daynighttemperature
        ? getDayNightTemperature_Data(data.daynighttemperature)
        : [],
    [data?.daynighttemperature]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="明期/暗期平均気温"
      type={2}
      className="w-[500px]"
    />
  )
}
