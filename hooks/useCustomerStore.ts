import { CustomerFarm, SingleCustomer, getCustomerInfo } from "@/actions/get-customer-info";
import { create } from "zustand";

interface CustomerInfoStore {
    customerDetail: SingleCustomer | null
    farmList: CustomerFarm[]
    loading: boolean
    // userLoading: boolean
    getCustomer: (customerId: string) => void
}

export const useCustomerStore = create<CustomerInfoStore>((set, get) => ({
    customerDetail: null,
    farmList: [],
    loading: false,
    // userLoading: false,
    getCustomer: async (customerId) => {
        set({ loading: true })
        const [code1, code2] = customerId.split("-")
        const data = await getCustomerInfo({ code1, code2 })
        if (data) {
            const { singleCustomer, customerFarm } = data
            set({ customerDetail: singleCustomer, farmList: customerFarm, loading: false })
        } else {
            set({ loading: false })
        }
    },
})
)