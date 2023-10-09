import GroundManager from "@/components/three/bg/GroundManager"
import SkyBoxManager from "@/components/three/bg/SkyBoxManager"
import PerspectiveCameraManager from "@/components/three/camera/PerspectiveCameraManager"
import AmbientLightManager from "@/components/three/light/AmbientLightManager"
import DirectionalLightManager from "@/components/three/light/DirectionalLightManager"
import RendererManager from "@/components/three/renderer/RendererManager"
import SceneManager from "@/components/three/scene/SceneManager"
import CameraControler from "@/components/three/controler/CameraControler"
import ObjectControler from "@/components/three/controler/ObjectControler"

import LedManager from "@/components/three/object/LedManager"
import WaterTankManager from "@/components/three/object/WaterTankManager"
import WallManager from "@/components/three/object/WallManager"
import FanManager from "@/components/three/object/FanManager"
import SpriteManager from "@/components/three/object/SpriteManager"

import { useEffect, useRef, useState } from "react"
import { useModelDataStore } from "../hooks/useModelDataStore"
import { deviceInfo, getModelData } from "@/actions/get-model-data"
import { Object3D } from "three"

export const Canvas = () => {

    const [ledsArray, setledsArray] = useState<Object3D[]>([])

    const fanRef = useRef<FanManager>()
    const ledRef = useRef<LedManager>()

    const { data: ModelJsonData } = useModelDataStore()

    useEffect(() => {
        const init = async () => {
            if (!ModelJsonData) return

            let requestId: number
            let sceneManager: SceneManager
            let rendererManager: RendererManager
            let perspectiveCameraManager: PerspectiveCameraManager
            let directionalLightManager: DirectionalLightManager
            let ambientLightManager: AmbientLightManager
            let skyBoxManager: SkyBoxManager
            let groundManager: GroundManager
            let cameraControler: CameraControler
            let objectControler: ObjectControler

            let ledManager: LedManager
            let wallManager: WallManager
            let waterTankManager: WaterTankManager
            let fanManager: FanManager
            let spriteManager: SpriteManager

            let walls: deviceInfo[] = ModelJsonData.walls
            let waterTanks: deviceInfo[] = ModelJsonData.waterTanks
            let fans: deviceInfo[] = ModelJsonData.fans
            let leds: deviceInfo[] = ModelJsonData.leds
            let ledsStatesArr = ModelJsonData.states.map(value => value === 1)

            updateSpriteState() // 初始化时执行一次
            initWorld()
            try {
                await initObjects();
            } catch (error) {
                console.error("初始化对象时出现错误：", error);
                return;
            }
            initControler()
            tick()

            window.addEventListener("resize", resize)

            const timer = setInterval(async () => {
                await updateSpriteState()
            }, 5000)

            async function updateSpriteState() {

                const { data } = await getModelData()
                const spriteStates = (data?.states.map(value => value === 1)) as boolean[]

                console.log("定时器执行一次: ", spriteStates);

                spriteManager.initSprite(spriteStates)
                ledManager.toggleLedColor(ledManager.getLeds())

            }

            function initWorld() {
                let canvasWidth: number = window.innerWidth
                let canvasHeight: number = window.innerHeight

                sceneManager = new SceneManager()

                perspectiveCameraManager = new PerspectiveCameraManager(canvasWidth, canvasHeight, sceneManager.getScene())

                directionalLightManager = new DirectionalLightManager(sceneManager.getScene())
                ambientLightManager = new AmbientLightManager(sceneManager.getScene())

                rendererManager = new RendererManager(canvasWidth, canvasHeight, sceneManager.getScene(), perspectiveCameraManager.getCamera())

                skyBoxManager = new SkyBoxManager(sceneManager.getScene(), rendererManager.getRenderer())
                skyBoxManager.addSkyBox()
                groundManager = new GroundManager(sceneManager.getScene())
                groundManager.addGround()

            }

            async function initObjects() {
                // 创建各个管理器实例
                ledManager = new LedManager(sceneManager.getScene())
                waterTankManager = new WaterTankManager(sceneManager.getScene())
                wallManager = new WallManager(sceneManager.getScene())
                fanManager = new FanManager(sceneManager.getScene())
                spriteManager = new SpriteManager(sceneManager.getScene())

                try {
                    await Promise.all([
                        waterTankManager.addSceneByArray(waterTanks),
                        wallManager.addSceneByArray(walls),
                        fanManager.addFans(fans),
                        ledManager.addLeds(leds, ledsStatesArr)
                    ])
                    initRef()

                    // const LedsArray = ledManager.getLeds();
                    // setledsArray(LedsArray)

                    return Promise.resolve();
                } catch (error) {
                    // 处理错误
                    console.error("初始化对象时出现错误：", error);
                    return Promise.reject(error);
                }
            }

            function initRef() {
                fanRef.current = fanManager;
                ledRef.current = ledManager
            }

            function initControler() {
                cameraControler = new CameraControler(perspectiveCameraManager.getCamera())
                objectControler = new ObjectControler(perspectiveCameraManager.getCamera(), sceneManager.getScene())

                // objectControler.checkIntersects({ setSelectedAttr, setSelectedObjId, setOperateFlag })
            }

            function tick() {

                rendererManager.render()

                spriteManager.emitSprite()

                fanManager.updateAnimationObjects()

                cameraControler.updateControler()

                requestId = requestAnimationFrame(tick)
            }

            function resize() {

                let canvasWidth: number = window.innerWidth
                let canvasHeight: number = window.innerHeight

                rendererManager?.resize(canvasWidth, canvasHeight);
                perspectiveCameraManager?.setAspect(canvasWidth, canvasHeight);

            }

            // unmounted the component
            return () => {
                cancelAnimationFrame(requestId)

                sceneManager.terminate()
                skyBoxManager.terminate()
                groundManager.terminate()
                rendererManager.terminate()

                clearInterval(timer)

            }
        }

        init()
    }, [ModelJsonData])

    // useEffect(() => {
    //     if (ledsArray) {
    //         ledRef.current?.toggleLedColor(ledsArray)
    //     }
    // }, [ledsArray])

    // const timeoutId = setTimeout(() => {
    //     // const LedsArray = ledManager.getLeds();
    //     // console.log(LedsArray);

    //     // setledsArray(LedsArray);

    //     // 清除定时器
    //     clearTimeout(timeoutId);
    // }, 1000);

    return <canvas id="glcanvas" />

}

