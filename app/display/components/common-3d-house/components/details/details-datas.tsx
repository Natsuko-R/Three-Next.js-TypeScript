import {
  ControlDeviceStatus,
  DayNightTemperature,
  HouseRep_Value,
  HouseStatusByArea,
  HouseStatusBySensor,
  HouseStatusIrrigation,
  OutdoorWeather,
  WindowCurtainStatus,
} from "@/actions/get-detaildata"

import {
  ControlDeviceStatus_DataType,
  DayNightTemp_DataType,
  HouseRep_DataType,
  HouseStatusByArea_DataType,
  HouseStatusBySensor_DataType,
  HouseStatusIrrigation_DataType,
  OutdoorWeather_DataType,
  WindowCurtainStatus_DataType,
} from "./columns"

export function getHouseRep_Data(data: HouseRep_Value): HouseRep_DataType[] {
  return [
    {
      id: "1",
      items: "冷房",
      currentval: `${Number(data.cur_cooler).toFixed(2)}℃`,
      setval: `${Number(data.set_cooler).toFixed(2)}℃`,
    },
    {
      id: "2",
      items: "暖房",
      currentval: `${Number(data.cur_cooler).toFixed(2)}℃`,
      setval: `${Number(data.set_heater).toFixed(2)}℃`,
    },
    {
      id: "3",
      items: "除湿",
      currentval: `${Number(data.cur_dehumidifier).toFixed(2)}g/m³`,
      setval: `${Number(data.set_dehumidifier).toFixed(2)}g/m³`,
    },
    {
      id: "4",
      items: "CO₂",
      currentval: `${Number(data.cur_co2_ppm).toFixed(2)}ppm`,
      setval: `${Number(data.set_co2_ppm).toFixed(2)}ppm`,
    },
  ]
}

export function getControlDeviceStatus_Data(
  data: ControlDeviceStatus
): ControlDeviceStatus_DataType[] {
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
    /*{
      id: "3",
      items: "冷房除湿",
      status: convertSts(data.cooler_dehumi_sts),
      value: convertVal(data.cooler_dehumi_val),
    },
    {
      id: "4",
      items: "暖房除湿",
      status: convertSts(data.heater_dehumi_sts),
      value: convertVal(data.heater_dehumi_val),
    },*/
    // {
    //   id: "3",
    //   items: "CO₂",
    //   status: convertSts(data.co2_ppm_sts),
    //   value: convertVal(data.co2_ppm_val),
    // },
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

export function getWindowCurtainStatus_Data(
  data: WindowCurtainStatus[]
): WindowCurtainStatus_DataType[] {
  const convertSts = (value: number): string => {
    switch (value) {
      case 0:
        return "OFF"
      case 1:
        return "ON"
      default:
        return "不明"
    }
  }

  const Status1 = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.type_id === value)
    return sensorData ? convertSts(sensorData.state) : " "
  }

  const Status2 = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.type_id === value)
    return sensorData ? convertSts(sensorData.state) : " "
  }

  const Status = (value1: number, value2: number): string => {
    const sensorData = Status1(value1) + "-" + Status2(value2)
    return sensorData
  }

  const Progress = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.type_id === value)
    return sensorData ? `${sensorData.progress_percent}%` : "ー"
  }
  return [
    {
      id: "1",
      items: "窓（第1系統）",
      status: Status(18, 19),
      progress: Progress(18),
    },
    {
      id: "2",
      items: "窓（第2系統）",
      status: Status(20, 21),
      progress: Progress(20),
    },
    {
      id: "3",
      items: "窓（第3系統）",
      status: Status(22, 23),
      progress: Progress(22),
    },
    {
      id: "4",
      items: "窓（第4系統）",
      status: Status(24, 25),
      progress: Progress(24),
    },
    {
      id: "5",
      items: "窓（第5系統）",
      status: Status(26, 27),
      progress: Progress(26),
    },
    {
      id: "6",
      items: "窓（第6系統）",
      status: Status(37, 38),
      progress: Progress(37),
    },
    {
      id: "7",
      items: "カーテン（第1系統）",
      status: Status(26, 27),
      progress: Progress(26),
    },
    {
      id: "8",
      items: "カーテン（第2系統）",
      status: Status(28, 29),
      progress: Progress(28),
    },
    {
      id: "9",
      items: "カーテン（第3系統）",
      status: Status(30, 31),
      progress: Progress(30),
    },
    {
      id: "10",
      items: "カーテン（第4系統）",
      status: Status(60, 61),
      progress: Progress(60),
    },
    {
      id: "11",
      items: "カーテン（第5系統）",
      status: Status(62, 63),
      progress: Progress(62),
    },
    {
      id: "12",
      items: "カーテン（第6系統）",
      status: Status(64, 65),
      progress: Progress(64),
    },
    {
      id: "13",
      items: "カーテン（第7系統）",
      status: Status(66, 67),
      progress: Progress(66),
    },
    {
      id: "14",
      items: "カーテン（第8系統）",
      status: Status(68, 69),
      progress: Progress(68),
    },
  ]
}

