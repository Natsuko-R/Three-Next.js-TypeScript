import { useEffect, useRef } from "react"
import { AmbientLight, BoxGeometry, Color, DirectionalLight, GridHelper, MathUtils, Mesh, MeshLambertMaterial, OrthographicCamera, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';


export const PlayCanvas = () => {
  let renderer: WebGLRenderer
  let cameraPersp: PerspectiveCamera
  let cameraOrtho: OrthographicCamera
  let currentCamera: any;
  let scene: Scene
  let orbit: OrbitControls
  let control: TransformControls

  const initWorld = () => {
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const aspect = window.innerWidth / window.innerHeight;

    cameraPersp = new PerspectiveCamera(50, aspect, 0.01, 30000);
    cameraOrtho = new OrthographicCamera(- 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000);
    currentCamera = cameraPersp;

    currentCamera.position.set(5, 2.5, 5);

    scene = new Scene()
    scene.background = new Color("lightblue")
    scene.add(new GridHelper(5, 10, 0x888888, 0x444444))

    const ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);

    const light = new DirectionalLight(0xffffff, 4);
    light.position.set(1, 1, 1);
    scene.add(light);

    orbit = new OrbitControls(currentCamera, renderer.domElement);
    orbit.update();
    orbit.addEventListener('change', render);

    control = new TransformControls(currentCamera, renderer.domElement);
    control.addEventListener('change', render);
    control.addEventListener('dragging-changed', function (event) {
      orbit.enabled = !event.value;
    });


    const texture = new TextureLoader().load('texture/sprite.png', render);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({ map: texture });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    control.attach(mesh);
    control.setMode("translate")

    scene.add(control);


  }

  const render = () => {

    renderer.render(scene, currentCamera)

  }

  useEffect(() => {

    initWorld()
    render()

    return () => {
    }
  }, [])

  return <canvas id="glcanvas" />
}
