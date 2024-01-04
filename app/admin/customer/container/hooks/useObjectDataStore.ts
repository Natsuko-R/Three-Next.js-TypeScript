import { Device } from "@/actions/get-3d-data";
import { create } from "zustand";

export interface SelectedObject {
	SelectedObject: Device | null;
	setSelectedObject: (data: Device) => void;
}

export const useObjectDataStore = create<SelectedObject>((set) => ({
	SelectedObject: null,
	setSelectedObject: (data: Device) => set({ SelectedObject: data }),
}));
