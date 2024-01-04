import { Box } from "@/components/custom-ui/box"
import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import * as echarts from "echarts"


export const EchartsLine = () => {

  const chartRef = useRef<echarts.ECharts | null>(null)


  // init echart
  useEffect(() => {
    const chartDom = document.getElementById("echart-line-root")!
    chartRef.current = echarts.init(chartDom)
  }, [])

  // echart details
  useEffect(() => {
    const myChart = chartRef.current
    // if (!myChart) return

    const option = {

    }


  }, [])

  return (
    <Box className="w-full h-full flex-col items-center">
      <span className="text-xs text-slate-600 py-1">
        CO₂濃度：ppm 気温・土壌温度：℃ 湿度・土壌湿度：% 飽差：g/m³ 気圧：hpa
        照度：klx 日射：W/m² モル：mmol EC：ms/cm 圧力：mpa 風速・最大風速：m/s
        降雨：mm 流量：L/min
      </span>
      <Card className="w-full h-full">
        <div className="w-full min-h-[600px]" id="echart-line-root"></div>
      </Card>
    </Box>
  )
}
