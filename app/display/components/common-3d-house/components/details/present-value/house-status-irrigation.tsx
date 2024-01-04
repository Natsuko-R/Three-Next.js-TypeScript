import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getHouseStatusIrrigation_Data } from "../details-datas"

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

export const HouseStatusIrrigation = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.housestatusirrigation
        ? getHouseStatusIrrigation_Data(data.housestatusirrigation)
        : [],
    [data?.housestatusirrigation]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="ハウス内状況（灌水流量）"
      type={2}
      className="w-[500px]"
    />
  )
}
