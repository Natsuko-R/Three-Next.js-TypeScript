import React from "react"
import { HousePopupProps } from "./interfaces"
import HousePopupButton from "./house-popup-button";
import { useDevicesStateStore } from "../../components/common-3d-house/hooks/useDevicesStateStore"

export default function HousePopup({ selectedDevice, setChangedFlag }: HousePopupProps) {

  const { data } = useDevicesStateStore();
  const devicesPopupArr = (data && data[0]?.deviceDataArr) || [];

  let selectedObjId = selectedDevice.deviceId;
  let selectedAttr = selectedDevice.attribute;
  let switchFlag = false; // スイッチを表示するフラグ
  let objectName = ""; // 選択されたオブジェクトの名前を判定する

  switch (selectedAttr) {
    case "CircuratorFan":
      objectName = "循環扇"
      switchFlag = true
      break

    case "ExhaustFan":
      objectName = "換気扇"
      switchFlag = true
      break

    case "CO2Sensor":
      objectName = "CO2センサー"
      break

    case "RainSensor":
      objectName = "感雨センサー"
      break

    case "SolarRadiationSensor":
      objectName = "日射センサー"
      break

    case "WindSensor":
      objectName = "風速センサー"
      break

    case "Camera":
      objectName = "カメラ"
      break

    case "GasCylinder":
      objectName = "CO2ガスボンベ"
      break

    case "HeatPump":
      objectName = "ヒートポンプ"
      break

    case "Heater":
      objectName = "加温器"
      break

    default:
      objectName = ""
  };

  return (
    <div>
      {["RainSensor", "SolarRadiationSensor", "WindSensor", "Camera", "GasCylinder", "HeatPump", "Heater"].includes(selectedAttr) && (
        <div className="absolute bottom-10 right-10 rounded-xl bg-slate-800 p-5 text-zinc-100">
          <p>{objectName}</p>
          <p>ID: {selectedObjId}</p>
        </div>
      )}

      {["CO2Sensor", "ExhaustFan", "CircuratorFan"].includes(selectedAttr) && (

        // devicesPopupArr.length > 0 &&
        (
          <div className="absolute bottom-10 right-10 rounded-xl bg-slate-800 p-5 text-zinc-100">
            <p>{objectName}</p>
            <p>ID: {selectedObjId}</p>

            {devicesPopupArr.map((item) => (
              <div key={item.title}>
                {item.title}:{item.device_data}
                {item.uint}
              </div>
            ))}

            {switchFlag === true && (
              <HousePopupButton
                setChangedFlag={setChangedFlag}
              />
            )}
          </div>
        )
      )}

      {selectedAttr === "GasCylinder" && (
        <div className="absolute bottom-10 right-10 rounded-xl bg-slate-800 p-5 text-zinc-100">
          <p>{objectName}</p>
          <p>ID: {selectedObjId}</p>
          <p>ボンベ残量</p>
          <p>① 32L　/　120L </p>
          <p>② 120L　/　120L </p>
        </div>
      )}

    </div>
  )
}


