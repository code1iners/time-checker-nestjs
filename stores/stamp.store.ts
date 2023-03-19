import { StampObject } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StampState {
  stamps: StampObject[];
  createStamp: (newStamp: StampObject) => void;
  deleteStamp: (id: string) => void;
  setStamps: (newStamps: StampObject[]) => void;
  moveStamp: (sourceIndex: number, destinationIndex?: number) => void;
  updateStamp: (id: string, isGenerate: boolean) => void;
}

export const useStampStore = create<StampState>()(
  devtools(
    persist(
      (set) => ({
        stamps: [],
        setStamps: (newStamps) => set((_) => ({ stamps: newStamps })),
        createStamp: (newStamp) =>
          set((state) => ({ stamps: [...state.stamps, newStamp] })),
        deleteStamp: (id) =>
          set((state) => {
            const filtered = state.stamps.filter((stamp) => stamp.id !== id);
            return { stamps: filtered };
          }),
        moveStamp: (sourceIndex, destinationIndex) =>
          set((state) => {
            const copied = [...state.stamps];
            const [removed] = copied.splice(sourceIndex, 1);
            if (destinationIndex !== null && destinationIndex !== undefined) {
              copied.splice(destinationIndex, 0, removed);
            }
            return { stamps: copied };
          }),
        updateStamp: (id, isGenerate) =>
          set((state) => {
            const foundItem = state.stamps.find((item) => item.id === id);
            if (foundItem) {
              foundItem.value = isGenerate ? Date.now() : 0;
            }
            return { stamps: state.stamps };
          }),
      }),
      { name: "stamps-storage" }
    ),
    { enabled: process.env.NODE_ENV === "development" }
  )
);
