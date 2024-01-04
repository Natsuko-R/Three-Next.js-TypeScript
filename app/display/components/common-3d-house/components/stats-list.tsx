import { useEffect, useMemo } from "react"

import useController from "@/hooks/use-controller"
import { StatsCard, StatsCardProps } from "@/components/custom-ui/stats-card"

import { usePaneStore } from "../hooks/usePaneStore"

export const StatsList = () => {
  const { controllerValue, houseValue } = useController()
  const { getData, data } = usePaneStore()

  const STATS_LIST: StatsCardProps[] = useMemo(
    () => [
      {
        title: "温度",
        value: `${data?.temp_c || 0}°C`,
        icon: "Thermometer",
      },
      {
        title: "湿度",
        value: `${data?.humi_rh || 0}%`,
        icon: "Droplets",
      },
      {
        title: "CO₂濃度",
        value: `${data?.con2_ppm || 0}ppm`,
        icon: "CloudFog",
      },
      {
        title: "日射量",
        value: `${data?.solar_rad_joule || 0}W/m²`,
        icon: "Sun",
      },
      {
        title: "発電量",
        value: (
          <div className="flex flex-col">
            <span className="text-sm">表：{data?.electric_top || 0}kWh</span>
            <span className="text-sm">裏：{data?.electric_bottom || 0}kWh</span>
          </div>
        ),
        icon: "BatteryCharging",
      },
    ],
    [data]
  )

  useEffect(() => {
    if (!controllerValue || !houseValue) return
    getData({
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
    })
  }, [getData, controllerValue, houseValue])

  const CardList = useMemo(() => {
    return STATS_LIST.map((stat) => <StatsCard {...stat} key={stat.title} />)
  }, [STATS_LIST])
  return <div className="mt-2 grid grid-cols-2 gap-2">{CardList}</div>
}
