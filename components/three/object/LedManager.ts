import { Scene, Object3D, MeshStandardMaterial, Mesh } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectManager from "./object-manager/ObjectManager";
import { deviceInfo as Device } from "@/actions/get-model-data"

const PATH_MODEL: string = "/model/Led.glb"
const SCALE_MODEL: number = 100;

export default class LedManager extends ObjectManager {

    public baseMaterial: MeshStandardMaterial
    public colorMaterial: MeshStandardMaterial
    public LedArray: Object3D[]
    public LedOperateFlag: Boolean

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

        // 全体で制御する場合の稼働状況
        this.LedOperateFlag = false;

    }

    public async addLeds(array: Device[], states: boolean[]) {

        if (!array || array.length === 0) return
        try {
            const gltf = await this.loadGltfModel(PATH_MODEL)

            this.baseModel = gltf.scene;
            this.baseModel.scale.set(SCALE_MODEL, SCALE_MODEL, SCALE_MODEL * 7);

            for (let i = 0; i < array.length; i++) {
                const model: Object3D = this.baseModel.clone();
                model.position.set(array[i].posX, array[i].posY, array[i].posZ);
                model.rotation.y = array[i].rotY * (Math.PI / 180);

                model.children.forEach(item => {
                    item.traverse(child => {
                        child.userData.operateFlag = states[i]
                    })
                })

                this.targetScene.add(model);
                this.children.push(model);
            }

        } catch (error) {
            console.error("LedManager: failed on loading " + PATH_MODEL);
        }
    }

    public toggleLedColor(array: Object3D[]) {

        array.forEach(object => {
            object.traverse(child => {
                if (child instanceof Mesh && (child.name === "right" || child.name === "left") && child.userData.operateFlag) {
                    child.material = this.colorMaterial;
                }
            });
        });


    }


    public getLeds() {
        return this.children
    }

    // https://itnext.io/promise-loading-with-three-js-78a6297652a5
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