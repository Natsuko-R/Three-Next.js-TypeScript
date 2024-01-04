import { useMemo } from "react"
import { ControlDeviceStatus as ControlDeviceStatusType } from "@/actions/get-detaildata"
import { ColumnDef } from "@tanstack/react-table"

import { usePresentValueStore } from "@/components/common-3d-house/hooks/usePresentValueStore"

import { DataTable } from "../data-table"

type DataType = {
  id: string
  items: string
  status: string
  value: string
}

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "items",
    header: "",
  },
  {
    accessorKey: "status",
    header: "ステータス",
  },
  {
    accessorKey: "value",
    header: "ON/OFF",
  },
]

export const ControlDeviceStatus = () => {
  const { data } = usePresentValueStore()

  const dataSource = useMemo(
    () =>
      data?.controldevicestatus ? convertData(data.controldevicestatus) : [],
    [data?.controldevicestatus]
  )

  return (
    <DataTable
      columns={columns}
      data={dataSource}
      mainHeader="制御機器のON/OFF"
      type={1}
      className="w-[500px]"
    />
  )
}

export function convertData(data: ControlDeviceStatusType): DataType[] {
  const convertSts = (value: number): string => {
    switch (value) {
      case 0:
        return "停止"
      case 1:
        return "開始"
      default:
        return "不明"
    }
  }
  const convertVal = (value: number): string => {
    switch (value) {
      case 0:
        return "強制OFF"
      case 1:
        return "強制ON"
      case 2:
        return "なし"
      default:
        return "不明"
    }
  }

  return [
    {
      id: "1",
      items: "冷房",
      status: convertSts(data.cooler_sts),
      value: convertVal(data.cooler_val),
    },
    {
      id: "2",
      items: "暖房",
      status: convertSts(data.heater_sts),
      value: convertVal(data.heater_val),
    },
    {
      id: "4",
      items: "灌水",
      status: convertSts(data.irrigation_sts),
      value: convertVal(data.irrigation_val),
    },
    {
      id: "5",
      items: "循環扇（CFAN)",
      status: convertSts(data.cFan_sts),
      value: convertVal(data.cFan_val),
    },
    {
      id: "6",
      items: "換気扇（PFAN）",
      status: convertSts(data.pFan_sts),
      value: convertVal(data.pFan_val),
    },
  ]
}
