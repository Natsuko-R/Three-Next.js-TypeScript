import { resData, getModelData } from "@/actions/get-model-data"
import { create } from "zustand"

interface ModelDataStore {
    data: resData | null
    loading: boolean
    getModels: () => void
}

export const useModelDataStore = create<ModelDataStore>((set, get) => ({
    data: null,
    loading: false,
    getModels: async () => {
        set({ loading: true })
        const { data } = await getModelData()
        set({ loading: false, data })
    },
}))