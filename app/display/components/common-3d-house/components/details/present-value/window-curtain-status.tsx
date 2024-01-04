import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getWindowCurtainStatus_Data } from "../details-datas"

export type DataType = {
  id: string
  items: string
  status: string
  progress: string
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "items",
    header: "",
  },
  {
    accessorKey: "status",
    header: "ステータス",
  },
  {
    accessorKey: "progress",
    header: "開閉率",
  },
]

export const WindowCurtainStatus = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.windowcurtainstatus
        ? getWindowCurtainStatus_Data(data.windowcurtainstatus)
        : [],
    [data?.windowcurtainstatus]
  )
  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="窓・カーテンの開閉率"
      type={1}
      className="w-[500px]"
    />
  )
}
