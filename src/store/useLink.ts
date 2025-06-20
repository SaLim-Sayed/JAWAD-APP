import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LinkStore {
  m3uUrl: string;
  setM3uUrl: (url: string) => Promise<void>;
}

export const useLink = create<LinkStore>(set => ({
  m3uUrl: '',

  setM3uUrl: async (url: string) => {
    try {
      await AsyncStorage.setItem('m3uUrl', url);
      set({m3uUrl: url});
    } catch (error) {
      console.error('Failed to save m3uUrl:', error);
    }
  },
}));

// Load saved URL on app start
const initializeLinkStore = async () => {
  try {
    const storedUrl = (await AsyncStorage.getItem('m3uUrl')) || '';
    useLink.getState().setM3uUrl(storedUrl);
  } catch (error) {
    console.error('Failed to load m3uUrl:', error);
  }
};

initializeLinkStore();
