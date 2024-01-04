//-----------------------------------------------------------------------------//
// インポート || import
//-----------------------------------------------------------------------------//
import { Scene, Object3D, Clock, AnimationClip, AnimationMixer, LoopRepeat, AnimationAction } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectData from "./ObjectData";
import ObjectManager from "../object-manager/ObjectManager";
import { Device } from "@/actions/get-3d-data";

//-----------------------------------------------------------------------------//
//  アニメーションつき3Dオブジェクトを管理するクラス
//  引数：
//      scene : Scene
//-----------------------------------------------------------------------------//
export default class AnimationObjectManager extends ObjectManager {

    //-----------------------------------------------------------------------------//
    // フィールド || fields
    //-----------------------------------------------------------------------------//
    public animations: AnimationClip[];
    public mixers: AnimationMixer[];
    public actions: AnimationAction[];
    public clocks: Clock[];

    //-----------------------------------------------------------------------------//
    // コンストラクタ || constructor
    //-----------------------------------------------------------------------------//
    public constructor(scene: Scene) {

        // 親クラスのコンストラクタ
        super(scene);

        // アニメーションクリップ格納用配列の初期化
        this.animations = [];

        // アニメーションミキサー格納用配列の初期化
        this.mixers = [];

        // アニメーションアクション格納用配列の初期化
        this.actions = [];

        // クロック格納用配列の初期化
        this.clocks = [];

    }

    //-----------------------------------------------------------------------------//
    // メソッド || methods 
    //-----------------------------------------------------------------------------//
    //オーバライド
    public addSceneByArray(array: Device[]) {

        // 引数の配列が空配列の場合
        if (!array || array.length === 0) {
            return;
        }

        // パスからモデルを読み込み
        this.loader.load(this.pathModel, (gltf: GLTF) => {

            // モデル読み込み成功時
            this.baseModel = gltf.scene;
            this.animations = gltf.animations;

            // モデルにスケール適用
            this.baseModel.scale.set(this.scaleModel, this.scaleModel, this.scaleModel);

            // 成功メッセージ
            // console.log("AnimationObjectManager : succeeded on loading " + this.pathModel + " and the baseModel created.");

            // 配列の長さ分繰り返して状態設定
            for (let i = 0; i < array.length; i++) {
                // メッシュを作成
                const model: Object3D = this.baseModel.clone();

                // オブジェクトデータの作成
                const objectData = new ObjectData(model, array[i].deviceId, array[i].attribute, array[i].place_type);

                // モデルはMesh（1-複数個）を含んだGroupインスタンスなので、その子要素にすべて情報を付加する。
                model.traverse((child) => {
                    child.userData = objectData;
                    child.userData.operateFlag = true;
                });

                // 座標設定
                model.position.set(array[i].posX, array[i].posY, array[i].posZ);

                // 角度設定
                model.rotation.y = array[i].rotY * (Math.PI / 180);

                // シーンに追加
                this.targetScene.add(model);
                this.children.push(model);

                // アニメーションの設定
                if (this.animations) {

                    // クロックの作成
                    const clock: Clock = new Clock();
                    this.clocks.push(clock);

                    // モデルにアニメーションを設定
                    model.animations = Array.from(this.animations);

                    // モデルに対応したミキサーの作成
                    const mixer: AnimationMixer = new AnimationMixer(model);
                    this.mixers.push(mixer);

                    // アニメーションアクションの作成処理
                    for (let i = 0; i < model.animations.length; i++) {

                        // アニメーションアクションの作成処理
                        const action: AnimationAction = mixer.clipAction(model.animations[i]);
                        action.setDuration(1.5);
                        action.setLoop(LoopRepeat, Infinity);
                        action.clampWhenFinished = true;
                        this.actions.push(action);

                        // アニメーションの再生設定
                        action.play();

                    }

                }

            }

        }, undefined, () => {

            // モデル読み込み失敗時
            console.error("AnimationObjectManager: failed on loading " + this.pathModel);

        });
    }

    // アニメーションミキサーの更新処理
    public updateAnimationObjects() {

        for (let i = 0; i < this.mixers.length; i++) {

            if (this.mixers[i]) {
                this.mixers[i].update(this.clocks[i].getDelta());
            }

        }

    }

    // デバイス番号でアニメーションをトグル
    public toggleAnimationByDeviceId(deviceId: number) {

        // アクション配列を検索
        for (let i = 0; i < this.actions.length; i++) {

            // アニメーションアクションの親要素が引数で指定されたオブジェクトと一致している場合アニメーションをトグル
            if (this.getChildByDeviceId(deviceId) === this.actions[i].getRoot()) {

                if (this.actions[i]) {

                    if (this.actions[i].isRunning()) {

                        // アニメーション中の場合
                        this.actions[i].stop();

                        // 運転フラグの変更
                        this.actions[i].getRoot().userData.operateFlag = false;

                    } else if (!this.actions[i].isRunning()) {

                        // アニメーション中でない場合
                        this.actions[i].play();


                        // 運転フラグの変更
                        this.actions[i].getRoot().userData.operateFlag = true;


                    }

                }

            }

        }

    }

}