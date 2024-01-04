import { PopupButtonProps } from "@/components/common-3d-house/components/popup/interfaces";
import { useDevicesStateStore } from "../../components/common-3d-house/hooks/useDevicesStateStore"
import { chaDeviceState, ReqParam } from "@/actions/cha-devicestate";
import { useState } from "react";

export default function HousePopupButton({ selectedOperateFlag, setSelectedOperateFlag, setChangedFlag }: PopupButtonProps) {
    const { data: devicesPopupArr } = useDevicesStateStore()
    const [manual, setManual] = useState<number>(devicesPopupArr[0].state)

    const toggleHandler = async () => {

        selectedOperateFlag ? setManual(1) : setManual(0)

        if (devicesPopupArr[0]) {
            const deviceIdentifierId = devicesPopupArr[0].device_identifier_id
            try {
                await chaDeviceState({
                    device_identifier_id: deviceIdentifierId,
                    manual: manual
                } as ReqParam);
            } catch (error) {
                console.error("请求出错：", error);
            }
        }

        setSelectedOperateFlag(!selectedOperateFlag)
        setChangedFlag(true)
    };

    const cancelHandler = async () => {
        if (devicesPopupArr[0]) {
            const deviceIdentifierId = devicesPopupArr[0].device_identifier_id
            try {
                await chaDeviceState({
                    device_identifier_id: deviceIdentifierId,
                    manual: 2
                } as ReqParam);
            } catch (error) {
                console.error("请求出错：", error);
            }
        }
    };

    return (
        <div>
            {selectedOperateFlag
                ? <button className="bg-slate-200 rounded-md p-2 text-rose-800" onClick={toggleHandler} type="button">停止</button>
                : <button className="bg-slate-200 rounded-md p-2 text-slate-800" onClick={toggleHandler} type="button">起動</button>
            }
            <button className="bg-slate-200 rounded-md p-2 mx-2 text-slate-800" type="button" onClick={cancelHandler} >解除</button>
        </div>
    );
}