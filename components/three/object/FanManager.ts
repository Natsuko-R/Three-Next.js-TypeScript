import { AnimationAction, AnimationClip, AnimationMixer, Clock, LoopRepeat, Object3D, Scene } from "three";
import AnimationObjectManager from "./object-manager/AnimationObjectManager";
import { deviceInfo as Device } from "@/actions/get-model-data"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const PATH_MODEL: string = "/model/circurator.glb"
const SCALE_MODEL: number = 100;

//-----------------------------------------------------------------------------//
export default class FanManager extends AnimationObjectManager {


    private animationClips: AnimationClip[];
    private animationMixer: AnimationMixer[];
    private animationActions: AnimationAction[];
    private animationClock: Clock[];

    public constructor(scene: Scene) {

        // 親クラスのコンストラクタ
        super(scene);

        // モデルパスの設定
        this.modelPath = PATH_MODEL;

        // スケールの設定
        this.modelScale = SCALE_MODEL;

        this.animationClips = [];
        this.animationMixer = [];
        this.animationActions = [];
        this.animationClock = [];
    }

    public addFans(array: Device[]) {

        // 引数の配列が空配列の場合
        if (!array.length) {
            return;
        }

        // パスからモデルを読み込み
        this.loader.load(this.modelPath, (gltf: GLTF) => {

            // モデル読み込み成功時
            this.baseModel = gltf.scene;
            this.animationClips = gltf.animations;

            // if (this.animationClips) {
            //     console.log("AnimationObjectManager : succeeded on loading " + this.modelPath + " and the animations created.");
            // }

            // モデルにスケール適用
            this.baseModel.scale.set(this.modelScale, this.modelScale, this.modelScale);

            // 成功メッセージ
            console.log("AnimationObjectManager : succeeded on loading " + this.modelPath + " and the baseModel created.");

            // 配列の長さ分繰り返して状態設定
            for (let i = 0; i < array.length; i++) {
                // メッシュを作成
                const model: Object3D = this.baseModel.clone();

                // オブジェクトデータの作成
                const objectData = {
                    parentObject: model,
                    deviceId: array[i].deviceId,
                    deviceName: array[i].deviceName,
                    operateFlag: true
                }

                // モデルはMesh（1-複数個）を含んだGroupインスタンスなので、その子要素にすべて情報を付加する。
                model.traverse((child) => {
                    child.userData = objectData;
                });

                // 座標設定
                model.position.set(array[i].posX, array[i].posY, array[i].posZ);
                model.rotation.y = array[i].rotY * (Math.PI / 180);

                // シーンに追加
                this.targetScene.add(model);
                this.children.push(model);

                // アニメーションの設定
                if (this.animationClips) {

                    // クロックの作成
                    const clock: Clock = new Clock();
                    this.animationClock.push(clock);

                    // モデルにアニメーションを設定
                    model.animations = Array.from(this.animationClips);

                    // モデルに対応したミキサーの作成
                    const mixer: AnimationMixer = new AnimationMixer(model);
                    this.animationMixer.push(mixer);

                    // アニメーションアクションの作成処理
                    for (let i = 0; i < model.animations.length; i++) {

                        // アニメーションアクションの作成処理
                        const action: AnimationAction = mixer.clipAction(model.animations[i]);
                        action.setDuration(1.5);
                        action.setLoop(LoopRepeat, Infinity);
                        action.clampWhenFinished = true;
                        this.animationActions.push(action);

                        // アニメーションの再生設定
                        action.play();

                    }

                }

            }

        }, undefined, () => {

            // モデル読み込み失敗時
            console.error("AnimationObjectManager: failed on loading " + this.modelPath);

        });
    }

    // アニメーションミキサーの更新処理
    public updateAnimationObjects() {

        for (let i = 0; i < this.animationMixer.length; i++) {

            if (this.animationMixer[i]) {
                this.animationMixer[i].update(this.animationClock[i].getDelta());
            }

        }

    }

    // デバイス番号でアニメーションをトグル
    public toggleAnimationByDeviceId(deviceId: number) {

        // アクション配列を検索
        for (let i = 0; i < this.animationActions.length; i++) {

            // アニメーションアクションの親要素が引数で指定されたオブジェクトと一致している場合アニメーションをトグル
            if (this.getChildByDeviceId(deviceId) === this.animationActions[i].getRoot()) {

                if (this.animationActions[i]) {

                    if (this.animationActions[i].isRunning()) {

                        // アニメーション中の場合
                        this.animationActions[i].stop();

                        // 運転フラグの変更
                        this.animationActions[i].getRoot().userData.operateFlag = false;


                    } else if (!this.animationActions[i].isRunning()) {

                        // アニメーション中でない場合
                        this.animationActions[i].play();


                        // 運転フラグの変更
                        this.animationActions[i].getRoot().userData.operateFlag = true;

                    }

                    // console.log("this operateFlag = " + this.animationActions[i].getRoot().userData.operateFlag);

                }

            }

        }

    }


}