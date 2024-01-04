
import { Object3D } from "three";

export default class ObjectData {

    //-----------------------------------------------------------------------------//
    // フィールド || field
    //-----------------------------------------------------------------------------// 
    // 親となるオブジェクト
    private parentObject: Object3D;

    // 背番号（デバイス番号 11桁の数値）
    private deviceId: number;

    // そのオブジェクトがどの装置を示すのか
    private attribute: string;

    private place_type: number;

    //-----------------------------------------------------------------------------//
    // コンストラクタ || constructor
    //-----------------------------------------------------------------------------//
    public constructor(parentObject: Object3D, deviceId: number, attribute: string, place_type: number) {

        // 引数の格納
        this.parentObject = parentObject;
        this.deviceId = deviceId;
        this.attribute = attribute;
        this.place_type = place_type;
    }

    //-----------------------------------------------------------------------------//
    // メソッド || methods 
    //-----------------------------------------------------------------------------//

    // 親要素を変更する
    public setParentObject(object: Object3D) {
        this.parentObject = object;
    }

    // 親要素を取得する
    public getParentObject() {
        return this.parentObject;
    }

    // 背番号を変更する
    public setdeviceId(objId: number) {
        this.deviceId = objId;
    }

    // 背番号を取得する
    public getdeviceId() {
        return this.deviceId;
    }

    // 属性を変更する
    public setAttribute(attribute: string) {
        this.attribute = attribute;
    }

    // 属性を取得する
    public getAttribute() {
        return this.attribute;
    }

}



