import { DateRange } from "react-day-picker"
import { create } from "zustand"
import { addDays } from "date-fns"

interface FieldInfo {
  fieldName: string
  fieldType: string
}

interface AreaResult {
  placeName: string
  locId: number
  placeType: number
}

interface GraphStore {
  dateType: "1" | "2", // for value / defaultValue
  dateRange: DateRange
  sortValue: string
  fieldsList: FieldInfo[]
  placeList: AreaResult[]
  selectedFields: string[]
  selectedPlaces: string[]
  setValue: (value: Partial<Omit<GraphStore, "setValue">>) => void // Partial // Omit
}

export const useGraphStore = create<GraphStore>((set, get) => ({
  dateType: "1",
  dateRange: { from: addDays(new Date(), -15), to: new Date() }, // unused
  sortValue: "loc_id-fieldtype",
  fieldsList: [
    { fieldName: "field1", fieldType: "fieldType-1" },
    { fieldName: "field2", fieldType: "fieldType-2" },
    { fieldName: "field3", fieldType: "fieldType-3" },
  ],
  placeList: [
    { placeName: "place1", locId: 1, placeType: 2 },
    { placeName: "place2", locId: 2, placeType: 2 },
    { placeName: "place3", locId: 3, placeType: 2 },
  ],
  selectedPlaces: ["0-0", "1-1", "1-2"],
  selectedFields: ["temp", "humi", "satu"],
  setValue: (value) => { set(value) },
}))
