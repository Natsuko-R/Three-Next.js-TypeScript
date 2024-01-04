import { DeviceData, ReqParam, getDevicestate } from "@/actions/get-devicestate"
import { create } from "zustand"

interface devicesStateStore {
  data: DeviceData[]
  loading: boolean
  getArray: (value: ReqParam) => void
}

export const useDevicesStateStore = create<devicesStateStore>((set) => ({
  data: [],
  loading: false,
  getArray: async (value) => {
    set({ loading: true })
    const devicesState = await getDevicestate(value)
    set({ loading: false, data: devicesState })
  },
}))
