import { create } from "zustand";

export const useContentStore = create((set) => ({
	contentType: "stories",
	setContentType: (type) => set({ contentType: type }),
}));
