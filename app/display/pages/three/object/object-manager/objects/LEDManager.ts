import { Scene } from "three";
import ObjectManager from "../ObjectManager";

const PATH_MODEL: string = "/models/Led.glb";
const SCALE_MODEL: number = 50;

export default class LEDManager extends ObjectManager {

	public constructor(scene: Scene) {
		super(scene);

		this.pathModel = PATH_MODEL;
		this.scaleModel = SCALE_MODEL;
	}

}
