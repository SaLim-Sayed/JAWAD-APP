// src/stores/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Role } from '@/provider/NavigationParamsList';

type ActiveApp = 'Auth' | 'Admin' | 'Onboarding' | 'Client';
interface AuthData {
  token: string;
  role: Role;
  id: string;
  isCompleted: boolean;
  message?: string;
  nationality?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  activeApp: ActiveApp;
  authData: AuthData;
  stableEnabled: boolean;
  setAuthData: (data: Partial<AuthData>) => void;
  setStableEnabled: (enabled: boolean) => void;
    login: () => void;
  logout: () => void;
  setActiveApp: (app: ActiveApp) => void;
  loadAuthState: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  activeApp: 'Onboarding',
  authData: {
    token: '',
    role: 'auth',
    id: '',
    isCompleted: false,
  },
  stableEnabled: true,
  setStableEnabled: async (enabled: boolean) => {
    await AsyncStorage.setItem('stableEnabled', enabled.toString());
    set({ stableEnabled: enabled });  
  },  login: async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['isLoggedIn', 'activeApp', 'token', 'role', 'id', 'isCompleted']);
    set({
      isLoggedIn: false,
      activeApp: 'Onboarding',
      authData: {
        token: '',
        role: 'auth',
        id: '',
        isCompleted: false,
      },    
      stableEnabled: true,

    });
  },

  setActiveApp: async (app) => {
    await AsyncStorage.setItem('activeApp', app);
    set({ activeApp: app });
  },

  setAuthData: async (data) => {
    // Save individual fields in AsyncStorage
    if (data.token !== undefined) await AsyncStorage.setItem('token', data.token);
    if (data.role !== undefined) await AsyncStorage.setItem('role', data.role);
    if (data.id !== undefined) await AsyncStorage.setItem('id', data.id);
    if (data.isCompleted !== undefined) await AsyncStorage.setItem('isCompleted', data.isCompleted.toString());
    if (data.message !== undefined) await AsyncStorage.setItem('message', data.message);
    if (data.nationality !== undefined) await AsyncStorage.setItem('nationality', data.nationality);
    set((state) => ({
      authData: {
        ...state.authData,
        ...data,
      },
    }));
  },

  loadAuthState: async () => {
    const [isLoggedIn, activeApp, token, role, id, isCompleted, stableEnabled] = await Promise.all([
      AsyncStorage.getItem('isLoggedIn'),
      AsyncStorage.getItem('activeApp'),
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('role'),
      AsyncStorage.getItem('id'),
      AsyncStorage.getItem('isCompleted'),
      AsyncStorage.getItem('stableEnabled'),
    ]);

    set({
      isLoggedIn: isLoggedIn === 'true',
      activeApp: (activeApp as ActiveApp) || 'Onboarding',
      authData: {
        token: token || '',
        role: (role as Role) || 'auth',
        id: id || '',
        isCompleted: isCompleted === 'true',
      },
      stableEnabled: stableEnabled === 'true',
    });
  },
}));
