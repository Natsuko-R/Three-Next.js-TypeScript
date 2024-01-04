import { useEffect, useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmbientLight, AxesHelper, BufferGeometry, CircleGeometry, DirectionalLight, Group, Line, LineBasicMaterial, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Raycaster, Scene, Texture, TextureLoader, Vector2, Vector3, WebGLCubeRenderTarget, WebGLRenderer } from "three"
import ObjectManager from "./ObjectManager";
import ObjectControler from "./ObjectControler"
import { useJsonDataStore } from "../hooks/useJsonDataStore";

export const PlayCanvas = () => {
  let scene: Scene
  let camera: PerspectiveCamera
  let renderer: WebGLRenderer
  let textureLoader: TextureLoader = new TextureLoader()
  let skyBoxTexture: Texture
  let groundTexture: Texture
  let orbitControl: OrbitControls
  let objectControler: ObjectControler
  let objectManager: ObjectManager
  let requestId: number

  const { JsonData: LocalData } = useJsonDataStore() // Local 3D Data  

  //-----------------------------------------------------------------------------//
  // refの宣言
  //-----------------------------------------------------------------------------//
  const sceneRef = useRef<Scene>()
  const cameraRef = useRef<PerspectiveCamera>()
  const objectControlerRef = useRef<ObjectControler>()

  const initWorld = () => {

    let canvasWidth: number = window.innerWidth
    let canvasHeight: number = window.innerHeight

    // scene

    scene = new Scene()
    sceneRef.current = scene

    // camera

    camera = new PerspectiveCamera(30, canvasWidth / canvasHeight, 10, 2500);
    camera.position.set(-1500, 300, -3000)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // light

    scene.add(new DirectionalLight(0xffffff, 2.5))
    scene.add(new AmbientLight(0xffffff, 3))

    // renderer

    renderer = new WebGLRenderer({
      canvas: document.querySelector("#glcanvas") as HTMLCanvasElement,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x2A2A2A, 1)

    // sky box
    skyBoxTexture = textureLoader.load('/images/sky_01.jpg', (item) => {
      const renderTarget = new WebGLCubeRenderTarget(item.image.height);
      renderTarget.fromEquirectangularTexture(renderer, item);
      scene.background = renderTarget.texture;
      // console.log("SkyBoxManager : succeeded on loading " + '/images/sky_01.jpg');
    }, undefined, () => {
      console.error("SkyBoxManager : failed on loading " + '/images/sky_01.jpg');
    });
    // ground
    groundTexture = textureLoader.load('/images/ground_01.jpg', (item) => {
      const ground = new Mesh(
        new CircleGeometry(1000, 1000),
        new MeshStandardMaterial({ map: item })
      )
      ground.name = "ground"
      ground.position.set(0, -0.05, 0)
      ground.rotateX(-0.5 * Math.PI)
      scene.add(ground)
      // console.log("GroundManager : succeeded on loading ");
    }, undefined, () => {
      console.log("GroundManager : failed on loading ");
    })

    // controler

    orbitControl = new OrbitControls(camera, renderer.domElement);
    orbitControl.enableDamping = true
    orbitControl.dampingFactor = 0.1
    orbitControl.maxDistance = 1500
    orbitControl.maxPolarAngle = 0.475 * Math.PI
    orbitControl.update()

    // axesHelper

    const axesHelper = new AxesHelper(1000);
    axesHelper.position.set(0, 1, 0)
    scene.add(axesHelper);

    objectControler = new ObjectControler(camera, scene, renderer)

  }

  const tick = () => {

    requestId = requestAnimationFrame(tick)

    objectControler.composer.render()

    orbitControl.update()

    renderer.render(scene, camera)

  }

  const waitSeconds = (second = 0) => {

    return new Promise(resolve => setTimeout(resolve, second * 1000))

  }

  const initObject = async () => {
    if (!sceneRef.current) return
    if (!LocalData) return

    const heatPumpManager = new ObjectManager(sceneRef.current)
    await heatPumpManager.addSceneByArray(LocalData.heatPumps)

    await waitSeconds(1)
    heatPumpManager.objectArr.length = 0
    console.log("scene after created", sceneRef.current);
    await waitSeconds(1)
  }

  const onWindowResize = () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera)
  }

  useEffect(() => {

    initWorld()
    tick()
    window.addEventListener("resize", onWindowResize) // リサイズ処理

    return () => {
      cancelAnimationFrame(requestId)
      window.removeEventListener("resize", onWindowResize)
      scene.traverse(child => {
        if (child instanceof Mesh) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material?.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      // scene.clear()
      skyBoxTexture.dispose()
      groundTexture.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {

    initObject()

    console.log("LocalData", LocalData);


  }, [LocalData])

  return <canvas id="glcanvas" />
}
