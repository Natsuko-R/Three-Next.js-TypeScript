import { deviceInfo } from "@/actions/get-model-data";
import { Scene, Object3D, Group } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ResourceTracker } from "./ResourceTracker";

export default class ObjectManager {

	protected targetScene: Scene;
	public objectArr: Object3D[]

	public constructor(scene: Scene) {
		this.targetScene = scene;
		this.objectArr = []
	}

	public async addSceneByArray(array: deviceInfo[]): Promise<any> {

		if (!array || array.length === 0) return null
		try {
			const resTracker = new ResourceTracker();
			const track = resTracker.track.bind(resTracker)

			const gltf = await this.loadGltfModel("/model/HeatPump.glb");
			const baseModel = track(gltf.scene)
			baseModel.scale.set(30, 30, 30)
			console.log("HeatPump : succeeded on loading ");

			for (let i = 0; i < array.length; i++) {
				const model: Object3D = baseModel.clone();
				model.position.set(array[i].posX, array[i].posY, array[i].posZ);
				model.rotation.y = array[i].rotY * (Math.PI / 180);

				model.traverse(child => {
					child.userData.attribute = "HeatPump"
				});
				model.name = "HeatPump"

				this.targetScene.add(model);
				this.objectArr.push(model);
			}

			return resTracker

		} catch (error) {
			console.error("HeatPumpManager: failed on loading ");
			return null;
		}
	}

	public loadGltfModel(path: string): Promise<GLTF> {
		return new Promise((resolve, reject) => {
			const loader = new GLTFLoader();
			loader.load(
				path,
				(gltf) => {
					resolve(gltf);
				},
				undefined,
				(error) => {
					reject(error);
				}
			);
		});
	}

}
