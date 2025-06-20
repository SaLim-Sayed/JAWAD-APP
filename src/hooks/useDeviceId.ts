import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';

const STORAGE_KEY = 'device_id';

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  function formatDeviceId(rawId: string): string {
    let cleanId = rawId.replace(/\./g, '');
    if (cleanId.length < 12) {
      cleanId += cleanId.slice(0, 12 - cleanId.length);
    }

    const shortId = cleanId.substring(0, 12);
    return shortId.match(/.{1,2}/g)?.join(':') ?? shortId;
  }

  useEffect(() => {
    const loadDeviceId = async () => {
      let storedId = await AsyncStorage.getItem(STORAGE_KEY);

      if (!storedId) {
        const rawId = await DeviceInfo.getUniqueId(); // Fetch unique device ID
        const newId = formatDeviceId(rawId);
        await AsyncStorage.setItem(STORAGE_KEY, newId);
        storedId = newId;
      }

      setDeviceId(storedId);
    };

    loadDeviceId();
  }, []);

  return deviceId;
};