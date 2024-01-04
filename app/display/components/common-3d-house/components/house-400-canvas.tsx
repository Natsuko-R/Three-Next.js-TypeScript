import { useEffect, useRef, useState } from "react"
// basic three object
import SceneManager from "@/components/three/scene/SceneManager"
import GroundManager from "@/components/three/bg/GroundManager"
import SkyBoxManager from "@/components/three/bg/SkyBoxManager"
import PerspectiveCameraManager from "@/components/three/camera/PerspectiveCameraManagerFor400"
import AmbientLightManager from "@/components/three/light/AmbientLightManager"
import DirectionalLightManager from "@/components/three/light/DirectionalLightManager"
import RendererManager from "@/components/three/renderer/RendererManager"
// postprocessing
import OutlineEffect from "@/components/three/posteffect/OutlineEffect"
// controler
import CameraControler from "@/components/three/controler/CameraControlerFor400"
import ObjectControler from "@/components/three/controler/ObjectControler"
// house
import HouseManager from "@/components/three/object/house/HouseManager"
// objects
import PlantManager from "@/components/three/object/decoration-objs/PlantManager"
import CO2PipeManager from "@/components/three/object/decoration-objs/CO2PipeManager"
import SpriteManager from "@/components/three/sprite/SpriteManager"
import CircuratorFanManager from "@/components/three/object/decoration-objs/CircuratorFanManager"
import ControlPanelManager from "@/components/three/object/decoration-objs/ControlPanelManager"
import GasCylinderManager from "@/components/three/object/decoration-objs/GasCylinderManager"
import HeaterGrayManager from "@/components/three/object/decoration-objs/HeaterGrayManager"
import WaterTankBlackManager from "@/components/three/object/decoration-objs/WaterTankBlackManager"
import CO2SensorManager from "@/components/three/object/decoration-objs/CO2SensorManager"
// entity, components and hooks
import { DeviceInfo } from "@/components/common-3d-house/components/popup/interfaces"
import { useThreeHouseStore } from "../hooks/useThreeHouseStore"
import { useDevicesStateStore } from "../hooks/useDevicesStateStore"
import { ReqParam as DeviceReqParam } from "@/actions/get-devicestate"
import useController from "@/hooks/use-controller"
import HousePopup from "../../../pages/popup/house-popup"
import { Device, DeviceWithSize } from "@/actions/get-3d-data"

