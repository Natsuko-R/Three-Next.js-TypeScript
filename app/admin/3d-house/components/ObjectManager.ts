import { Device } from "@/actions/get-3d-data";
import { Scene, Object3D, Group } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class ObjectManager {

	protected targetScene: Scene;

	public constructor(scene: Scene) {
		this.targetScene = scene;
	}

	public async addSceneByArray(array: Device[]): Promise<Object3D[]> {
		// console.log("targetScene", this.targetScene.children);

		if (!array || array.length === 0) return []
		try {
			const gltf = await this.loadGltfModel("/models/HeatPump.glb");
			const baseModel = gltf.scene
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
			}

			return this.targetScene.children

		} catch (error) {
			console.error("HeatPumpManager: failed on loading ");
			return [];
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
