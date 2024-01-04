export interface DeviceInfo {
    id: number
    name: string
    place_type: number
}

export interface DevicePopupInfo {
    deviceId: number
    attribute: string
    state: number
}

export interface ObjectControlerProps {
    // setSelectedAttr: (data: string) => void;
    // setSelectedObjId: (id: number) => void;
    // setSelectedOperateFlag: (flag: boolean) => void;
    setSelectedDevice: (data: DevicePopupInfo) => void;
    setIsSelected: (flag: boolean) => void;
    sendRequest: (data: DeviceInfo) => void;
}

export interface PopupButtonProps {
    // selectedOperateFlag: boolean
    // setSelectedOperateFlag: (flag: boolean) => void;
    setChangedFlag: (flag: boolean) => void;
}

// export interface PopupProps extends PopupButtonProps {
//     selectedAttr: string | null
//     selectedObjId: number
// }

export interface HousePopupProps extends PopupButtonProps {
    selectedDevice: DevicePopupInfo
}