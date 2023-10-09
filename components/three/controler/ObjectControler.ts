import { Object3D, Scene, Camera, Raycaster, Vector2, Intersection } from "three";
import Device from "../entity/device";
import { HouseCanvasProps } from "../entity/deviceInfo";

//-----------------------------------------------------------------------------//
// 定数 || constant
//-----------------------------------------------------------------------------//
const CANVAS_NAME: string = "#glcanvas";

export default class ObjectControler {

        //-----------------------------------------------------------------------------//
        // フィールド || field
        //-----------------------------------------------------------------------------//
        private targetScene: Scene;
        private targetCamera: Camera;
        private targetCanvas: HTMLCanvasElement;

        //-----------------------------------------------------------------------------//
        // コンストラクタ || constructor
        //-----------------------------------------------------------------------------//
        public constructor(camera: Camera, targetScene: Scene) {

                // ターゲットのシーンの格納
                this.targetScene = targetScene;

                // 影響するカメラオブジェクトの格納
                this.targetCamera = camera;

                // キャンバスエレメントの取得
                this.targetCanvas = document.querySelector(CANVAS_NAME) as HTMLCanvasElement;

        }

        //-----------------------------------------------------------------------------//
        // メソッド || method
        //-----------------------------------------------------------------------------//

        // 交差判定
        public checkIntersects({ setSelectedAttr, setSelectedObjId, setOperateFlag }: HouseCanvasProps): Device | void {

                // レイキャスターの宣言
                const raycaster: Raycaster = new Raycaster();

                // マウス座標（スクリーン座標）の宣言
                const mousePos: Vector2 = new Vector2();

                // マウスのクリックイベントを定義
                this.targetCanvas.addEventListener('click', (event) => {

                        // キャンバス要素のクライアントに対する座標を取得
                        const rect = this.targetCanvas.getBoundingClientRect();

                        // マウスのスクリーン座標を正規化した二次元の座標ベクトルで取得
                        mousePos.x = (event.clientX - rect.left) / this.targetCanvas.width * 2.0 - 1.0;
                        mousePos.y = -(event.clientY - rect.top) / this.targetCanvas.height * 2.0 + 1.0;

                        // レイキャストする
                        raycaster.setFromCamera(mousePos, this.targetCamera);

                        const intersects: Intersection[] = raycaster.intersectObjects(this.targetScene.children, true).filter(obj =>
                                obj.object.parent!.userData.attribute === "co2sensor" ||
                                obj.object.parent!.userData.attribute === "circurator"
                                //obj.object.parent!.userData.attribute === "heater"
                        );


                        // 交差判定処理
                        if (intersects.length > 0) {
                                // 交差したオブジェクトが一つ以上存在するとき
                                const selectedObjects: Object3D[] = [];
                                selectedObjects.push(intersects[0].object.parent!);

                                const selectedObject = intersects[0].object;

                                const selectedObjData = {
                                        id: selectedObject.userData.deviceId,
                                        name: selectedObject.userData.attribute,
                                        place_type: selectedObject.userData.place_type,
                                }

                                const objectFlag = selectedObject.userData.operateFlag

                                if (objectFlag) {
                                        setOperateFlag(true)
                                } else {
                                        setOperateFlag(false);
                                }
                                setSelectedAttr(selectedObjData.name)
                                // add popup
                                setSelectedObjId(selectedObjData.id)
                                // SetDevicePopupFlag(true)

                        } else {

                                // hide popup
                                setOperateFlag(false)
                                setSelectedAttr('')
                                setSelectedObjId(0)
                        }

                });
        }
}