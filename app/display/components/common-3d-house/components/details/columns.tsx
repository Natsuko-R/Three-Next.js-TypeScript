"use client"

import { IntegrationData } from "@/actions/get-integration"
import { ColumnDef, Row } from "@tanstack/react-table"
import dayjs from "dayjs"

import { AdditionButtons } from "./addition-button"

//現在値（ハウス代表値）
export type HouseRep_DataType = {
  id: string
  items: string
  currentval: string
  setval: string
}

export const HouseRep_columns: ColumnDef<HouseRep_DataType>[] = [
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

//制御機器のON/OFF
export type ControlDeviceStatus_DataType = {
  id: string
  items: string
  status: string
  value: string
}

export const ControlDeviceStatus_columns: ColumnDef<ControlDeviceStatus_DataType>[] =
  [
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

//ハウス内状況（センサー別）
export type HouseStatusBySensor_DataType = {
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

export const HouseStatusBySensor_columns: ColumnDef<HouseStatusBySensor_DataType>[] =
  [
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

//窓・カーテンの開閉率
export type WindowCurtainStatus_DataType = {
  id: string
  items: string
  status: string
  progress: string
}

export const WindowCurtainStatus_columns: ColumnDef<WindowCurtainStatus_DataType>[] =
  [
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

//ハウス内状況（灌水流量）
export type HouseStatusIrrigation_DataType = {
  id: string
  items: string
  value: string
}

export const HouseStatusIrrigation_columns: ColumnDef<HouseStatusIrrigation_DataType>[] =
  [
    {
      accessorKey: "items",
    },
    {
      accessorKey: "value",
    },
  ]

//ハウス内状況（ブロック別）
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

export const HouseStatusByArea_columns: ColumnDef<HouseStatusByArea_DataType>[] =
  [
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

//外気象
export type OutdoorWeather_DataType = {
  id: string
  column1: string
  column2: string
  column3: string
}

export const OutdoorWeather_columns: ColumnDef<OutdoorWeather_DataType>[] = [
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

//明期/暗期平均気温
export type DayNightTemp_DataType = {
  id: string
  items: string
  value: string
}

export const DayNightTemp_columns: ColumnDef<DayNightTemp_DataType>[] = [
  {
    accessorKey: "items",
  },
  {
    accessorKey: "value",
  },
]

interface HeaderProps {
  texts: string[]
}

export const Header: React.FC<HeaderProps> = ({ texts }) => (
  <div className="flex flex-col text-center">
    {texts.map((item, idx) => (
      <span key={idx}>{item}</span>
    ))}
  </div>
)

interface CellProps {
  texts: string[]
}

export const Cell: React.FC<CellProps> = ({ texts }) => (
  <div className="flex flex-col text-center">
    {typeof texts === "string" || typeof texts === "number" ? (
      <span>{texts}</span>
    ) : (
      texts.map((item, idx) => <span key={idx}>{item}</span>)
    )}
  </div>
)

export const Addition_columns = ({
  onDelete,
  onSetting,
}: {
  onDelete: (initial_date: string) => void
  onSetting: (id: number) => void
}): ColumnDef<IntegrationData>[] => [
  {
    accessorKey: "integration_name",
    header: "設定名",
  },
  {
    accessorKey: "crops_name",
    header: "作物名",
  },
  {
    accessorKey: "initial_date",
    // header: "積算開始日",
    header: () => <Header texts={["積算開始日", "積算終了日"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[
          dayjs(row.getValue("initial_date")).format("YYYY-MM-DD"),
          dayjs(row.getValue("finish_date")).format("YYYY-MM-DD"),
        ]}
      />
    ),
  },
  {
    accessorKey: "finish_date",
    // header: () => <Header texts={["積算達成", "予定日"]} />,
    header: () => null,
    // cell: ({ row }) => (
    //   <Cell text={dayjs(row.getValue("finish_date")).format("YYYY-MM-DD")} />
    // ),
    cell: () => null,
  },
  {
    accessorKey: "integration_days",
    header: () => <Header texts={["積算", "日数"]} />,
    cell: ({ row }) => <Cell texts={[row.getValue("integration_days")]} />,
  },
  {
    accessorKey: "integration_target_value_air",
    header: () => <Header texts={["気温目標", "積算値"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[
          row.getValue("integration_target_value_air"),
          row.getUniqueValues(
            "integration_target_value_soil"
          ) as unknown as string,
        ]}
      />
    ),
  },
  {
    accessorKey: "integration_target_value_soil",
    header: () => null,
    cell: () => null,
    // header: () => <Header texts={["土壌気温", "目標積算値"]} />,
    // cell: ({ row }) => (
    //   <Cell text={row.getValue("integration_target_value_soil")} />
    // ),
  },
  {
    accessorKey: "integrated_value_air",
    header: () => <Header texts={["気温有効", "積算値"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[
          row.getValue("integrated_value_air"),
          row.getValue("integrated_value_soil"),
        ]}
      />
    ),
  },
  {
    accessorKey: "integrated_value_soil",
    // header: () => <Header texts={["土壌気温", "有効積算値"]} />,
    header: () => null,
    // cell: ({ row }) => <Cell texts={row.getValue("integrated_value_soil")} />,
    cell: () => null,
  },
  {
    accessorKey: "ave_value_air",
    header: () => <Header texts={["気温", "平均"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[row.getValue("ave_value_air"), row.getValue("ave_value_soil")]}
      />
    ),
  },
  {
    accessorKey: "ave_value_soil",
    // header: () => <Header texts={["土壌気温", "平均"]} />,
    // cell: ({ row }) => <Cell texts={row.getValue("ave_value_air")} />,
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "remaining_air",
    header: () => <Header texts={["気温", "残り"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[row.getValue("remaining_air"), row.getValue("remaining_soil")]}
      />
    ),
  },
  {
    accessorKey: "remaining_soil",
    // header: () => <Header texts={["土壌", "気温", "残り"]} />,
    // cell: ({ row }) => <Cell texts={row.getValue("remaining_soil")} />,
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "remaining_days_air",
    header: () => <Header texts={["気温予定", "残り日数"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[
          row.getValue("remaining_days_air") === 0
            ? "-"
            : row.getValue("remaining_days_air"),
          row.getValue("remaining_days_soil") === 0
            ? "-"
            : row.getValue("remaining_days_soil"),
        ]}
      />
    ),
  },
  {
    accessorKey: "remaining_days_soil",
    // header: () => <Header texts={["土壌気温", "予定残り", "日数"]} />,
    // cell: ({ row }) => <Cell texts={row.getValue("remaining_days_soil")} />,
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "achieved_date_air",
    header: () => <Header texts={["積算達成", "予定日"]} />,
    cell: ({ row }) => (
      <Cell
        texts={[
          dayjs(row.getValue("achieved_date_air")).format("YYYY-MM-DD"),
          dayjs(row.getValue("achieved_date_soil")).format("YYYY-MM-DD"),
        ]}
      />
    ),
  },
  { accessorKey: "achieved_date_soil", header: () => null, cell: () => null },
  {
    accessorKey: "integrationId",
    header: () => <Header texts={["設定"]} />,
    cell: (cellContext) => {
      const row: Row<IntegrationData> = cellContext.row
      return (
        <div>
          <AdditionButtons
            onDelete={() => onDelete(row.getValue("initial_date"))}
            onSetting={() => onSetting(row.getValue("integrationId"))}
          />
        </div>
      )
    },
  },
]
