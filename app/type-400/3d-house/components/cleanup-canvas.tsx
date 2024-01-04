"use client"
import { useEffect, useState } from "react"
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three"
import { ResourceTracker } from "./ResourceTracker";

export const CleanupCanvas = () => {

  const [isMount, setIsMount] = useState(false)

  let scene: Scene
  let camera: PerspectiveCamera
  let renderer: WebGLRenderer
  let textureLoader: TextureLoader = new TextureLoader()
  let canvasWidth: number = window.innerWidth
  let canvasHeight: number = window.innerHeight
  const cubes: Object3D[] = []; // an array to rotate the cubes

  const main = () => {
    // scene
    scene = new Scene()

    // renderer
    renderer = new WebGLRenderer({
      canvas: document.querySelector("#glcanvas") as HTMLCanvasElement,
      antialias: true
    });
    renderer.setSize(canvasWidth, canvasHeight);

    // camera
    camera = new PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.z = 2;

    const addToScene = () => {

      const resTracker = new ResourceTracker();
      const track = resTracker.track.bind(resTracker)

      const geometry = track(new BoxGeometry(1, 1, 1))
      const texture = textureLoader.load('/images/ground_01.jpg')
      const material = track(new MeshBasicMaterial({ map: track(texture) }))
      const cube = track(new Mesh(geometry, material))
      cube.name = "cube"
      scene.add(cube)
      cubes.push(cube)

      console.log("scene", scene);
      console.log("cubes", cubes);

      return resTracker
    }

    const waitSeconds = (second = 0) => {

      return new Promise(resolve => setTimeout(resolve, second * 1000))

    }

    const process = async () => {

      // https://flexiple.com/javascript/infinite-loops-javascript
      for (; ;) {
        const resTracker = addToScene()
        await waitSeconds(5)

        cubes.length = 0 // remove the cubes

        // 
        resTracker.dispose()

        await waitSeconds(1)
      }

    }

    process()

    const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {

      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {

        renderer.setSize(width, height, false);

      }

      return needResize;
    }

    const render = (time: number) => {

      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

      }

      cubes.forEach((cube, ndx) => {

        const speed = .2 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;

      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

  }

  useEffect(() => {

    isMount && main()

    setIsMount(true)

    return () => {
      scene?.traverse(child => {
        if (child instanceof Mesh) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material?.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      scene?.clear()
      renderer?.dispose()
    }

  }, [isMount])

  if (!isMount) return null

  return <canvas id="glcanvas" />
}
