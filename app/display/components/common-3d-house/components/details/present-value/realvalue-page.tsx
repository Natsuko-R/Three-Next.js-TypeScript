"use client"

import React, { useEffect, useState } from "react"
import { Detaildatas, getDetaildata } from "@/actions/get-detaildata"

import useController from "@/hooks/use-controller"

import {
  ControlDeviceStatus_columns,
  DayNightTemp_columns,
  HouseRep_columns,
  HouseStatusByArea_columns,
  HouseStatusBySensor_columns,
  HouseStatusIrrigation_columns,
  OutdoorWeather_columns,
  WindowCurtainStatus_columns,
} from "../columns"
import { DataTable } from "../data-table"
import {
  getControlDeviceStatus_Data,
  getDayNightTemperature_Data,
  getHouseRep_Data,
  getHouseStatusByArea_Data,
  getHouseStatusBySensor_Data,
  getHouseStatusIrrigation_Data,
  getOutdoorWeather_Data,
  getWindowCurtainStatus_Data,
} from "../details-datas"

export const RealValuePage = () => {
  const { controllerValue, houseValue } = useController()
  const [detailDatas, setdetailDatas] = useState<Detaildatas>()
  const getData = async () => {
    const data = await getDetaildata({
      controller_id: Number(controllerValue),
      house_id: Number(houseValue),
    })
    setdetailDatas(data)
  }

  useEffect(() => {
    if (!controllerValue || !houseValue) return
    getData()
  }, [controllerValue, houseValue])

  console.log("detailDatas:", detailDatas)

  //データ取得
  const HouseRep_data = detailDatas?.houserepresentativevalue
    ? getHouseRep_Data(detailDatas.houserepresentativevalue)
    : []
  const ControlDeviceStatus_data = detailDatas?.controldevicestatus
    ? getControlDeviceStatus_Data(detailDatas.controldevicestatus)
    : []
  const HouseStatusBySensor_data = detailDatas?.housestatusbysensor
    ? getHouseStatusBySensor_Data(detailDatas.housestatusbysensor)
    : []
  const WindowCurtainStatus_data = detailDatas?.windowcurtainstatus
    ? getWindowCurtainStatus_Data(detailDatas.windowcurtainstatus)
    : []
  const HouseStatusIrrigation_data = detailDatas?.housestatusirrigation
    ? getHouseStatusIrrigation_Data(detailDatas.housestatusirrigation)
    : []
  const HouseStatusByArea_data = detailDatas?.housestatusbyarea
    ? getHouseStatusByArea_Data(detailDatas.housestatusbyarea)
    : []
  const OutdoorWeather_data = detailDatas?.outdoorweather
    ? getOutdoorWeather_Data(detailDatas.outdoorweather)
    : []
  const DayNightTemperature_data = detailDatas?.daynighttemperature
    ? getDayNightTemperature_Data(detailDatas.daynighttemperature)
    : []

  return (
    <div className="static grid grid-rows-14">
      <div className="row-start-2 row-span-6 static grid grid-cols-6 gap-2 text-xs">
        <div className="col-start-1 col-span-4 static grid grid-cols-4 gap-2">
          <div className="col-start-1 col-span-2">
            <DataTable
              columns={HouseRep_columns}
              data={HouseRep_data}
              mainHeader="現在値（ハウス代表値）"
              type={1}
            />
          </div>
          <div className="col-start-3 col-span-2">
            <DataTable
              columns={ControlDeviceStatus_columns}
              data={ControlDeviceStatus_data}
              mainHeader="制御機器のON/OFF"
              type={1}
            />
          </div>
          <div className="col-start-1 col-span-4">
            <DataTable
              columns={HouseStatusBySensor_columns}
              data={HouseStatusBySensor_data}
              mainHeader="ハウス内状況（センサー別）"
              type={1}
            />
          </div>
        </div>
        <div className="col-start-5 col-span-2">
          <DataTable
            columns={WindowCurtainStatus_columns}
            data={WindowCurtainStatus_data}
            mainHeader="窓・カーテンの開閉率"
            type={1}
          />
        </div>
      </div>
      <div className="row-start-9 row-span-2 static grid grid-cols-5 text-xs">
        <div className="col-start-1 col-span-1">
          <DataTable
            columns={HouseStatusIrrigation_columns}
            data={HouseStatusIrrigation_data}
            mainHeader="ハウス内状況（灌水流量）"
            type={2}
          />
        </div>
      </div>
      <div className="row-start-11 row-span-2 text-xs">
        <div>
          <DataTable
            columns={HouseStatusByArea_columns}
            data={HouseStatusByArea_data}
            mainHeader="ハウス内状況（エリア別）"
            type={1}
          />
        </div>
      </div>
      <div className="row-start-13 row-span-2 static grid grid-cols-5 gap-2 text-xs">
        <div className="col-start-1 col-span-2">
          <DataTable
            columns={OutdoorWeather_columns}
            data={OutdoorWeather_data}
            mainHeader="外気象"
            type={2}
          />
        </div>
        <div className="col-start-3 col-span-1">
          <DataTable
            columns={DayNightTemp_columns}
            data={DayNightTemperature_data}
            mainHeader="明期/暗期平均気温"
            type={2}
          />
        </div>
      </div>
    </div>
  )
}
