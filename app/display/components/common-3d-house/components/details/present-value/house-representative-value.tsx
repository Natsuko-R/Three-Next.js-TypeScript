import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getHouseRep_Data } from "../details-datas"

export type DataType = {
  id: string
  items: string
  currentval: string
  setval: string
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "items",
    header: "",
  },
  {
    accessorKey: "currentval",
    header: "現在値",
  },
  {
    accessorKey: "setval",
    header: "設定値",
  },
]

export const HouseRepresentativeValue = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.houserepresentativevalue
        ? getHouseRep_Data(data.houserepresentativevalue)
        : [],
    [data?.houserepresentativevalue]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="現在値（ハウス代表値）"
      type={1}
      className="w-[500px]"
    />
  )
}
