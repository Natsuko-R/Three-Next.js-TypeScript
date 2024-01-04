import { Object3D, Scene, Camera, Raycaster, Vector2, Intersection, Group, WebGLRenderer } from "three";
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

const CANVAS_NAME: string = "#glcanvas";

export default class ObjectControler {

    private targetScene: Scene;
    private targetCamera: Camera;
    private targetCanvas: HTMLCanvasElement;
    public composer: EffectComposer

    public constructor(camera: Camera, targetScene: Scene, renderer: WebGLRenderer) {

        this.targetScene = targetScene;

        this.targetCamera = camera;

        this.targetCanvas = document.querySelector(CANVAS_NAME) as HTMLCanvasElement;

        const outlinePass = new OutlinePass(new Vector2(this.targetCanvas.width, this.targetCanvas.height), targetScene, camera);
        outlinePass.edgeStrength = 10;
        outlinePass.edgeThickness = 10;
        outlinePass.visibleEdgeColor.set('#ff0000');
        outlinePass.hiddenEdgeColor.set('#ff0000');

        const renderPass = new RenderPass(targetScene, camera);

        this.composer = new EffectComposer(renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(outlinePass);
        if (outlinePass) {
            this.checkIntersects(outlinePass)
        }

    }

    public checkIntersects(outlinePass: OutlinePass) {

        const raycaster: Raycaster = new Raycaster();
        const mousePos: Vector2 = new Vector2();

        this.targetCanvas.addEventListener('click', (event) => {

            const rect = this.targetCanvas.getBoundingClientRect(); // 考虑了画布的位置偏移
            raycaster.setFromCamera(mousePos, this.targetCamera);

            mousePos.x = (event.clientX - rect.left) / this.targetCanvas.width * 2.0 - 1.0;
            mousePos.y = -(event.clientY - rect.top) / this.targetCanvas.height * 2.0 + 1.0;

            const intersects: Intersection[] = raycaster.intersectObjects(this.targetScene.children, true).filter(obj =>
                obj.object.parent?.parent?.userData.attribute === "HeatPump"
            )

            if (intersects.length > 0) {
                
                const targetObject = intersects[0].object.parent?.parent!
                const selectedObjects: Object3D[] = [targetObject];

                targetObject.scale.set(35, 35, 35)

                outlinePass.selectedObjects = selectedObjects

                // console.log("targetObject:", targetObject);
                // console.log("outlinePass : ", outlinePass);
                // console.log("outlinePass.selectedObjects : ", outlinePass.selectedObjects);


            }
            else {

                outlinePass.selectedObjects = [];
            }

        });
    }

}