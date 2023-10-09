

export default class ObjectData {
    private deviceId: number
    private attribute: string

    public constructor(deviceId: number, attribute: string) {
        this.deviceId = deviceId
        this.attribute = attribute
    }

    public getAllDeviceInfo() {
        console.log("id :" + this.deviceId);
        console.log("name : " + this.attribute);
        return { deviceId: this.deviceId, attribute: this.attribute }
    }

    public setDeviceId(objectId: number) {
        this.deviceId = objectId
    }

    public getDeviceId() {
        console.log("id :" + this.deviceId);
        return this.deviceId
    }

    public setAttribute(attribute: string) {
        this.attribute = attribute
    }

    public getAttribute() {
        console.log("name : " + this.attribute);
        return this.attribute
    }
}

// function showInfoHandler(array: Device[]) {
//     if (!array.length) return

//     for (let i = 0; i < array.length; i++) {
//         const showInfo = new ShowInfo(array[i].deviceId, array[i].attribute)

//         showInfo.getDeviceId()
//         showInfo.getAttribute()
//     }
// }