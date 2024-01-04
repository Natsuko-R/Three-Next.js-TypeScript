import { Mesh, MeshLambertMaterial, BoxGeometry, Group, Float32BufferAttribute, Scene, Object3D } from "three";

// ハウスオブジェクトの表示単位
const MODEL_SPACING = 50.0;

// カーテン
const BOX_HEIGHT = 0.5;
const BOX_WIDTH = 50.0;
const BOX_DEPTH = 1.0;

const BOX_COLOR = { color: 0xffffff };
const CURTAIN_SPACING = 2;

// const ANIMATION_VALUE = 0.0025;
const CURTAIN_OPACITY = 0.50;

export default class OuterCurtainManager {

    protected children: Object3D[];

    public systemNumLeft: number
    public systemNumRight: number

    public color: object
    public spacing: number
    public opacity: number

    public line: number;
    public row: number;
    public minRowPosZ: number;
    public maxRowPosZ: number;
    public minLinePosX: number;
    public maxLinePosX: number;

    public curtainObjects: any[];
    public curtainGeometries: any[];
    public curtainTargetPositions: any[];
    public curtainAnimationWeight: number;

    public constructor(line: number, row: number, minRowPosZ: number, maxRowPosZ: number, minLinePosX: number, maxLinePosX: number) {

        this.children = [];
        this.color = BOX_COLOR
        this.spacing = CURTAIN_SPACING
        this.opacity = CURTAIN_OPACITY

        // ハウスが横何列あるか
        this.line = line;

        this.systemNumLeft = 26 
        this.systemNumRight = 28

        // ハウスの奥行が何列あるか
        this.row = row;

        // ハウスの範囲
        this.minRowPosZ = minRowPosZ;
        this.maxRowPosZ = maxRowPosZ;
        this.minLinePosX = minLinePosX;
        this.maxLinePosX = maxLinePosX;

        this.curtainObjects = [];
        this.curtainGeometries = [];
        this.curtainTargetPositions = [];
        this.curtainAnimationWeight = 0;
    }

    // カーテンの作成
    public createCurtain(scene: Scene) {

        // ジオメトリの作成
        const geometry = new BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH, 1, 1);
        geometry.morphAttributes.position = [];

        // マテリアルの作成
        const material = new MeshLambertMaterial(this.color);

        // 透明度の設定
        material.transparent = true;
        material.alphaToCoverage = true;
        material.opacity = this.opacity;

        // メッシュの作成
        const mesh = new Mesh(geometry, material);

        // 登録用グループ
        const group = new Group();

        // 側面の壁を作成 lineで指定回数実行
        for (let i = 0; i < this.row; i++) {

            // 左側
            const modelLeft = mesh.clone();
            this.curtainObjects.push(modelLeft);
            this.curtainGeometries.push(modelLeft.geometry);

            modelLeft.rotation.y = -0.5 * Math.PI;
            modelLeft.position.x = this.minLinePosX - this.spacing;
            modelLeft.position.y = 100;
            modelLeft.position.z = this.minRowPosZ + i * MODEL_SPACING + 25;

            modelLeft.userData.systemNumber = this.systemNumLeft

            // 右側
            const modelRight = mesh.clone();
            this.curtainObjects.push(modelRight);
            this.curtainGeometries.push(modelRight.geometry);

            modelRight.rotation.y = 0.5 * Math.PI;
            modelRight.position.x = this.maxLinePosX + this.spacing;
            modelRight.position.y = 100;
            modelRight.position.z = this.minRowPosZ + i * MODEL_SPACING + 25;

            modelRight.userData.systemNumber = this.systemNumRight

            // 登録用グループに登録
            group.add(modelLeft);
            group.add(modelRight);
        }

        // モデルをシーンに追加
        scene.add(group);

        // モデルをマネージャーの子要素に追加
        this.children.push(group)

        // console.log("CurtainManager: this HouseManager has following number of children " + this.children.length);

    }

    // ジオメトリのモーフターゲットを作成
    public setCurtainAnimation() {

        // カーテンの数だけ実行
        for (let i = 0; i < this.curtainGeometries.length; i++) {

            // 変形後の座標
            const targetAttribute = [];

            // 頂点座標を取得
            const positionAttribute = this.curtainGeometries[i].attributes.position;

            // 頂点ごとに実行
            for (let j = 0; j < positionAttribute.count; j++) {

                const x = positionAttribute.getX(j);
                let y = positionAttribute.getY(j);
                const z = positionAttribute.getZ(j);

                // 底面の場合
                if (y === -(BOX_HEIGHT / 2)) {
                    y = -100;
                }

                targetAttribute.push(x, y, z);

            }

            // ジオメトリのモーフターゲットに追加
            this.curtainGeometries[i].morphAttributes.position[0] = new Float32BufferAttribute(targetAttribute, 3);

            // 前面だけ開く
            if (this.curtainObjects[i].rotation.y === 0) {

                this.curtainObjects[i].morphTargetInfluences[0] = 0;

            } else {

                this.curtainObjects[i].morphTargetInfluences[0] = 0;

            }

        }

    }

    // 設定した値にモーフィングさせる
    public setMophingInfluences(degree: number) {

        // オブジェクトごとに値を設定する
        for (let i = 0; i < this.curtainObjects.length; i++) {
            this.curtainObjects[i].morphTargetInfluences[0] = degree / 100;
        }
    }
}