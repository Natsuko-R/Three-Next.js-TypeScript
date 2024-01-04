import { useEffect } from 'react';
import THREE, { AmbientLight, BoxGeometry, Color, DirectionalLight, DirectionalLightHelper, GridHelper, Mesh, MeshBasicMaterial, MeshLambertMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const PlayCanvas = () => {
  let camera: PerspectiveCamera
  let scene: Scene
  let renderer: WebGLRenderer;
  let plane: Mesh;
  let raycaster: Raycaster
  let isShiftDown: boolean = false;
  let pointer = new Vector2();
  let rollOverMesh: Mesh
  let rollOverMaterial: MeshBasicMaterial;
  let cubeGeo: BoxGeometry
  let cubeMaterial: MeshLambertMaterial;
  const objects: Object3D[] = [];

  useEffect(() => {

    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(500, 800, 1300);
    camera.lookAt(0, 0, 0);

    scene = new Scene();
    scene.background = new Color(0xf0f0f0);

    const loader = new GLTFLoader();

    loader.load('/models/CO2Sensor.glb', function (gltf) {

      scene.add(gltf.scene);

    }, undefined, function (error) {

      console.error(error);

    });

    console.log("scene.children", scene.children);


    // plane

    const geometry = new PlaneGeometry(1000, 1000);
    geometry.rotateX(- Math.PI / 2);
    plane = new Mesh(geometry, new MeshBasicMaterial());
    plane.name = "plane"
    scene.add(plane);

    const ambientLight = new AmbientLight(0x606060, 3);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, -0.5).normalize(); // 指定光源的位置
    scene.add(directionalLight);

    window.addEventListener('resize', onWindowResize);

    // renderer
    renderer = new WebGLRenderer({
      canvas: document.querySelector("#glcanvas") as HTMLCanvasElement,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls( camera, renderer.domElement )  
    controls.update()
      
    render();
  }, []);

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  return <canvas id="glcanvas" />;
};
