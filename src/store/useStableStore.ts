// src/store/stableStore.ts
import { create } from 'zustand';

interface StableStore {
  stableId: string;
  setStableId: (id: string) => void;
}

export const useStableStore = create<StableStore>((set) => ({
  stableId: '',
  setStableId: (id) => set({ stableId: id }),
}));
