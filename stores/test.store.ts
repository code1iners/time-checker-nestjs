import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TestStore {
  value: number;
  increase: () => void;
}

export const useTestStore = create<TestStore>()(
  devtools((set) => ({
    value: 0,
    increase: () => set((state) => ({ value: state.value + 1 })),
  }))
);