export function getHouseStatusBySensor_Data(
  data: HouseStatusBySensor[]
): HouseStatusBySensor_DataType[] {
  const Temperature = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.sensorno === value)
    return sensorData ? `${Number(sensorData.temperature).toFixed(2)}℃` : "ー"
  }

  const Humidity = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.sensorno === value)
    return sensorData ? `${Number(sensorData.humidity).toFixed(2)}%RH` : "ー"
  }

  const Saturation_deficit = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.sensorno === value)
    return sensorData
      ? `${Number(sensorData.saturation_deficit).toFixed(2)}g/m³`
      : "ー"
  }

  const Co2_ppm = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.sensorno === value)
    return sensorData ? `${Number(sensorData.co2_ppm).toFixed(2)}ppm` : "ー"
  }
  return [
    {
      id: "1",
      items: "温度",
      sensor1: Temperature(1),
      sensor2: Temperature(2),
      sensor3: Temperature(3),
      sensor4: Temperature(4),
      sensor5: Temperature(5),
      sensor6: Temperature(6),
      sensor7: Temperature(7),
      sensor8: Temperature(8),
    },
    {
      id: "2",
      items: "湿度",
      sensor1: Humidity(1),
      sensor2: Humidity(2),
      sensor3: Humidity(3),
      sensor4: Humidity(4),
      sensor5: Humidity(5),
      sensor6: Humidity(6),
      sensor7: Humidity(7),
      sensor8: Humidity(8),
    },
    {
      id: "3",
      items: "飽差	",
      sensor1: Saturation_deficit(1),
      sensor2: Saturation_deficit(2),
      sensor3: Saturation_deficit(3),
      sensor4: Saturation_deficit(4),
      sensor5: Saturation_deficit(5),
      sensor6: Saturation_deficit(6),
      sensor7: Saturation_deficit(7),
      sensor8: Saturation_deficit(8),
    },
    {
      id: "4",
      items: "CO₂濃度",
      sensor1: Co2_ppm(1),
      sensor2: Co2_ppm(2),
      sensor3: Co2_ppm(3),
      sensor4: Co2_ppm(4),
      sensor5: Co2_ppm(5),
      sensor6: Co2_ppm(6),
      sensor7: Co2_ppm(7),
      sensor8: Co2_ppm(8),
    },
  ]
}

export function getHouseStatusIrrigation_Data(
  data: HouseStatusIrrigation
): HouseStatusIrrigation_DataType[] {
  return [
    {
      id: "1",
      items: "ライン１（水）",
      value: data.line1_flow_lpm
        ? `${Number(data.line1_flow_lpm).toFixed(2)}L`
        : "ー",
    },
    {
      id: "2",
      items: "ライン2（液肥）",
      value: data.line2_flow_lpm
        ? `${Number(data.line2_flow_lpm).toFixed(2)}L`
        : "ー",
    },
    {
      id: "3",
      items: "ライン３",
      value: data.line3_flow_lpm
        ? `${Number(data.line3_flow_lpm).toFixed(2)}L`
        : "ー",
    },
  ]
}

