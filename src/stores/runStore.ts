import { create } from "zustand";
import { ArticleGemini } from "./articlestore";
import { persist } from "zustand/middleware";

interface RunStore {
  runs: Run[];
  addRun: (run: Run) => void;
}
interface Run {
  articles: ArticleGemini[];
  results: string;
  time: string;
  state: string;
}
export const useRunStore = create<RunStore>()(
  persist(
    (set) => ({
      runs: [],
      addRun: (run) => set((state) => ({ runs: [...state.runs, run] })),
    }),
    {
      name: "run-store",
    }
  )
);
