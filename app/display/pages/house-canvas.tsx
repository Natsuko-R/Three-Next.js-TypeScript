"use client"

import { useEffect, useRef, useState } from "react"
import SceneManager from "./three/scene/SceneManager"
import GroundManager from "./three/bg/GroundManager"
import SkyBoxManager from "./three/bg/SkyBoxManager"
import PerspectiveCameraManager from "./three/camera/PerspectiveCameraManager"
import RendererManager from "./three/renderer/RendererManager"
import CameraControler from "./three/controler/CameraControler"
import ObjectControler from "./three/controler/ObjectControler"
import OutlineEffect from "./three/posteffect/OutlineEffect"
// object
import HouseManager from "./three/object/house/HouseManager"
import DecoratedObjManager from "./three/object/object-manager/objects/DecoratedObjManager";
import HeaterManager from "./three/object/object-manager/objects/HeaterManager"
import CircuratorFanManager from "./three/object/object-manager/objects/CircuratorFanManager"
import ExhaustFanManager from "./three/object/object-manager/objects/ExhaustFanManager"
import CO2SensorManager from "./three/object/object-manager/objects/CO2SensorManager"
import SolarRadiationSensorManager from "./three/object/object-manager/objects/SolarRadiationSensorManager"
import WindSensorManager from "./three/object/object-manager/objects/WindSensorManager"
import RainSensorManager from "./three/object/object-manager/objects/RainSensorManager"
import PlantManager from "./three/object/object-manager/objects/PlantManager"
import CO2PipeManager from "./three/object/object-manager/objects/CO2PipeManager"
import LEDManager from "./three/object/object-manager/objects/LEDManager"
import SpriteManager from "./three/sprite/SpriteManager"

// other
// import useController from "@/hooks/use-controller"
import HousePopup from "./popup/house-popup"
import { DeviceInfo, DevicePopupInfo } from "./popup/interfaces"
// import { useDevicesStateStore } from "../components/common-3d-house/hooks/useDevicesStateStore"
// import { useThreeHouseStore } from "../components/common-3d-house/hooks/useThreeHouseStore"
import { Device, DeviceWithSize, SizeInfo } from "@/actions/get-3d-data"
// import { ReqParam as DeviceReqParam } from "@/actions/get-devicestate"
// import { getDeviceStateEveryMinute } from "@/actions/get-fan-state"
import { AmbientLight, DirectionalLight } from "three"
import FakeData from "../hooks/FakeData.json"

