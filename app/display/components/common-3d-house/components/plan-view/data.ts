import { AreaType } from "./types"

export const CO2_SENSORS: AreaType[] = [
  {
    id: "1",
    name: "エリア１",
    left: null,
    middle: null,
    right: {
      id: "03",
      name: "Sensor03",
    },
  },
  {
    id: "2",
    name: "エリア2",
    left: {
      id: "04",
      name: "Sensor04",
    },
    middle: null,
    right: null,
  },
  {
    id: "3",
    name: "エリア3",
    left: null,
    middle: null,
    right: {
      id: "01",
      name: "Sensor01",
    },
  },
  {
    id: "4",
    name: "エリア4",
    left: {
      id: "02",
      name: "Sensor02",
    },
    middle: null,
    right: null,
  },
  {
    id: "5",
    name: "エリア5",
    left: null,
    middle: null,
    right: null,
  },
  {
    id: "6",
    name: "エリア6",
    left: null,
    middle: null,
    right: null,
  },
]
