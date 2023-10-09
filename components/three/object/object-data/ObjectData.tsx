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

    public setParentObject(object: Object3D) {
        this.parentObject = object
    }

    public getParentObject() {
        return this.parentObject
    }

    public setDeviceId(objectId: number) {
        this.deviceId = objectId
    }

    public getDeviceId() {
        return this.deviceId
    }

    public setAttribute(attribute: string) {
        this.deviceName = attribute
    }

    public getAttribute() {
        return this.deviceName
    }

}