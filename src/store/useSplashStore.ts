import { create } from "zustand";

interface SplashState {
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}

export const useSplashStore = create<SplashState>((set) => ({
  showSplash: true,
  setShowSplash: (show: boolean) => set({ showSplash: show }),
}));