export default function EquipmentButton(props: any) {

    // クリックされたとき
    const handleClick = () => {

        if (props.selectedOperateFlag === true) {
            props.setOperateFlag(false);

        } else {
            props.setOperateFlag(true);
        }

        props.setChangedFlag(true);
    };

    return (
        <div>
            {props.selectedOperateFlag === true
                ? <button className="bg-slate-200 rounded-md p-2 text-rose-800" onClick={handleClick} type="button">停止中</button>
                : <button className="bg-slate-200 rounded-md p-2 text-slate-800" onClick={handleClick} type="button">動作中</button>
            }
        </div>
    );
}