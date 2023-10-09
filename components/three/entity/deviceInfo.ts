export interface DeviceInfo {
    id: number;
    name: string;
}

export type HouseCanvasProps = {
    // SetDevicePopupInfo: (data: DeviceInfo) => void;
    setSelectedAttr: (data: string) => void;
    setSelectedObjId: (data: number) => void;
    setOperateFlag: (data: boolean) => void;
    // SetDevicePopupFlag: (flag: boolean) => void;
    // setOperateFlag: (flag: boolean) => void;
    // sendRequest: (devicePopupInfo: DeviceInfo) => void;
}