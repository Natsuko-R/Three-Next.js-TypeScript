import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"
import { getHouseStatusBySensor_Data } from "../details-datas"

export type DataType = {
  id: string
  items: string
  sensor1: string
  sensor2: string
  sensor3: string
  sensor4: string
  sensor5: string
  sensor6: string
  sensor7: string
  sensor8: string
}

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "items",
    header: "センサー",
  },
  {
    accessorKey: "sensor1",
    header: "1",
  },
  {
    accessorKey: "sensor2",
    header: "2",
  },
  {
    accessorKey: "sensor3",
    header: "3",
  },
  {
    accessorKey: "sensor4",
    header: "4",
  },
  {
    accessorKey: "sensor5",
    header: "5",
  },
  {
    accessorKey: "sensor6",
    header: "6",
  },
  {
    accessorKey: "sensor7",
    header: "7",
  },
  {
    accessorKey: "sensor8",
    header: "8",
  },
]

export const HouseStatusSensor = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.housestatusbysensor
        ? getHouseStatusBySensor_Data(data.housestatusbysensor)
        : [],
    [data?.housestatusbysensor]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="ハウス内状況（センサー別）"
      type={1}
      className="w-[1000px]"
    />
  )
}
