import { resData } from "@/actions/get-model-data";
import { create } from "zustand";

export interface JsonDataStore {
	JsonData: resData;
	setJsonData: (data: resData) => void;
}

export const useJsonDataStore = create<JsonDataStore>((set) => ({
	JsonData: {
		walls: [],
		waterTanks: [],
		heatPumps: [],
		fans: [],
		leds: [],
		states: []
	},
	setJsonData: (data: resData) => set({ JsonData: data }),
}));
