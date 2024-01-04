import request from "@/lib/request"
import toast from "react-hot-toast"

export interface CustomerInfo {
    code1: number
    code2: number
    name: string
    kana_name: string
    short_name: string
    user_id: string
    statu: number
}

export interface CustomerList {
    customerInfo: CustomerInfo[]
}

export interface ResBody {
    code: number
    data: CustomerList
    msg: string
}

export const getCustomerList = async () => {
    try {
        const response = await request.get("/customers");
        const transformedData = response.data.map((item: any) => {
            const attributes = item.attributes;
            return {
                code1: attributes.code1,
                code2: attributes.code2,
                name: attributes.name,
                kana_name: attributes.kana_name,
                short_name: attributes.short_name,
                user_id: attributes.user_id,
                statu: attributes.statu,
            };
        });
        return transformedData
    } catch (error: any) {
        toast.error(error.message)
    }
}