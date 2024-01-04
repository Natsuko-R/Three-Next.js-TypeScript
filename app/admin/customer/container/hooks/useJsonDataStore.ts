import { Threedata } from "@/actions/get-3d-data";
import { create } from "zustand";

export interface JsonDataStore {
	JsonData: Threedata;
	setJsonData: (data: Threedata) => void;
}

export const useJsonDataStore = create<JsonDataStore>((set) => ({
	JsonData: {
		houseSize: null,
		windows: [],
		curtains: [],
		
		co2Sensors: [],
		solarRadSensors: [],
		phSensors: [],
		soilSensors: [],
		pressureSensors: [],
		windSensors: [],
		rainSensors: [],
		heatPumps: [],
		waterTanks: [],
		waterTanksBlack: [],
		controlPanels: [],
		co2GasCylinders: [],
		plants: [],
		co2Pipes: [],
		compressors: [],
		signBoards: [],
		cameras: [],
		airCylinders: [],
		leds: [],
		airvalve: [],
		phvalve: [],
		ecvalve: [],
		circuratorFans: [],
		exhaustFans: [],
		gen3: [],
		gen4: [],
		coolers: [],
		heaters: [],
		heatersGray: []
	},
	setJsonData: (data: Threedata) => set({ JsonData: data }),
}));
