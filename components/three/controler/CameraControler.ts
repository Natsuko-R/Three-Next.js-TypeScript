import { Camera } from "three";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";

const CANVAS_NAME: string = "#glcanvas";
const ZOOM_DISTANCE: number = 1000;
const FOCUS_DISTANCE: number = 500;

export default class CameraControler {

    private targetCamera: Camera;
    private targetCanvas: HTMLCanvasElement;
    private controler: MapControls;

    public constructor(camera: Camera) {

        this.targetCamera = camera;

        this.targetCanvas = document.querySelector(CANVAS_NAME) as HTMLCanvasElement;

        this.controler = new MapControls(this.targetCamera, this.targetCanvas);

        this.controler.enableDamping = true;
        this.controler.dampingFactor = 0.1;

        this.controler.maxDistance = ZOOM_DISTANCE;
        this.controler.maxPolarAngle = 0.475 * Math.PI;

        this.controler.addEventListener('change', () => {

            const focusPosition = this.controler.target;

            if (focusPosition.x < -FOCUS_DISTANCE) {
                focusPosition.x = -FOCUS_DISTANCE;
            } else if (focusPosition.x > FOCUS_DISTANCE) {
                focusPosition.x = FOCUS_DISTANCE;
            }

            if (focusPosition.z < -FOCUS_DISTANCE) {
                focusPosition.z = -FOCUS_DISTANCE;
            } else if (focusPosition.z > FOCUS_DISTANCE) {
                focusPosition.z = FOCUS_DISTANCE;
            }

        });

    };

    public updateControler() {

        this.controler.update();
    };
}