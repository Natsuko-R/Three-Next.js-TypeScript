import { useEffect, useRef } from "react"
import SceneManager from "@/components/three/scene/SceneManager"
import GroundManager from "@/components/three/bg/GroundManager"
import SkyBoxManager from "@/components/three/bg/SkyBoxManager"
import PerspectiveCameraManager from "@/components/three/camera/PerspectiveCameraManager"
import AmbientLightManager from "@/components/three/light/AmbientLightManager"
import DirectionalLightManager from "@/components/three/light/DirectionalLightManager"
import RendererManager from "@/components/three/renderer/RendererManager"
import OrbitControler from "@/components/three/controler/OrbitControler"
import ObjectControler from "@/components/three/controler/ObjectControler"
import OutlineEffect from "@/components/three/posteffect/OutlineEffect"

// object
import HouseManager from "@/components/three/object/house/HouseManager"
import HeatPumpManager from "@/components/three/object/decoration-objs/HeatPumpManager"
import HeaterManager from "@/components/three/object/decoration-objs/HeaterManager"
import HeaterGrayManager from "@/components/three/object/decoration-objs/HeaterGrayManager"
import CircuratorFanManager from "@/components/three/object/CircuratorFanManager"
import ExhaustFanManager from "@/components/three/object/ExhaustFanManager"
import CO2SensorManager from "@/components/three/object/sensors/CO2SensorManager"
import SolarRadiationSensorManager from "@/components/three/object/sensors/SolarRadiationSensorManager"
import WindSensorManager from "@/components/three/object/sensors/WindSensorManager"
import RainSensorManager from "@/components/three/object/sensors/RainSensorManager"
import WaterTankBlackManager from "@/components/three/object/decoration-objs/WaterTankBlackManager"
import WaterTankManager from "@/components/three/object/decoration-objs/WaterTankManager"
import ControlPanelManager from "@/components/three/object/decoration-objs/ControlPanelManager"
import GasCylinderManager from "@/components/three/object/decoration-objs/GasCylinderManager"
import PlantManager from "@/components/three/object/decoration-objs/PlantManager"
import CO2PipeManager from "@/components/three/object/decoration-objs/CO2PipeManager"
import SignBoardManager from "@/components/three/object/decoration-objs/SignBoardManager"
import AirCylinderManager from "@/components/three/object/decoration-objs/AirCylinderManager"
import LEDManager from "@/components/three/object/LEDManager"
import CompressorManager from "@/components/three/object/decoration-objs/CompressorManager"

// other
import { useObjectDataStore } from "./hooks/useObjectDataStore"
import { useJsonDataStore } from "./hooks/useJsonDataStore"
import { Device, SizeInfo } from "@/actions/get-3d-data"

