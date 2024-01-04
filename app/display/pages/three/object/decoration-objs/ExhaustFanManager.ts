import { AnimationAction, AnimationMixer, Clock, LoopRepeat, Object3D, Scene } from "three";
import AnimationObjectManager from "./AnimationObjectManager";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectData from "./ObjectData";
import { Device } from "@/actions/get-3d-data";

//-----------------------------------------------------------------------------//
// 定数 || const
//-----------------------------------------------------------------------------//
const PATH_MODEL: string = "/models/ExhaustFan.glb"
const SCALE_MODEL: number = 25;

//-----------------------------------------------------------------------------//
//  循環扇オブジェクトを管理するクラス
//  引数：
//      scene : Scene
//-----------------------------------------------------------------------------//
export default class ExhaustFanManager extends AnimationObjectManager {

    //-----------------------------------------------------------------------------//
    // コンストラクタ || constructor
    //-----------------------------------------------------------------------------//
    public constructor(scene: Scene) {

        // 親クラスのコンストラクタ
        super(scene);

        // モデルパスの設定
        this.pathModel = PATH_MODEL;

        // スケールの設定
        this.scaleModel = SCALE_MODEL;
    }

    public addSceneByArray(array: Device[]) {

        if (!array || array.length === 0) return

        this.loader.load(this.pathModel, (gltf: GLTF) => {

            this.baseModel = gltf.scene;

            this.baseModel.scale.set(this.scaleModel, this.scaleModel, this.scaleModel);

            for (let i = 0; i < array.length; i++) {

                const model: Object3D = this.baseModel.clone();
                model.name = array[i].attribute

                const objectData = new ObjectData(model, array[i].deviceId, array[i].attribute, array[i].place_type);

                model.traverse((child) => {
                    child.userData = objectData;
                    child.userData.operateFlag = array[i].state === 1;
                });

                model.position.set(array[i].posX, array[i].posY, array[i].posZ);
                model.rotation.y = array[i].rotY * (Math.PI / 180);

                this.targetScene.add(model);
                this.children.push(model);

                // アニメーションの設定
                if (gltf.animations) {

                    const clock: Clock = new Clock();
                    this.clocks.push(clock);

                    model.animations = Array.from(gltf.animations);

                    const mixer: AnimationMixer = new AnimationMixer(model);
                    this.mixers.push(mixer);

                    const action: AnimationAction = mixer.clipAction(model.animations[0]);
                    action.setDuration(1.5);
                    action.setLoop(LoopRepeat, Infinity);
                    action.clampWhenFinished = true;
                    this.actions.push(action);

                    if (model.userData.operateFlag) action.play()

                }

            }

        }, undefined, () => {

            console.error("AnimationObjectManager: failed on loading " + this.pathModel);

        });
    }
    
    public updateFanAnimation(deviceId: number, state: number) {

        const target = this.actions.find(action => this.getChildByDeviceId(deviceId) === action.getRoot());

        if (target) {
            state === 1 ? target.play() : target.stop();
            target.getRoot().userData.operateFlag = state === 1;
        }

    }
}