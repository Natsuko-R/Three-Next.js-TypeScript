import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getHouseStatusByArea_Data } from "../details-datas"

export type HouseStatusByArea_DataType = {
  id: string
  items: string
  area1: string
  area2: string
  area3: string
  area4: string
  area5: string
  area6: string
  area7: string
  area8: string
  area9: string
  area10: string
}

export const columns: ColumnDef<HouseStatusByArea_DataType>[] = [
  {
    accessorKey: "items",
    header: "",
  },
  {
    accessorKey: "area1",
    header: "エリア1",
  },
  {
    accessorKey: "area2",
    header: "エリア2",
  },
  {
    accessorKey: "area3",
    header: "エリア3",
  },
  {
    accessorKey: "area4",
    header: "エリア4",
  },
  {
    accessorKey: "area5",
    header: "エリア5",
  },
  {
    accessorKey: "area6",
    header: "エリア6",
  },
  {
    accessorKey: "area7",
    header: "エリア7",
  },
  {
    accessorKey: "area8",
    header: "エリア8",
  },
  {
    accessorKey: "area9",
    header: "エリア9",
  },
  {
    accessorKey: "area10",
    header: "エリア10",
  },
]

export const HouseStatusArea = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.housestatusbyarea
        ? getHouseStatusByArea_Data(data.housestatusbyarea)
        : [],
    [data?.housestatusbyarea]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="ハウス内状況（エリア別）"
      type={1}
    />
  )
}
