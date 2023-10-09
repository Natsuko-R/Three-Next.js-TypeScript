import { Object3D, Scene } from "three";
import ObjectManager from "./object-manager/ObjectManager";

const MODEL_PATH: string = "/model/watertank.glb"
const MODEL_SCALE: number = 50

export default class WaterTankManager extends ObjectManager {

    public constructor(scene: Scene) {
        super(scene)

        this.modelPath = MODEL_PATH
        this.modelScale = MODEL_SCALE
    }

    public getWaterTankObjects(): Object3D[] {
        return this.children
    }

    public changeColor() {

        for (let i = 0; i < this.children.length; i++) {
            console.log(this.children[i]);

            this.children[i].traverse(child => {
                console.log(child);
            })
        }
    }
}