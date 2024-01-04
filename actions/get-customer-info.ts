import request from "@/lib/request"
import toast from "react-hot-toast"

export interface ReqParam {
    code1: string
    code2: string
}

export interface SingleCustomer {
    code1: number
    code2: number
    name: string
    kana_name: string
    short_name: string
    user_id: string
    statu: number
}

export interface CustomerFarm {
    farm_id: number
    farm_name: string
    address: string
}

export interface SingleCustomerInfo {
    singleCustomer: SingleCustomer
    customerFarm: CustomerFarm[]
}

export interface ResBody {
    code: number
    data: SingleCustomerInfo
    msg: string
}

// export const getCustomerInfo = async (customerId: number) => {
//     try {
//         const { data, code, msg } = (await request.get(`/customers/${customerId}`)) as ResBody
//         if (code !== 0) {
//             toast.error(msg)
//         }
//         return data
//     } catch (error: any) {
//         toast.error(error.message)
//     }
// }

export const getCustomerInfo = async (customerId: number) => {
    try {
        const res = await request.get(`/customers/${customerId}`)
        const data = res.data.attributes
        return data
    } catch (error: any) {
        toast.error(error.message)
    }
}