export const HouseCanvas = () => {
  //-----------------------------------------------------------------------------//
  // SEND REQUEST
  //-----------------------------------------------------------------------------//
  // const { getArray, data: popupData } = useDevicesStateStore(); // get CO2Sensor popup data in store
  // const { data: Jsondata, has3D } = useThreeHouseStore(); // get 3D jsondata in store
  let Jsondata = FakeData, has3D = true;
  // const { controllerValue } = useController();
  const sendRequest = (info: DeviceInfo) => {
    // if (!controllerValue || controllerValue === "0") return
    // let queryData: DeviceReqParam | null = {
    //   controller_id: Number(controllerValue),
    //   type_id: info.name,
    //   device_id: info.id,
    //   place_type: info.place_type,
    // }
    // queryData && getArray(queryData)
  };

  if (!Jsondata || !has3D) return;
  const houseData: SizeInfo | null = Jsondata.houseSize;
  const co2Sensors: Device[] = Jsondata.co2Sensors;
  const radiationSensors: Device[] = Jsondata.solarRadSensors;
  const windSensors: Device[] = Jsondata.windSensors;
  const rainSensors: Device[] = Jsondata.rainSensors;
  const heaters: Device[] = Jsondata.heaters;
  const plants: Device[] = Jsondata.plants;
  const circuratorFans: Device[] = Jsondata.circuratorFans ?? [];
  const exhaustFans: Device[] = Jsondata.exhaustFans ?? [];
  const decoratedObjs: Device[] = Jsondata.decoratedObj;
  const co2Pipes: DeviceWithSize[] = Jsondata.co2Pipes;
  const leds: DeviceWithSize[] = Jsondata.leds ?? [];
  // 
  const stateCombinedArray = [
    ...circuratorFans,
    ...exhaustFans,
    // ...co2Pipes,
    ...leds,
    ...Jsondata.windows
  ] as (Device | DeviceWithSize)[];

  //-----------------------------------------------------------------------------//
  // 変数宣言
  //-----------------------------------------------------------------------------//
  let requestId: number;
  let sceneManager: SceneManager;
  let skyBoxManager: SkyBoxManager;
  let groundManager: GroundManager;
  let rendererManager: RendererManager;
  let persCameraManager: PerspectiveCameraManager;
  let cameraControler: CameraControler;
  let objectControler: ObjectControler;
  let outlineEffect: OutlineEffect;

  //-----------------------------------------------------------------------------//
  // refの宣言
  //-----------------------------------------------------------------------------//
  const sceneRef = useRef<SceneManager>();
  const skyBoxRef = useRef<SkyBoxManager>();
  const groundRef = useRef<GroundManager>();
  const rendererRef = useRef<RendererManager>();
  const persCameraRef = useRef<PerspectiveCameraManager>();
  const cameraControlerRef = useRef<CameraControler>();
  const outlineEffectRef = useRef<OutlineEffect>();
  //
  const houseRef = useRef<HouseManager>();
  const co2SensorRef = useRef<CO2SensorManager>();
  const windSensorRef = useRef<WindSensorManager>();
  const rainSensorRef = useRef<RainSensorManager>();
  const solarRadSensorRef = useRef<SolarRadiationSensorManager>();
  const heaterRef = useRef<HeaterManager>();
  const co2PipeRef = useRef<CO2PipeManager>();
  const plantRef = useRef<PlantManager>();
  const circuratorFanRef = useRef<CircuratorFanManager>();
  const exhaustFanRef = useRef<ExhaustFanManager>();
  const ledRef = useRef<LEDManager>();
  const decoratedObjRef = useRef<DecoratedObjManager>();

  // 選択表示用のステート
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<DevicePopupInfo>({
    "deviceId": 0,
    "attribute": "",
    "state": 0
  });
  // const [selectedAttr, setSelectedAttr] = useState<string | null>(null);
  // const [selectedObjId, setSelectedObjId] = useState<number>(0);
  // オブジェクト選択以外でオペレーションフラグが変更されたときのフラグ
  const [changedFlag, setChangedFlag] = useState<boolean>(false);

  //-----------------------------------------------------------------------------//
  // DEFINE FUNCTIONS
  //-----------------------------------------------------------------------------//
  const initWorld = () => {
    // ウィンドウサイズの取得
    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    // シーンの作成
    sceneManager = new SceneManager()
    sceneRef.current = sceneManager

    // ライトの作成
    sceneManager.add(new DirectionalLight(0xffffff, 1));
    sceneManager.add(new AmbientLight(0xffffff, 2.5));

    // カメラの作成
    persCameraManager = new PerspectiveCameraManager(
      canvasWidth,
      canvasHeight,
      sceneManager.getScene()
    )
    persCameraRef.current = persCameraManager

    // カメラコントローラの作成
    cameraControler = new CameraControler(persCameraManager.getCamera())
    cameraControlerRef.current = cameraControler

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
    );
    skyBoxRef.current = skyBoxManager;

    // 地面の作成
    groundManager = new GroundManager(sceneManager.getScene());
    groundRef.current = groundManager;

    // ポストエフェクトの作成
    outlineEffect = new OutlineEffect(
      rendererManager.getRenderer(),
      sceneManager.getScene(),
      persCameraManager.getCamera()
    );
    outlineEffectRef.current = outlineEffect;

    // オブジェクトコントローラの作成
    objectControler = new ObjectControler(
      persCameraManager.getCamera(),
      sceneManager.getScene(),
      outlineEffect
    );
    objectControler.checkIntersects({
      setIsSelected,
      setSelectedDevice,
      // setSelectedAttr,
      // setSelectedObjId,
      // setSelectedOperateFlag,
      sendRequest,
    });
  };

  const initObjects = () => {
    if (!sceneRef.current) return;

    // init ref
    houseRef.current = new HouseManager(sceneRef.current.getScene());
    co2SensorRef.current = new CO2SensorManager(sceneRef.current.getScene());
    solarRadSensorRef.current = new SolarRadiationSensorManager(sceneRef.current.getScene());
    windSensorRef.current = new WindSensorManager(sceneRef.current.getScene());
    rainSensorRef.current = new RainSensorManager(sceneRef.current.getScene());
    co2PipeRef.current = new CO2PipeManager(sceneRef.current.getScene());
    decoratedObjRef.current = new DecoratedObjManager(sceneRef.current.getScene());
    heaterRef.current = new HeaterManager(sceneRef.current.getScene());
    plantRef.current = new PlantManager(sceneRef.current.getScene());
    circuratorFanRef.current = new CircuratorFanManager(sceneRef.current.getScene());
    exhaustFanRef.current = new ExhaustFanManager(sceneRef.current.getScene());
    ledRef.current = new LEDManager(sceneRef.current.getScene());

    // add objects 
    if (houseData && houseData.roofNumber !== 0 && houseData.length !== 0 && houseData.floorType !== 0) {

      houseRef.current?.createHouse(houseData.roofNumber, houseData.length, houseData.floorType)

      if (Jsondata.isBigCurtain) {
        houseRef.current?.createOneCurtain()
        houseRef.current?.setOneCurtainDegree(Jsondata.curtains[0]?.degree, Jsondata.curtains[1]?.degree)
      } else if (Jsondata.curtains) {

        houseRef.current?.createCurtains(houseData.roofNumber)

        const filteredCurtains = Jsondata.curtains.filter(c => c.type_id !== 0);
        const WarmCurDegs = filteredCurtains
          .filter(c => c.attribute.startsWith("WarmCurtain"))
          .map(c => c.degree);
        const ShadeCurDegs = filteredCurtains
          .filter(c => c.attribute.startsWith("ShadeCurtain"))
          .map(c => c.degree);

        houseRef.current?.setCurtainsDegree(WarmCurDegs, ShadeCurDegs)
      }

    }
    co2SensorRef.current?.addDevices(co2Sensors);
    solarRadSensorRef.current?.addDevices(radiationSensors);
    windSensorRef.current?.addDevices(windSensors);
    rainSensorRef.current?.addDevices(rainSensors);
    circuratorFanRef.current?.addDevices(circuratorFans);
    exhaustFanRef.current?.addDevices(exhaustFans);
    co2PipeRef.current?.addDevices(co2Pipes);
    ledRef.current?.addDevices(leds);
    heaterRef.current?.addMultiDevices(heaters);
    plantRef.current?.addMultiDevices(plants);
    decoratedObjRef.current?.addMultiDevices(decoratedObjs);

    // if (sceneRef.current) {
    //   spriteManager = new SpriteManager(sceneRef.current.getScene(), co2Pipes)
    //   spriteRef.current = spriteManager
    // }

  };

  const tick = () => {
    rendererRef.current?.render()
    cameraControlerRef.current?.updateControler()
    outlineEffectRef.current?.render()

    // spriteRef.current?.updateSprites()
    // circuratorFanRef.current?.updateAnimationObjects() // CHECK
    // exhaustFanRef.current?.updateAnimationObjects() // CHECK

    requestId = requestAnimationFrame(tick)
  };

  const onWindowResize = () => {
    let canvasWidth: number = window.innerWidth;
    let canvasHeight: number = window.innerHeight;

    persCameraRef.current?.setAspect(canvasWidth, canvasHeight);
    rendererRef.current?.resize(canvasWidth, canvasHeight);
  };

  // const updateDeviceState = async (array: Device[] | DeviceWithSize[], co2Pipes: Device[]) => {
  //   const reqArray = [];
  //   for (const item of array) {
  //     if (item.deviceId && item.deviceId !== 0) {
  //       let object = {
  //         controller_id: Number(controllerValue),
  //         attribute: item.attribute,
  //         type_id: item.type_id,
  //         device_id: item.deviceId,
  //         place_type: item.place_type,
  //         loc_id: item.loc_id,
  //       };
  //       reqArray.push(object);
  //     }
  //   };

  //   const resStates = await getDeviceStateEveryMinute({ stateObjects: reqArray })

  //   if (resStates && resStates.length !== 0) {

  //     // fans // CHECK
  //     // resStates.forEach((item) => {
  //     //   if (item.type === "CircuratorFan") {
  //     //     circuratorFanRef.current?.updateFanAnimation(item.device_id, item.state)
  //     //   }
  //     //   if (item.type === "ExhaustFan") {
  //     //     exhaustFanRef.current?.updateFanAnimation(item.device_id, item.state)
  //     //   }
  //     // })

  //     // leds
  //     const ledStatesArr = resStates.filter((item) => item.type.startsWith("Led"));
  //     await waitSeconds(1);
  //     // ledRef.current?.toggleLedColor(ledStatesArr) // CHECK

  //     // windows
  //     const windowStateArray = resStates
  //       .filter(item => item.type.startsWith("Window"))
  //       .map(item => item.state);
  //     const winDegreeL = resStates.filter(item => item.type === "WindowLeft").map(item => item.state);
  //     const winDegreeR = resStates.filter(item => item.type === "WindowRight").map(item => item.state);
  //     await waitSeconds(1);
  //     houseRef.current?.setRoofDegree(windowStateArray);
  //     houseRef.current?.setLRWinDegree(winDegreeL[0], winDegreeR[0]);

  //   } else {
  //     console.error("cannot get respond data");
  //   }
  // };

  const waitSeconds = (second = 0) => {
    return new Promise(resolve => setTimeout(resolve, second * 1000))
  };

  useEffect(() => {

    initWorld();
    initObjects();
    tick();
    window.addEventListener("resize", onWindowResize); // リサイズ処理

    // updateDeviceState(stateCombinedArray, co2Pipes); // マウント時に状態を1回取得
    // const timer = setInterval(
    //   () => updateDeviceState(stateCombinedArray, co2Pipes),
    //   60000
    // ); // 1分ごとに状態を更新

    return () => {
      cancelAnimationFrame(requestId);
      // clearInterval(timer);
      window.removeEventListener("resize", onWindowResize);
      sceneRef.current?.terminate();
      skyBoxRef.current?.terminate();
      groundRef.current?.terminate();
      rendererRef.current?.terminate();
    }
  }, [Jsondata, has3D])

  useEffect(() => {
    if (changedFlag) {

      if (selectedDevice.attribute === "ExhaustFan") {
        exhaustFanRef.current?.updateFanAnimation(selectedDevice.deviceId, 1);
      };

      if (selectedDevice.attribute === "CircuratorFan") {
        circuratorFanRef.current?.updateFanAnimation(selectedDevice.deviceId, 1);
      };

      setChangedFlag(false);
    }
  }, [changedFlag])

  return (
    <div>
      <canvas id="glcanvas" />

      {/* {isSelected && (
        <HousePopup
          selectedDevice={selectedDevice}
          setChangedFlag={setChangedFlag}
        />
      )} */}
    </div>
  )
}