export function getHouseStatusByArea_Data(
  data: HouseStatusByArea[]
): HouseStatusByArea_DataType[] {
  /*const co2_flow_lpm = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.areano === value)
    return sensorData ? `${Number(sensorData.co2_flow_lpm).toFixed(2)}L` : "ー"
  }

  const air_flow_lpm = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.areano === value)
    return sensorData ? `${Number(sensorData.air_flow_lpm).toFixed(2)}L` : "ー"
  }*/
  const co2_flow_lpm = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.areano === value)

    if (sensorData && sensorData.co2_flow_lpm !== 0) {
      return `${Number(sensorData.co2_flow_lpm).toFixed(2)}L`
    } else {
      return "ー"
    }
  }

  const air_flow_lpm = (value: number): string => {
    const sensorData = data.find((sensor) => sensor.areano === value)

    if (sensorData && sensorData.air_flow_lpm !== 0) {
      return `${Number(sensorData.air_flow_lpm).toFixed(2)}L`
    } else {
      return "ー"
    }
  }

  return [
    {
      id: "1",
      items: "CO₂流量",
      area1: co2_flow_lpm(1),
      area2: co2_flow_lpm(2),
      area3: co2_flow_lpm(3),
      area4: co2_flow_lpm(4),
      area5: co2_flow_lpm(5),
      area6: co2_flow_lpm(6),
      area7: co2_flow_lpm(7),
      area8: co2_flow_lpm(8),
      area9: co2_flow_lpm(9),
      area10: co2_flow_lpm(10),
    },
    {
      id: "2",
      items: "Air流量",
      area1: air_flow_lpm(1),
      area2: air_flow_lpm(2),
      area3: air_flow_lpm(3),
      area4: air_flow_lpm(4),
      area5: air_flow_lpm(5),
      area6: air_flow_lpm(6),
      area7: air_flow_lpm(7),
      area8: air_flow_lpm(8),
      area9: air_flow_lpm(9),
      area10: air_flow_lpm(10),
    },
  ]
}

export function getOutdoorWeather_Data(
  data: OutdoorWeather
): OutdoorWeather_DataType[] {
  const convertRainfall = (value: number): string => {
    switch (value) {
      case 0:
        return "晴れ"
      case 1:
        return "雨"
      default:
        return "-"
    }
  }
  return [
    {
      id: "1",
      column1: "温度",
      column2: "相対湿度",
      column3: "風速",
    },
    {
      id: "2",
      column1: `${Number(data.temperature).toFixed(2)}℃`,
      column2: `${Number(data.relativehumi).toFixed(2)}RH`,
      column3: `${Number(data.windspeed).toFixed(2)}m/s`,
    },
    {
      id: "3",
      column1: "日射量",
      column2: "降雨状況",
      column3: "",
    },
    {
      id: "4",
      column1: `${data.solar_radiation}W/m²`,
      column2: convertRainfall(data.rainfall),
      column3: "",
    },
  ]
}

export function getDayNightTemperature_Data(
  data: DayNightTemperature
): DayNightTemp_DataType[] {
  return [
    {
      id: "1",
      items: "明期平均気温",
      value: `${Number(data.day_avgtemperature).toFixed(2)}℃`,
    },
    {
      id: "2",
      items: "暗期平均気温",
      value: `${Number(data.night_avgtemperature).toFixed(2)}℃`,
    },
    {
      id: "3",
      items: "DIF（昼夜間温度差）",
      value: `${Number(data.temp_difference).toFixed(2)}℃`,
    },
  ]
}
