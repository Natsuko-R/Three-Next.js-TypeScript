//-----------------------------------------------------------------------------//
// インポート || import
//-----------------------------------------------------------------------------//
import { Scene, Object3D, AnimationObjectGroup, AnimationClip, AnimationMixer, AnimationAction } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import ObjectData from "./ObjectData";
import ObjectManager from "../object-manager/ObjectManager";
import { Device } from "@/actions/get-3d-data";

//-----------------------------------------------------------------------------//
//  アニメーションつき3Dオブジェクトグループを管理するクラス
//  引数：
//      scene : Scene
//-----------------------------------------------------------------------------//
export default class AnimationGroupManager extends ObjectManager {

    //-----------------------------------------------------------------------------//
    // フィールド || fields
    //-----------------------------------------------------------------------------//
    private animations: AnimationClip[];
    private mixer: AnimationMixer | undefined;
    private action: AnimationAction | undefined;
    private animeGroup: AnimationObjectGroup;
    //private clocks : Clock[];

    //-----------------------------------------------------------------------------//
    // コンストラクタ || constructor
    //-----------------------------------------------------------------------------//
    public constructor(scene: Scene) {

        // 親クラスのコンストラクタ
        super(scene);

        // アニメーションクリップ格納用配列の初期化
        this.animations = [];

        // アニメーションミキサー格納用配列の初期化
        //this.mixer = new AnimationMixer();

        // アニメーションアクション格納用配列の初期化
        //this.action = new AnimationAction();

        // アニメーショングループ列の初期化
        this.animeGroup = new AnimationObjectGroup();

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

            // アニメーション読み込み時
            if (this.animations) {
                // console.log("AnimationGroupManager : succeeded on loading " + this.pathModel + " and the animations created.");

                // モデルに対応したミキサーの宣言
                this.mixer = new AnimationMixer(this.animeGroup);



                // アニメーションアクションの作成処理
                for (let i = 0; i < this.animations.length; i++) {

                    let clip = this.animations[i];

                    // アニメーションアクションの作成処理
                    this.action = this.mixer.clipAction(clip);
                    this.action.setDuration(5);
                    this.action.clampWhenFinished = true;
                    this.action.time = 0;

                    // アニメーションの再生設定
                    this.action.play();

                }
            }

            // モデルにスケール適用
            this.baseModel.scale.set(this.scaleModel, this.scaleModel, this.scaleModel);

            // 成功メッセージ
            // console.log("AnimationGroupManager : succeeded on loading " + this.pathModel + " and the baseModel created.");

            // 配列の長さ分繰り返して状態設定
            for (let i = 0; i < array.length; i++) {

                // メッシュを作成
                const model: Object3D = this.baseModel.clone();

                // オブジェクトデータの作成
                const objectData = new ObjectData(model, array[i].deviceId, array[i].attribute, array[i].place_type);

                // モデルはMesh（1-複数個）を含んだGroupインスタンスなので、その子要素にすべて情報を付加する。
                model.traverse((child) => {
                    child.userData = objectData;
                });

                // 座標設定
                model.position.set(array[i].posX, array[i].posY, array[i].posZ);

                // 角度設定
                // model.rotation.x = array[i].rotX * (Math.PI / 180);
                model.rotation.y = array[i].rotY * (Math.PI / 180);
                // model.rotation.z = array[i].rotZ * (Math.PI / 180);

                this.setDegree(900);

                // アニメーショングループに設定
                this.animeGroup.add(model);

                // シーンに追加
                this.targetScene.add(model);
                this.children.push(model);

            }

        }, undefined, () => {

            // モデル読み込み失敗時
            console.error("AnimationObjectManager: failed on loading " + this.pathModel);

        });
    }
    /*
            // アニメーションミキサーの更新処理
            public updateAnimationObjects(){
    
                for(let i = 0; i < this.mixer.length; i++){
        
                    if(this.mixer[i]){
                        this.mixer[i].update(this.clocks[i].getDelta());
                    }
        
                }
        
            }
            */

    // 角度でアニメーションを固定する
    public setDegree(degree: number) {

        if (this.mixer !== undefined) {

            // degreeをアニメーションの時間に変換する
            const time = 4.9 * (degree * 0.01);

            this.mixer.setTime(time);

        };

    };

}