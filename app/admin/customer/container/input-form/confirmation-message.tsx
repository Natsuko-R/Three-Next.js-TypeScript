import React from "react"
import { Button } from "@/components/ui/button"
import { useJsonDataStore } from "../hooks/useJsonDataStore";
import { ReqParam, set3Ddata } from "@/actions/set-3d-data";
import toast from "react-hot-toast";

export const ConfirmationMessage = ({ onRenderCanvas }: any) => {

    const { JsonData } = useJsonDataStore()

    const handleClickClose = () => {
        const reqData: ReqParam = {
            code1: "2222",
            code2: "4444",
            farm_id: 6,
            controller_id: 7,
            house_id: 1,
            data: JSON.stringify(JsonData, null, 2),
        };
        set3Ddata(reqData);

        console.log("JsonData", JSON.stringify(JsonData, null, 2));

        toast.success('保存成功');
    }

    const handleClickCancel = () => {
        onRenderCanvas();
    }

    return (
        <div className="flex flex-col items-center">
            <Button type="button" onClick={handleClickClose} className=" m-2 h-15 px-4 rounded-md  bg-blue-300 hover:bg-blue-400  border border-input text-black">
                <span className="font-bold text-lg p-2">変更を保存して終了</span>
            </Button>

            <Button type="button" onClick={handleClickCancel} className=" m-2 h-15 px-4 rounded-md  bg-white hover:bg-slate-100 border border-input text-black">
                <span className="font-bold text-lg p-2">プレビュ</span>
            </Button>
        </div>
    )
}