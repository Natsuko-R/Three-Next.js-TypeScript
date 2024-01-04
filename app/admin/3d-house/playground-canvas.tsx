import { useEffect, useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useJsonDataStore } from "./hooks/useJsonDataStore"
import { AmbientLight, AxesHelper, CircleGeometry, DirectionalLight, Group, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Raycaster, Scene, Texture, TextureLoader, Vector2, Vector3, WebGLCubeRenderTarget, WebGLRenderer } from "three"
import { Device } from "@/actions/get-3d-data"
import ObjectManager from "./components/ObjectManager";
import ObjectControler from "./components/ObjectControler"
import { useRenderFlagStore } from "./hooks/useRenderFlagStore"

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
  let canvasWidth: number = window.innerWidth
  let canvasHeight: number = window.innerHeight

  const { JsonData: LocalData } = useJsonDataStore() // Local 3D Data  

  //-----------------------------------------------------------------------------//
  // refの宣言
  //-----------------------------------------------------------------------------//
  const sceneRef = useRef<Scene>()
  const cameraRef = useRef<PerspectiveCamera>()
  const objectControlerRef = useRef<ObjectControler>()

  const initWorld = () => {

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
      console.log("SkyBoxManager : succeeded on loading " + '/images/sky_01.jpg');
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
      console.log("GroundManager : succeeded on loading ");
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

    // outline effect

    // outlinePass = new OutlinePass(new Vector2(canvasWidth, canvasHeight), scene, camera);
    // outlinePass.selectedObjects = []
    // outlinePass.edgeStrength = 6;
    // outlinePass.edgeThickness = 4;
    // outlinePass.visibleEdgeColor.set('#ff0000');
    // outlinePass.hiddenEdgeColor.set('#ff0000');
    // const renderPass = new RenderPass(scene, camera);
    // composer = new EffectComposer(renderer);
    // composer.addPass(renderPass);
    // composer.addPass(outlinePass);

    // outlinePassRef.current = outlinePass

    objectControler = new ObjectControler(camera, scene, renderer)

  }

  const tick = () => {

    requestId = requestAnimationFrame(tick)

    objectControler.composer.render()

    orbitControl.update()

    renderer.render(scene, camera)

  }

  const initObject = async () => {
    if (!sceneRef.current) return
    if (!LocalData) return

    console.log("before removed", sceneRef.current.children);

    sceneRef.current?.children.forEach(item => {
      if (item.name === 'HeatPumpOld') {
        // console.log("removed children", item);

        item.traverse(child => {
          if(child instanceof Mesh){
            child.geometry?.dispose()

            if(child.material){
                if(Array.isArray(child.material)){
                    child.material.forEach(material => material.dispose());
                }else{
                    child.material.dispose();
                }
            }
        }
        })

        sceneRef.current?.remove(item)
      }
    })

    const heatPumpManager = new ObjectManager(sceneRef.current)
    const result = await heatPumpManager.addSceneByArray(LocalData.heatPumps)
    if (!result || result.length === 0) return
    console.log("after created", result);

    result.forEach(item => {

      if(item.name === "HeatPump"){
        item.name = 'HeatPumpOld';
      }
      
    });

    console.log("after change name", sceneRef.current.children);

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
      scene.clear()
      skyBoxTexture.dispose()
      groundTexture.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {

    initObject()

  }, [LocalData])

  return <canvas id="glcanvas" />
}




// const array: Object3D[] = [];
// const point: Vector3 = new Vector3(100, 100, 100);



// console.log("children Elements:", array);