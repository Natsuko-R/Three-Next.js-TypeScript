import { create } from "zustand";

export interface Flag {
	renderFlag: boolean;
	toggleFlag: () => void;
}

export const useRenderFlagStore = create<Flag>((set) => ({
	renderFlag: false,
	toggleFlag: () => set((state) => ({ renderFlag: !state.renderFlag })),
}));
