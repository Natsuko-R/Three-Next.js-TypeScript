import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getOutdoorWeather_Data } from "../details-datas"

export type DataType = {
  id: string
  column1: string
  column2: string
  column3: string
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "column1",
  },
  {
    accessorKey: "column2",
  },
  {
    accessorKey: "column3",
  },
]

export const OutdoorWeather = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.outdoorweather ? getOutdoorWeather_Data(data.outdoorweather) : [],
    [data?.outdoorweather]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="外気象"
      type={2}
      className="w-[500px]"
    />
  )
}
