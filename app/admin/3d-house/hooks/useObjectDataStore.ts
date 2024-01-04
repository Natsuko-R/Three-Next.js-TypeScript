import { Device } from "@/actions/get-3d-data";
import { create } from "zustand";

export interface SelectedObject {
	isPreview: boolean
	SelectedObject: Device | null;
	setSelectedObject: (data: Device) => void;
	resetObject: () => void;
}

export const useObjectDataStore = create<SelectedObject>((set) => ({
	isPreview: false,
	SelectedObject: null,
	setSelectedObject: (data: Device) => set({ isPreview: true, SelectedObject: data }),
	resetObject: () => set({ isPreview: false, SelectedObject: null }),
}));
