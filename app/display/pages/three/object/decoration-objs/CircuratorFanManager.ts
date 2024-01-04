//-----------------------------------------------------------------------------//
// インポート || import
//-----------------------------------------------------------------------------//
import { AnimationAction, AnimationMixer, Clock, LoopRepeat, Object3D, Scene } from "three";
import AnimationObjectManager from "./AnimationObjectManager";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectData from "./ObjectData";
import { Device } from "@/actions/get-3d-data";

//-----------------------------------------------------------------------------//
// 定数 || const
//-----------------------------------------------------------------------------//
const PATH_MODEL: string = "/models/CircuratorFan.glb"
const SCALE_MODEL: number = 30;

//-----------------------------------------------------------------------------//
//  循環扇オブジェクトを管理するクラス
//  引数：
//      scene : Scene
//-----------------------------------------------------------------------------//
export default class CircuratorFanManager extends AnimationObjectManager {


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

                    const action: AnimationAction = mixer.clipAction(model.animations[1]);
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

    // public createFan(propData: Device) {

    //     // パスからモデルを読み込み
    //     this.loader.load(this.pathModel, (gltf: GLTF) => {

    //         // モデル読み込み成功時
    //         this.baseModel = gltf.scene;
    //         this.animations = gltf.animations;

    //         // スケール適用
    //         this.baseModel.scale.set(this.scaleModel, this.scaleModel, this.scaleModel);

    //         const model: Object3D = this.baseModel.clone();

    //         // オブジェクトデータの作成
    //         const objectData = new ObjectData(model, propData.deviceId, propData.attribute, propData.place_type);

    //         // モデルはMesh（1-複数個）を含んだGroupインスタンスなので、その子要素にすべて情報を付加する。
    //         model.traverse((child) => {
    //             child.userData = objectData;
    //             child.userData.operateFlag = false;
    //         });

    //         // 座標設定
    //         model.position.set(propData.posX, propData.posY, propData.posZ);

    //         // 角度設定
    //         // model.rotation.x = propData.rotX * (Math.PI / 180);
    //         model.rotation.y = propData.rotY * (Math.PI / 180);
    //         // model.rotation.z = propData.rotZ * (Math.PI / 180);

    //         // シーンに追加
    //         this.targetScene.add(model);
    //         this.children.push(model);

    //         // アニメーションの設定
    //         if (this.animations) {

    //             // クロックの作成
    //             const clock: Clock = new Clock();
    //             this.clocks.push(clock);

    //             // モデルにアニメーションを設定
    //             model.animations = Array.from(this.animations);

    //             // モデルに対応したミキサーの作成
    //             const mixer: AnimationMixer = new AnimationMixer(model);
    //             this.mixers.push(mixer);

    //             // アニメーションアクションの作成処理
    //             for (let i = 0; i < model.animations.length; i++) {

    //                 // アニメーションアクションの作成処理
    //                 const action: AnimationAction = mixer.clipAction(model.animations[i]);
    //                 action.setDuration(1.5);
    //                 action.setLoop(LoopRepeat, Infinity);
    //                 action.clampWhenFinished = true;
    //                 this.actions.push(action);

    //                 // アニメーションの再生設定
    //                 action.play()

    //             }

    //         }

    //     }, undefined, () => {

    //         // モデル読み込み失敗時
    //         console.error("ObjectManager : failed on loading " + this.pathModel);

    //     });
    // }

    public updateFanAnimation(deviceId: number, state: number) {

        const target = this.actions.find(action => this.getChildByDeviceId(deviceId) === action.getRoot());

        if (target) {
            state === 1 ? target.play() : target.stop();
            target.getRoot().userData.operateFlag = state === 1;
        }

    }
}
