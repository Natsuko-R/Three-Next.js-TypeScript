import { Object3D, Scene } from "three";
import ObjectManager from "./object-manager/ObjectManager";

const MODEL_PATH: string = "/model/basewall.glb"
const MODEL_SCALE: number = 100

export default class WallManager extends ObjectManager {

    public constructor(scene: Scene) {
        super(scene)

        this.modelPath = MODEL_PATH
        this.modelScale = MODEL_SCALE
    }

    public getWallObjects(): Object3D[] {
        return this.children;
    }
}