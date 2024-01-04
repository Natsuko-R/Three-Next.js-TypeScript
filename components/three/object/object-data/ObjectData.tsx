import { Object3D } from "three"

export default class ObjectData {
    private parentObject: Object3D
    private deviceId: number
    private deviceName: string

    public constructor(parentObject: Object3D, deviceId: number, deviceName: string) {
        this.parentObject = parentObject
        this.deviceId = deviceId
        this.deviceName = deviceName
    }

}