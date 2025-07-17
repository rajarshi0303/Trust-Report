import { create } from "zustand";

export const useReportFilter = create((set) => ({
  reportType: "",
  industry: "",
  minConfidence: 0,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
