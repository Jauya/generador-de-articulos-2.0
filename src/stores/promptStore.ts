import { create } from "zustand";

interface PromptStore {
  prompts: string[];
  addPrompts: (prompts: string[]) => void;
  clearPrompts: () => void;
  isSending: boolean;
  setIsSending: (isSending: boolean) => void;
}

export const usePromptStore = create<PromptStore>((set) => ({
  prompts: [],
  isSending: false,
  setIsSending: (isSending) => set({ isSending }),
  addPrompts: (prompts) => set({ prompts }),
  clearPrompts: () => set({ prompts: [] }),
}));
