import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LinkStore {
  deviceKey: string;
  setDeviceKey: (deviceKey: string) => Promise<void>;
}

export const useDeviceData = create<LinkStore>(set => ({
  deviceKey: '',

  setDeviceKey: async (deviceKey: string) => {
    try {
      await AsyncStorage.setItem('deviceKey', deviceKey);
      set({deviceKey: deviceKey});
    } catch (error) {
      console.error('Failed to save deviceKey:', error);
    }
  },
}));

// Load saved URL on app start
const initializeLinkStore = async () => {
  try {
    const key = (await AsyncStorage.getItem('deviceKey')) || '';
    useDeviceData.getState().setDeviceKey(key);
  } catch (error) {
    console.error('Failed to load deviceKey:', error);
  }
};

initializeLinkStore();
