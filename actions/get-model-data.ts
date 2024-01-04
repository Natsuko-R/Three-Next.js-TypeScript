import toast from "react-hot-toast";
import request from "@/lib/request";

export interface deviceInfo {
    deviceId: number;
    deviceName: string;
    rotY: number;
    posX: number;
    posY: number;
    posZ: number;
}

export interface resData {
    walls: deviceInfo[];
    waterTanks: deviceInfo[];
    heatPumps: deviceInfo[];
    fans: deviceInfo[];
    leds: deviceInfo[];
    states: number[]
}

export interface ResBody {
    data: {
        attributes: {
            modelData: resData;
        };
    }[];
}

export const getModelData = async () => {
    try {
        const { data } = (await request.get("/models-data")) as ResBody;

        const modelData = data[0]?.attributes?.modelData;

        if (modelData) {
            return { data: modelData };
        } else {
            toast.error("Model data not found.");
            return { data: null };
        }
    } catch (error: any) {
        toast.error(error.message);
        return { data: null };
    }
};
