// src/stores/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ActiveApp = 'Auth' | 'Admin' | 'Onboarding' | 'Client';

interface AuthState {
  isLoggedIn: boolean;
  activeApp: ActiveApp;
  token: string;
  setToken: (token: string) => void;
  login: () => void;
  logout: () => void;
  setActiveApp: (app: ActiveApp) => void;
  loadAuthState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  activeApp: 'Onboarding',
  token: '',
  login: async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    set({ isLoggedIn: true });
  },
  setToken: async (token) => {
    await AsyncStorage.setItem('token', token);
    set({ token });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['isLoggedIn', 'activeApp']);
    set({ isLoggedIn: false, activeApp: 'Onboarding' });
  },

  setActiveApp: async (app) => {
    await AsyncStorage.setItem('activeApp', app);
    set({ activeApp: app });
  },

  loadAuthState: async () => {
    const [isLoggedIn, activeApp] = await Promise.all([
      AsyncStorage.getItem('isLoggedIn'),
      AsyncStorage.getItem('activeApp'),
    ]);

    set({
      isLoggedIn: isLoggedIn === 'true',
      activeApp: (activeApp as ActiveApp) || 'Onboarding',
    });
  },
}));