export const House400Canvas = () => {

  const houseManagerRef = useRef<HouseManager>()
  const circuratorFanRef = useRef<CircuratorFanManager>()

  const { getArray } = useDevicesStateStore() // get CO2Sensor popup data in store
  const { data: Jsondata, has3D } = useThreeHouseStore() // get 3D jsondata in store
  const { controllerValue } = useController()
  const sendRequest = (info: DeviceInfo) => {
    if (!controllerValue || controllerValue === "0") return
    let queryData: DeviceReqParam | null = {
      controller_id: Number(controllerValue),
      type_id: info.name,
      device_id: info.id,
      place_type: info.place_type,
    }
    queryData && getArray(queryData)
  }

  // 選択表示用のステート
  const [selectedAttr, setSelectedAttr] = useState<string | null>(null)
  const [selectedObjId, setSelectedObjId] = useState<number>(0)
  const [selectedOperateFlag, setSelectedOperateFlag] = useState<boolean>(false)
  // オブジェクト選択以外でオペレーションフラグが変更されたときのフラグ
  const [changedFlag, setChangedFlag] = useState<boolean>(false)

  useEffect(() => {

    if (!Jsondata || !has3D) return

    let requestId: number
    let sceneManager: SceneManager
    let skyBoxManager: SkyBoxManager
    let groundManager: GroundManager
    let rendererManager: RendererManager
    let persCameraManager: PerspectiveCameraManager
    let directionalLightManager: DirectionalLightManager
    let ambientLightManager: AmbientLightManager
    let outlineEffect: OutlineEffect
    let cameraControler: CameraControler
    let objectControler: ObjectControler
    let houseManager: HouseManager
    let spriteManager: SpriteManager
    let co2SensorManager: CO2SensorManager
    let circuratorFanManager: CircuratorFanManager
    let heaterGrayManager: HeaterGrayManager
    let waterTankBlackManager: WaterTankBlackManager
    let controlpanelManager: ControlPanelManager
    let gasCylinderManager: GasCylinderManager
    let plantManager: PlantManager
    let co2PipeManager: CO2PipeManager

    // house size props
    const houseWidth = Jsondata.houseSize?.roofNumber
    const houseLength = Jsondata.houseSize?.length
    const floorType = Jsondata.houseSize?.roofNumber
    // objects
    const plants: Device[] = Jsondata.plants
    const co2Pipes: DeviceWithSize[] = Jsondata.co2Pipes
    const circuratorFans: Device[] = Jsondata.circuratorFans
    const controlPanels: Device[] = Jsondata.controlPanels
    const co2GasCylinders: Device[] = Jsondata.co2GasCylinders
    const heatersGray: Device[] = Jsondata.heatersGray
    const waterTanksBlack: Device[] = Jsondata.waterTanksBlack
    const co2Sensors: Device[] = Jsondata.co2Sensors

    initWorld()
    initObjects()
    tick()
    window.addEventListener("resize", resize)

    function initWorld() {
      let canvasWidth: number = window.innerWidth
      let canvasHeight: number = window.innerHeight

      sceneManager = new SceneManager()

      persCameraManager = new PerspectiveCameraManager(
        canvasWidth,
        canvasHeight,
        sceneManager.getScene()
      )

      directionalLightManager = new DirectionalLightManager(
        sceneManager.getScene()
      )
      ambientLightManager = new AmbientLightManager(sceneManager.getScene())

      rendererManager = new RendererManager(
        canvasWidth,
        canvasHeight,
        sceneManager.getScene(),
        persCameraManager.getCamera()
      )

      skyBoxManager = new SkyBoxManager(
        sceneManager.getScene(),
        rendererManager.getRenderer()
      )
      skyBoxManager.addSkyBox()

      groundManager = new GroundManager(sceneManager.getScene())
      groundManager.addGround()

      outlineEffect = new OutlineEffect(
        rendererManager.getRenderer(),
        sceneManager.getScene(),
        persCameraManager.getCamera()
      )

      cameraControler = new CameraControler(persCameraManager.getCamera())

      objectControler = new ObjectControler(
        persCameraManager.getCamera(),
        sceneManager.getScene(),
        outlineEffect
      )

      objectControler.checkIntersectsFor400({
        setSelectedAttr,
        setSelectedObjId,
        setSelectedOperateFlag,
        sendRequest,
      })

    }

    function initObjects() {
      houseManager = new HouseManager(sceneManager.getScene())
      if (houseWidth && houseLength && floorType) {
        houseManager.createHouse(houseWidth, houseLength, floorType);
      }

      co2SensorManager = new CO2SensorManager(sceneManager.getScene())
      heaterGrayManager = new HeaterGrayManager(sceneManager.getScene())
      waterTankBlackManager = new WaterTankBlackManager(sceneManager.getScene())
      controlpanelManager = new ControlPanelManager(sceneManager.getScene())
      gasCylinderManager = new GasCylinderManager(sceneManager.getScene())
      circuratorFanManager = new CircuratorFanManager(sceneManager.getScene())
      plantManager = new PlantManager(sceneManager.getScene())
      co2PipeManager = new CO2PipeManager(sceneManager.getScene())
      spriteManager = new SpriteManager(sceneManager.getScene(), co2Pipes)

      co2SensorManager.addSceneByArray(co2Sensors) // CO2温湿度センサーの配置
      heaterGrayManager.addSceneByArray(heatersGray) // 加温機の配置
      waterTankBlackManager.addSceneByArray(waterTanksBlack) // 潅水タンクの配置
      controlpanelManager.addSceneByArray(controlPanels)
      gasCylinderManager.addSceneByArray(co2GasCylinders)
      circuratorFanManager.addSceneByArray(circuratorFans)
      co2PipeManager.addSceneByArray(co2Pipes)
      plants && plants.forEach(item => plantManager.createObject(item))

      // init ref
      houseManagerRef.current = houseManager
      circuratorFanRef.current = circuratorFanManager
    }

    function tick() {

      rendererManager.render()
      circuratorFanManager.updateAnimationObjects()
      spriteManager.updateSprites()
      outlineEffect.render()
      cameraControler.updateControler()

      requestId = requestAnimationFrame(tick)

    }

    function resize() {
      let canvasWidth: number = window.innerWidth
      let canvasHeight: number = window.innerHeight

      if (rendererManager !== undefined && persCameraManager !== undefined) {
        rendererManager.resize(canvasWidth, canvasHeight)
        persCameraManager.setAspect(canvasWidth, canvasHeight)
      }
    }

    // コンポーネントのアンマウント時
    return () => {
      cancelAnimationFrame(requestId)
      sceneManager.terminate()
      skyBoxManager.terminate()
      groundManager.terminate()
      rendererManager.terminate()
    }

  }, [Jsondata, has3D])

  return (
    <div>
      <canvas id="glcanvas" />

      {selectedAttr && (
        <HousePopup
          selectedAttr={selectedAttr}
          selectedObjId={selectedObjId}
          selectedOperateFlag={selectedOperateFlag}
          setSelectedOperateFlag={setSelectedOperateFlag}
          setChangedFlag={setChangedFlag}
        />
      )}
    </div>
  )
}
