import { Scene, Object3D, MeshStandardMaterial, Mesh } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectManager from "../object-manager/ObjectManager";
import { DeviceWithSize } from "@/actions/get-3d-data";
import ObjectData from "./ObjectData";

const PATH_MODEL: string = "/models/Led.glb"
const SCALE_MODEL: number = 50;

export default class LEDManager extends ObjectManager {

    public baseMaterial: MeshStandardMaterial
    public colorMaterial: MeshStandardMaterial
    public LedArray: Object3D[]

    public constructor(scene: Scene) {

        super(scene);

        // 元のマテリアル
        this.baseMaterial = new MeshStandardMaterial({
            color: 0xffffff, // ベースカラー
            emissive: 0xdcdcdc, // 発光色
            emissiveIntensity: 1, // 発光強度
            roughness: 0, // 表面のざらつき
            metalness: 1 // 金属度合い
        });

        // 稼働時用マテリアル
        this.colorMaterial = new MeshStandardMaterial({
            color: 0xff0000, // ベースカラー
            emissive: 0xff0080, // 発光色
            emissiveIntensity: 10, // 発光強度
            roughness: 0, // 表面のざらつき
            metalness: 1 // 金属度合い
        });

        this.LedArray = [];

        this.pathModel = PATH_MODEL
        this.scaleModel = SCALE_MODEL

    }

    public async addSceneByArray(array: DeviceWithSize[]): Promise<Object3D[]> {
        if (!array || array.length === 0) return [];

        try {
            const gltf = await this.loadGltfModel(this.pathModel);
            this.baseModel = gltf.scene;

            for (let i = 0; i < array.length; i++) {
                const model: Object3D = this.baseModel.clone();
                model.name = array[i].attribute

                model.scale.set(this.scaleModel, this.scaleModel, this.scaleModel * array[i].size)
                model.position.set(array[i].posX, array[i].posY, array[i].posZ);
                model.rotation.y = array[i].rotY * (Math.PI / 180);

                model.userData.attribute = array[i].attribute
                model.userData.deviceId = array[i].deviceId

                this.targetScene.add(model);
                this.LedArray.push(model);
            }

            return this.LedArray; 

        } catch (error) {
            console.error("LedManager: failed on loading " + PATH_MODEL);
            return [];
        }
    }

    public toggleLedColor(ledStates: any[]) {
        if (!this.LedArray || this.LedArray.length === 0) return;        

        this.LedArray.forEach(ledModel => {
            ledModel.traverse(model => {
                ledStates.forEach(stateItem => {
                    if (
                        model.userData.attribute == stateItem.type &&
                        model.userData.deviceId == stateItem.device_id &&
                        stateItem.state == 1
                    ) {
                        model.traverse(child => { if (child instanceof Mesh) { child.material = this.colorMaterial; } })
                    }
                });
            });
        });
    }

    loadGltfModel(path: string): Promise<GLTF> {
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


