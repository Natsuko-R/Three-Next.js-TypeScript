import { ReqParam, Threedata, get3Ddata } from "@/actions/get-3d-data"
import { create } from "zustand"

interface ThreeHouseStore {
  data: Threedata | null
  has3D: boolean
  loading: boolean
  getData: (value: ReqParam) => void
}

export const useThreeHouseStore = create<ThreeHouseStore>((set, get) => ({
  data: null,
  has3D: false,
  loading: false,
  getData: async (value) => {
    set({ loading: true })
    const { data, has3D } = await get3Ddata(value)
    set({ loading: false, data, has3D: !!has3D })
  },
}))
