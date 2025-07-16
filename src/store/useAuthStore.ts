// src/stores/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Role } from '@/provider/NavigationParamsList';

type ActiveApp = 'Auth' | 'Admin' | 'Onboarding' | 'Client';

interface AuthState {
  isLoggedIn: boolean;
  activeApp: ActiveApp;
  token: string;
  role:Role;
  setToken: (token: string) => void;
  login: () => void;
  logout: () => void;
  setActiveApp: (app: ActiveApp) => void;
  setRole: (role: Role) => void;
  loadAuthState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  activeApp: 'Onboarding',
  token: '',
  role:"auth",
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

  setRole: async (role) => {
    await AsyncStorage.setItem('role', role);
    set({ role });
  },

  loadAuthState: async () => {
    const [isLoggedIn, activeApp,role] = await Promise.all([
      AsyncStorage.getItem('isLoggedIn'),
      AsyncStorage.getItem('activeApp'),
      AsyncStorage.getItem('role'),
    ]);

    set({
      isLoggedIn: isLoggedIn === 'true',
      activeApp: (activeApp as ActiveApp) || 'Onboarding',
      role: (role as Role) || 'auth',
    });
  },
}));
