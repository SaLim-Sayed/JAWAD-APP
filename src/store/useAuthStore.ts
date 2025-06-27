// src/stores/authStore.ts
import { create } from 'zustand';

type ActiveApp = 'Auth' | 'Admin' | 'Onboarding' | 'Client';

interface AuthState {
  isLoggedIn: boolean;
  activeApp: ActiveApp;
  login: () => void;
  logout: () => void;
  setActiveApp: (app: ActiveApp) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  activeApp: 'Client',  
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setActiveApp: (app: ActiveApp) => set({ activeApp: app }),
}));
