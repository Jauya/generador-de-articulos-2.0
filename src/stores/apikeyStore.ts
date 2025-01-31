import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ApikeyStore {
  apikey: string;
  successMessage: string;
  addApikey: (apikey: string) => void;
  clearApikey: () => void;
}

export const useApikeyStore = create<ApikeyStore>()(
  persist(
    (set) => ({
      apikey: "",
      successMessage: "",
      addApikey: (apikey) => set({ apikey, successMessage: "Token valido" }),
      clearApikey: () => set({ apikey: "", successMessage: "" }),
    }),
    { name: "apikey-store" }
  )
);
