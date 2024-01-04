import toast from "react-hot-toast"
import request from "@/lib/request"

export interface ReqParam {
    code1: string
    code2: string
    farm_id: number
    controller_id: number
    house_id: number
}

export interface Threedata {

    houseSize: SizeInfo | null;
    isBigCurtain: boolean;
    windows: DegreeObj[]
    curtains: DegreeObj[]

    co2Pipes: DeviceWithSize[]
    leds: DeviceWithSize[]
    airvalve: DeviceWithSize[]
    phvalve: DeviceWithSize[]
    ecvalve: DeviceWithSize[]

    co2Sensors: Device[]
    solarRadSensors: Device[]
    phSensors: Device[]
    soilSensors: Device[]
    pressureSensors: Device[]
    windSensors: Device[]
    rainSensors: Device[]

    decoratedObj: Device[]
    plants: Device[]
    heaters: Device[]
    circuratorFans: Device[]
    exhaustFans: Device[]
    gen3: Device[]
    gen4: Device[]
    coolers: Device[]
}

export interface SizeInfo {
    roofNumber: number
    length: number
    floorType: number
}

export interface DegreeObj {
    deviceId: number
    type_id: number
    place_type: number
    loc_id: number
    attribute: string
    degree: number
}

export interface Device {
    deviceId: number
    type_id: number
    place_type: number
    loc_id: number
    attribute: string
    state: number
    posX: number
    posY: number
    posZ: number
    rotY: number
}

export interface DeviceWithSize extends Device {
    size: number
    uuid: string
}

export interface ResBody {
    code: number
    data: Threedata
    msg: string
    has3D: number
}

export const get3Ddata = async (params: ReqParam) => {
    try {
        const { code, data, msg, has3D } = (await request.get("/get3dhousedata", {
            params,
        })) as ResBody
        if (code !== 0) {
            toast.error(msg)
            return { data: null, has3D: false }
        }
        return { data, has3D: has3D === 1 }
    } catch (err: any) {
        toast.error(err.message)
        return { data: null, has3D: false }
    }
}
