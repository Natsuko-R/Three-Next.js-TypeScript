// "use client"

// import { useEffect } from "react"
// import { useThreeHouseStore } from "../hooks/useThreeHouseStore"

// import { HouseCanvas } from "./house-canvas";
// import { useAuthContext } from "@/context/auth-context"


// export const Panel = () => {

//     const { getData } = useThreeHouseStore()
//     const { user } = useAuthContext()

//     useEffect(() => {

//         if (!user) return

//         getData({
//             code1: user.code1,
//             code2: user.code2
//         })

//     }, [getData])

//     return (
//         <div className="h-full">
//             <HouseCanvas />
//         </div>
//     )
// }

{/* <div>
                <Button onClick={addNewWallHandler}>添加一个新水箱</Button>
                <p>水箱 : {boxCount} 个</p>
            </div> */}


{/* <section className="z-100" >
    {
        objectData && (
            <div className="rounded-xl absolute bottom-20 right-20 bg-slate-800 p-5 flex flex-col items-center">
                <button onClick={closeObjectDataHandler} className="rounded bg-slate-400 mb-4 p-1"> close </button>
                <div>
                    <p>ID: {objectData.id}</p>
                    <p>Name: {objectData.name}</p>
                </div>
            </div>
        )
    }
</section>
 */}

//  setObjectData={setObjectData} deviceArrData={deviceArrData} 

// const [objectData, setObjectData] = useState(null) // 被选中的物体，展示信息
// const [deviceArrData, setDeviceArrData] = useState<Device[]>([]) // 从数据库中请求到的数据
// const [boxCount, setBoxCount] = useState(0)
// const addNewWallHandler = () => {
//     const newDeviceData = {
//         data: {
//             "deviceId": 10151,
//             "deviceName": "wall",
//             "posX": 400,
//             "posY": 200,
//             "posZ": -30,
//             "rotX": 45,
//             "rotY": 60,
//             "rotZ": 0,
//             "operation": 1
//         }
//     }

//     addNewDevice(newDeviceData)
//     setBoxCount(boxCount + 1);
// }



// useEffect(() => {
//     const fetchData = async () => {
//         const data = await getDevicesInfo()

//         const newArray: Device[] = data.data.map((item: any) => ({
//             deviceId: item.attributes.deviceId,
//             deviceName: item.attributes.deviceName,
//             posX: item.attributes.posX,
//             posY: item.attributes.posY,
//             posZ: item.attributes.posZ,
//             rotX: item.attributes.rotX,
//             rotY: item.attributes.rotY,
//             rotZ: item.attributes.rotZ,
//             operation: item.attributes.operation
//         }))

//         setDeviceArrData(newArray)
//     }
//     fetchData()

// }, [])

// const closeObjectDataHandler = () => {
//     setObjectData(null)
// }

// {selectedAttr === "circurator" ? (
//     <EquipmentInformation
//         selectedAttr={selectedAttr} selectedObjId={selectedObjId}
//         setChangedFlag={setChangedFlag} selectedOperateFlag={selectedOperateFlag} setOperateFlag={setOperateFlag} ></EquipmentInformation >
// ) : null}





public terminateSprite() {
    this.scene.remove(this.spriteGroup)
}




public changeAllLedColor() {

    // ケーブルの色を変える
    if (this.LedOperateFlag !== true) {

        // それぞれのケーブル要素について処理を行う
        for (let i = 0; i < this.LedArray.length; i++) {

            // 稼働時用マテリアルに変更し、フラグを変更する
            this.LedArray[i].traverse((child) => {

                console.log(child.userData);

                // 名前がrightもしくはleftならばマテリアルを変更
                // if(child.name === "right" || child.name === "left"){
                //     child.material = this.colorMaterial;
                // }

            });

            this.LedArray[i].userData.operateFlag = true;
        }

        this.LedOperateFlag = true;

    } else {

        // それぞれのケーブル要素について処理を行う
        for (let i = 0; i < this.LedArray.length; i++) {

            // 元のマテリアルに戻し、フラグを変更する
            this.LedArray[i].traverse((child) => {

                // 名前がrightもしくはleftならばマテリアルを変更
                // if(child.name === "right" || child.name === "left"){
                //     child.material = this.baseMaterial;
                // }

            });

            this.LedArray[i].userData.operateFlag = false;

        }
        this.LedOperateFlag = false;
    }
}





{/* <div>
<table className="min-w-full divide-y divide-gray-200">
    <thead>
        <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">设备型号</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">设备名称</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">设备X轴</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">设备Y轴</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">设备Z轴</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">旋转X轴</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">旋转Y轴</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">旋转Z轴</th>
        </tr>
    </thead>
    <tbody>
        {deviceArrData.map(d => (
            <tr key={d.deviceId}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.deviceId}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.deviceName}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.posX}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.posY}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.posZ}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.rotX}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.rotY}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{d.rotZ}</td>
            </tr>
        ))}
    </tbody>
</table>

</div> */}
