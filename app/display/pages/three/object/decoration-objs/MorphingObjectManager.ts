//-----------------------------------------------------------------------------//
// インポート || import
//-----------------------------------------------------------------------------//
import { Scene, BufferGeometry, Vector3, BoxGeometry, MeshLambertMaterial, Mesh, Group, Float32BufferAttribute} from "three";
import ObjectData from "./ObjectData";
import ObjectManager from "../object-manager/ObjectManager";
import { Device } from "@/actions/get-3d-data";

//-----------------------------------------------------------------------------//
//  モーフターゲットつき3Dオブジェクトを管理するクラス
//  引数：
//      scene : Scene
//-----------------------------------------------------------------------------//
export default class MorphingObjectManager extends ObjectManager{

    //-----------------------------------------------------------------------------//
    // フィールド || fields
    //-----------------------------------------------------------------------------//
    protected geometries : BufferGeometry[];
    protected size : Vector3;
    protected opacity : number;
    protected targetPos    : Vector3;
    protected color = { color : 0x000000};

    //-----------------------------------------------------------------------------//
    // コンストラクタ || constructor
    //-----------------------------------------------------------------------------//
    public constructor(scene : Scene, size : Vector3, opacity : number){
        
        // 親クラスのコンストラクタ
        super(scene);

        // ジオメトリ格納用配列の初期化
        this.geometries = [];

        // フィールドの初期化
        this.targetPos = new Vector3(0, 0, 0);
        this.size = size;
        this.opacity = opacity;

    };

    //-----------------------------------------------------------------------------//
    // メソッド || methods 
    //-----------------------------------------------------------------------------//  
    public addSceneByArray(array : Device[]){
        
        // 引数の配列が空配列の場合
        if(!array || array.length === 0 ){
            return;
        }

        // ジオメトリ・マテリアルの作成
        const geometry = new BoxGeometry(this.size.x, this.size.y, this.size.z, 1, 1);
        geometry.morphAttributes.position = [];

        const material = new MeshLambertMaterial(this.color);
        material.transparent = true;
        material.alphaToCoverage = true;
        material.opacity = this.opacity;

        // ジオメトリの変形後の頂点座標配列を作成
        const targetAttribute = [];

        for(let j = 0; j < array.length; j++){


            // ジオメトリの頂点ごとに変形後の座標を設定
            for(let i = 0; i < geometry.attributes.position.count; i++){
    
                // ジオメトリのローカル座標を取得（この場合、ローカル座標は原点である0になることはない）
                let x = geometry.attributes.position.getX(i);
                let y = geometry.attributes.position.getY(i);
                let z = geometry.attributes.position.getZ(i);
    
                // 変更後のX座標が設定されている場合
                if(this.targetPos.x !== 0){
                    // 頂点座標が上面かつ、変更後のX座標が0より大きい場合、値を更新する
                    if(x === (this.size.x / 2) && this.targetPos.x > 0){
                        x = this.targetPos.x;
    
                    // 頂点座標が下面かつ、変更後のX座標が0より小さい場合、値を更新する
                    }else if(x === -(this.size.x / 2) && this.targetPos.x < 0){
                        x = this.targetPos.x;
                    };
                    
                };
    
                // 変更後のY座標が設定されている場合
                if(this.targetPos.y !== 0){
                    // 頂点座標が上面かつ、変更後のY座標が0より大きい場合、値を更新する
                    if(y === (this.size.y / 2) && this.targetPos.y > 0){
                        y = this.targetPos.y;
    
                    // 頂点座標が下面かつ、変更後のY座標が0より小さい場合、値を更新する
                    }else if(y === -(this.size.y / 2) && this.targetPos.y < 0){
                        y = this.targetPos.y;
                    };
    
                };
    
                // 変更後のZ座標が設定されている場合
                if(this.targetPos.z !== 0){
                    // 頂点座標が上面かつ、変更後のZ座標が0より大きい場合、値を更新する
                    if(z === (this.size.z / 2) && this.targetPos.z > 0){
                        z = this.targetPos.z;
    
                    // 頂点座標が下面かつ、変更後のZ座標が0より小さい場合、値を更新する
                    }else if(z === -(this.size.z / 2) && this.targetPos.z < 0){
                        z = this.targetPos.z;
                    };
    
                };
    
                // 頂点座標配列に格納
                targetAttribute.push(x, y, z);
            };

        }

        // ジオメトリのモーフターゲットに座標配列を追加
        geometry.morphAttributes.position[0] = new Float32BufferAttribute( targetAttribute, 3);

        // メッシュの作成
        const mesh = new Mesh(geometry, material);
        
        // 登録用グループの作成
        const group = new Group();

        // 配列の長さ分繰り返して条件設定
        for(let i = 0; i < array.length; i++){

            // モデルの複製
            const model = mesh.clone();

            // オブジェクトデータの作成
            const objectData = new ObjectData(model, array[i].deviceId, array[i].attribute, array[i].place_type);
            model.userData = objectData;

            // ジオメトリを配列に格納
            this.geometries.push(model.geometry);

            // 座標設定
            model.position.set(array[i].posX, array[i].posY, array[i].posZ);

            // model.scale.set(array[i].sizeX,array[i].sizeY,array[i].sizeZ);

            // 角度設定
            model.rotation.y = array[i].rotY * (Math.PI / 180);

            // マネージャの子要素に追加
            this.addChild(model);

            // 登録用グループに追加
            group.add(model);

        };

        // シーンに追加
        this.targetScene.add(group);

        for(let i = 0; i < array.length;i++){
            // モーフィングさせる
            // this.setMorphingInfluences(array[i].animPar, array[i].deviceId);
        }
        

    };

    // 設定した値にモーフィングさせる
    public setMorphingInfluences(degree : number, deviceId : number){

        // 子要素すべてに設定する
        for(let i = 0; i < this.children.length; i++){

            if(this.children[i].userData.deviceId === deviceId){

            const child = this.children[i] as Mesh;
            child.morphTargetInfluences![0] = degree / 100;

            console.log("MorphingObjectManager : " + deviceId + " objects morphed");
            
            };

        };

    };

}