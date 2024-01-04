import { useEffect, useRef } from "react"
import SceneManager from "@/components/three/scene/SceneManager"
import GroundManager from "@/components/three/bg/GroundManager"
import SkyBoxManager from "@/components/three/bg/SkyBoxManager"
import PerspectiveCameraManager from "@/components/three/camera/PerspectiveCameraManager"
import AmbientLightManager from "@/components/three/light/AmbientLightManager"
import DirectionalLightManager from "@/components/three/light/DirectionalLightManager"
import RendererManager from "@/components/three/renderer/RendererManager"
import CameraControler from "@/components/three/controler/CameraControler"
import ObjectControler from "@/components/three/controler/ObjectControler"
import OutlineEffect from "@/components/three/posteffect/OutlineEffect"

export const HouseCanvas = () => {

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
  let cameraControler: CameraControler
  let objectControler: ObjectControler
  let outlineEffect: OutlineEffect


  //-----------------------------------------------------------------------------//
  // refの宣言
  //-----------------------------------------------------------------------------//
  const sceneRef = useRef<SceneManager>()
  const rendererRef = useRef<RendererManager>()
  const persCameraRef = useRef<PerspectiveCameraManager>()
  const cameraControlerRef = useRef<CameraControler>()
  const outlineEffectRef = useRef<OutlineEffect>()

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
    groundManager.addGround()

    // ポストエフェクトの作成
    outlineEffect = new OutlineEffect(
      rendererManager.getRenderer(),
      sceneManager.getScene(),
      persCameraManager.getCamera()
    )
    outlineEffectRef.current = outlineEffect

    // カメラコントローラの作成
    cameraControler = new CameraControler(persCameraManager.getCamera())
    cameraControlerRef.current = cameraControler

    objectControler = new ObjectControler(
      persCameraManager.getCamera(),
      sceneManager.getScene()
    )

  }

  const tick = () => {

    rendererRef.current?.render()

    outlineEffectRef.current?.render()

    cameraControlerRef.current?.updateControler()

    requestId = requestAnimationFrame(tick)

  }

  const resize = () => {

    // ウィンドウサイズの取得
    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    persCameraRef.current?.setAspect(canvasWidth, canvasHeight)
    rendererRef.current?.resize(canvasWidth, canvasHeight)

  }

  useEffect(() => {

    initWorld()
    tick()
    window.addEventListener("resize", resize) // リサイズ処理

    // コンポーネントのアンマウント時
    return () => {

      cancelAnimationFrame(requestId)
      window.removeEventListener("resize", resize)
      sceneManager.terminate()
      skyBoxManager.terminate()
      groundManager.terminate()
      rendererManager.terminate()

    }
  }, [])

  return <canvas id="glcanvas" />
}
