import { Scene, Object3D } from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import ObjectData from "../object-data/ObjectData"
import { deviceInfo as Device } from "@/actions/get-model-data"

export default class ObjectManager {
    protected targetScene: Scene
    protected loader: GLTFLoader
    protected modelPath: string
    protected modelScale: number
    protected baseModel: Object3D
    protected children: Object3D[]

    public constructor(scene: Scene) {
        this.targetScene = scene
        this.loader = new GLTFLoader()
        this.modelPath = ""
        this.modelScale = 1
        this.baseModel = new Object3D()
        this.children = []
    }

    public addSceneByArray(array: Device[]) {
        if (!array || array.length === 0) return

        this.loader.load(
            this.modelPath,
            (gltf: GLTF) => {
                this.baseModel = gltf.scene
                this.baseModel.scale.set(this.modelScale, this.modelScale, this.modelScale)

                // console.log(" ObjectManager : succeeded on loading " + this.modelPath + " and the baseModel created.")

                for (let i = 0; i < array.length; i++) {
                    const model: Object3D = this.baseModel.clone()

                    const objectData = new ObjectData(model, array[i].deviceId, array[i].deviceName)
                    model.traverse(child => child.userData = objectData)

                    model.position.set(array[i].posX, array[i].posY, array[i].posZ)
                    model.rotateY(array[i].rotY * (Math.PI / 180)) // 一个完整的圆（360度）对应的弧度是 2 * Math.PI 弧度。要将角度从度转换为弧度，只需将角度值乘以 (Math.PI / 180)

                    this.targetScene.add(model)
                    this.children.push(model)
                }
            },
            undefined,
            () => {
                console.log(" GroundManager : failed on loading " + this.modelPath)
                // return
            }
        )
    }

    public addChild(object: Object3D) {
        this.children.push(object)
    }

    public getChildByDeviceId(deviceId: number) {

        // 子要素の配列を0から最後尾まで走査
        for (let i = 0; i < this.children.length; i++) {

            // 子要素のobjIdが引数のobjIdと同じ場合
            if (this.children[i].userData.deviceId === deviceId) {

                const object: Object3D = this.children[i];

                // オブジェクトを返却
                return object;
            };
        };

    }

    public terminate() {
        this.children.splice(0)
    }
}