export const HouseModificationCanvas = () => {

  // basic three object
  let requestId: number
  let sceneManager: SceneManager
  let skyBoxManager: SkyBoxManager
  let groundManager: GroundManager
  let rendererManager: RendererManager
  let persCameraManager: PerspectiveCameraManager
  let directionalLightManager: DirectionalLightManager
  let ambientLightManager: AmbientLightManager
  // controler
  let orbitControler: OrbitControler
  let objectControler: ObjectControler
  let outlineEffect: OutlineEffect

  const { resetObject, setSelectedObject } = useObjectDataStore();
  const { JsonData: LocalData } = useJsonDataStore() // Local 3D Data  

  //-----------------------------------------------------------------------------//
  // refの宣言
  //-----------------------------------------------------------------------------//
  const sceneRef = useRef<SceneManager>()
  const rendererRef = useRef<RendererManager>()
  const persCameraRef = useRef<PerspectiveCameraManager>()
  const orbitControlerRef = useRef<OrbitControler>()
  const outlineEffectRef = useRef<OutlineEffect>()
  const houseRef = useRef<HouseManager>()
  const co2SensorRef = useRef<CO2SensorManager>()
  const windSensorRef = useRef<WindSensorManager>()
  const rainSensorRef = useRef<RainSensorManager>()
  const solarRadSensorRef = useRef<SolarRadiationSensorManager>()
  const heaterRef = useRef<HeaterManager>()
  const heaterGrayRef = useRef<HeaterGrayManager>()
  const heatPumpRef = useRef<HeatPumpManager>()
  const co2PipeRef = useRef<CO2PipeManager>()
  const waterTankRef = useRef<WaterTankManager>()
  const waterTankBlackRef = useRef<WaterTankBlackManager>()
  const controlpanelRef = useRef<ControlPanelManager>()
  const gasCylinderRef = useRef<GasCylinderManager>()
  const plantRef = useRef<PlantManager>()
  const signBoardRef = useRef<SignBoardManager>()
  const airCylinderRef = useRef<AirCylinderManager>()
  const compressorRef = useRef<CompressorManager>()
  const circuratorFanRef = useRef<CircuratorFanManager>()
  const exhaustFanRef = useRef<ExhaustFanManager>()
  const ledRef = useRef<LEDManager>()

  const initWorld = () => {
    // ウィンドウサイズの取得
    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    // シーンの作成
    sceneManager = new SceneManager()
    sceneRef.current = sceneManager

    // カメラの作成
    persCameraManager = new PerspectiveCameraManager(
      canvasWidth,
      canvasHeight,
      sceneManager.getScene()
    )
    persCameraRef.current = persCameraManager

    // ライトの作成
    directionalLightManager = new DirectionalLightManager(sceneManager.getScene())
    ambientLightManager = new AmbientLightManager(sceneManager.getScene())

    // レンダラーの作成
    rendererManager = new RendererManager(
      canvasWidth,
      canvasHeight,
      sceneManager.getScene(),
      persCameraManager.getCamera()
    )
    rendererRef.current = rendererManager

    // スカイボックスの作成
    skyBoxManager = new SkyBoxManager(
      sceneManager.getScene(),
      rendererManager.getRenderer()
    )
    skyBoxManager.addSkyBox()
    // 地面の作成
    groundManager = new GroundManager(sceneManager.getScene())

    // ポストエフェクトの作成
    outlineEffect = new OutlineEffect(
      rendererManager.getRenderer(),
      sceneManager.getScene(),
      persCameraManager.getCamera()
    )
    outlineEffectRef.current = outlineEffect

    // カメラコントローラの作成
    orbitControler = new OrbitControler(persCameraManager.getCamera())
    orbitControlerRef.current = orbitControler

    objectControler = new ObjectControler(
      persCameraManager.getCamera(),
      sceneManager.getScene(),
      outlineEffect
    )

    objectControler.checkIntersects(setSelectedObject, resetObject)

  }

  const initObject = () => {
    if (!sceneRef.current) return

    houseRef.current = new HouseManager(sceneRef.current.getScene())
    // sensor(7)
    co2SensorRef.current = new CO2SensorManager(sceneRef.current.getScene())
    solarRadSensorRef.current = new SolarRadiationSensorManager(sceneRef.current.getScene())
    windSensorRef.current = new WindSensorManager(sceneRef.current.getScene())
    rainSensorRef.current = new RainSensorManager(sceneRef.current.getScene())
    // decoration objects
    co2PipeRef.current = new CO2PipeManager(sceneRef.current.getScene())
    heatPumpRef.current = new HeatPumpManager(sceneRef.current.getScene())
    heaterRef.current = new HeaterManager(sceneRef.current.getScene())
    heaterGrayRef.current = new HeaterGrayManager(sceneRef.current.getScene())
    waterTankRef.current = new WaterTankManager(sceneRef.current.getScene())
    waterTankBlackRef.current = new WaterTankBlackManager(sceneRef.current.getScene())
    controlpanelRef.current = new ControlPanelManager(sceneRef.current.getScene())
    gasCylinderRef.current = new GasCylinderManager(sceneRef.current.getScene())
    plantRef.current = new PlantManager(sceneRef.current.getScene())
    signBoardRef.current = new SignBoardManager(sceneRef.current.getScene())
    airCylinderRef.current = new AirCylinderManager(sceneRef.current.getScene())
    compressorRef.current = new CompressorManager(sceneRef.current.getScene())
    // animation & morphing objects
    circuratorFanRef.current = new CircuratorFanManager(sceneRef.current.getScene())
    exhaustFanRef.current = new ExhaustFanManager(sceneRef.current.getScene())
    ledRef.current = new LEDManager(sceneRef.current.getScene())

  }

  const tick = () => {

    rendererRef.current?.render()

    outlineEffectRef.current?.render()

    orbitControlerRef.current?.updateControler()

    requestId = requestAnimationFrame(tick)

  }

  const onWindowResize = () => {

    // ウィンドウサイズの取得
    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    persCameraRef.current?.setAspect(canvasWidth, canvasHeight)
    rendererRef.current?.resize(canvasWidth, canvasHeight)

  }

  useEffect(() => {

    if (!LocalData) return

    initWorld()
    initObject()
    tick()
    window.addEventListener("resize", onWindowResize) // リサイズ処理


    const houseData: SizeInfo | null = LocalData.houseSize
    // sensor(7)
    const co2Sensors: Device[] = LocalData.co2Sensors // CO2センサー
    const radiationSensors: Device[] = LocalData.solarRadSensors // 日照センサー
    const windSensors: Device[] = LocalData.windSensors // 風力計
    const rainSensors: Device[] = LocalData.rainSensors // 風力計
    // decoration objects
    const heatPumps: Device[] = LocalData.heatPumps // ヒートポンプ
    const heaters: Device[] = LocalData.heaters // 加温機
    const heatersGray: Device[] = LocalData.heatersGray // 加温機
    const waterTanks: Device[] = LocalData.waterTanks // 潅水タンク
    const waterTanksBlack: Device[] = LocalData.waterTanksBlack // 潅水タンク
    const controlPanels: Device[] = LocalData.controlPanels
    const co2GasCylinders: Device[] = LocalData.co2GasCylinders
    const plants: Device[] = LocalData.plants
    const co2Pipes: Device[] = LocalData.co2Pipes
    const signBoards: Device[] = LocalData.signBoards
    const airCylinders: Device[] = LocalData.airCylinders
    const compressors: Device[] = LocalData.compressors
    // animation & morphing objects
    const circuratorFans: Device[] = LocalData.circuratorFans // 循環扇
    const exhaustFans: Device[] = LocalData.exhaustFans
    const leds: Device[] = LocalData.leds

    houseData && houseRef.current?.createHouse(houseData.roofNumber, houseData.length, houseData.floorType)
    // sensor(7)
    co2SensorRef.current?.addSceneByArray(co2Sensors) // CO2温湿度センサーの配置
    solarRadSensorRef.current?.addSceneByArray(radiationSensors) // 日射センサーの配置
    windSensorRef.current?.addSceneByArray(windSensors) // 風力計の配置
    rainSensorRef.current?.addSceneByArray(rainSensors) // 風力計の配置
    // // decoration objects
    heaterRef.current?.addSceneByArray(heaters) // 加温機の配置
    heaterGrayRef.current?.addSceneByArray(heatersGray) // 加温機の配置
    heatPumpRef.current?.addSceneByArray(heatPumps) // ヒートポンプの配置
    waterTankRef.current?.addSceneByArray(waterTanks) // 潅水タンクの配置
    waterTankBlackRef.current?.addSceneByArray(waterTanksBlack) // 潅水タンクの配置
    controlpanelRef.current?.addSceneByArray(controlPanels)
    gasCylinderRef.current?.addSceneByArray(co2GasCylinders)
    co2PipeRef.current?.addSceneByArray(co2Pipes)
    plants && plants.forEach(item => plantRef.current?.createObject(item))
    signBoardRef.current?.addSceneByArray(signBoards)
    airCylinderRef.current?.addSceneByArray(airCylinders)
    compressorRef.current?.addSceneByArray(compressors)
    // // animation & morphing objects
    ledRef.current?.addSceneByArray(leds)
    circuratorFanRef.current?.addSceneByArray(circuratorFans)
    exhaustFanRef.current?.addSceneByArray(exhaustFans)

    return () => {
      cancelAnimationFrame(requestId)
      window.removeEventListener("resize", onWindowResize)
      sceneManager.terminate()
      skyBoxManager.terminate()
      groundManager.terminate()
      rendererManager.terminate()
    }
  }, [LocalData])

  return <canvas id="glcanvas" />
}
