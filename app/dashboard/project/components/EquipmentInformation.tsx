import React from 'react';
import EquipmentButton from './EquipmentButton';

export default function EquipmentInformation(props: any) {

    // スイッチを表示するフラグ
    let switchFlag = false;
    const selectedObjId = props.selectedObjId;
    const selectedAttr = props.selectedAttr;

    // 選択されたオブジェクトの名前を判定する
    let objectName = "";

    switch (selectedAttr) {

        case "circurator":
            objectName = "循環扇";
            switchFlag = true;
            break;

        default:
            objectName = "";
            switchFlag = false;
    }

    return (
        <div className="equipment">
            <div>
                {props.selected !== "" ? (

                    <div>
                        <h4>{objectName}　:　{selectedObjId}</h4>
                        {selectedAttr === "sencer" ? (
                            <div>
                                <p>正常</p>
                                <p>温度:　　　21℃</p>
                                <p>湿度:　　　52.10%</p>
                                <p>CO2濃度:　442ppm</p>
                            </div>
                        ) : null}
                        {selectedAttr === "gascylinder" ? (
                            <div>
                                <p>ボンベ残量</p>
                                <p>①    32L　/　120L </p>
                                <p>②   120L　/　120L </p>
                            </div>
                        ) : null}

                        {switchFlag === true
                            ? (<EquipmentButton selectedOperateFlag={props.selectedOperateFlag} setOperateFlag={props.setOperateFlag} setChangedFlag={props.setChangedFlag}></EquipmentButton>)
                            : null
                        }
                    </div>

                ) : null}
            </div>
        </div>
    );

}