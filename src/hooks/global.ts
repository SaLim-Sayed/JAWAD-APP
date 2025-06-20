import { Platform } from "react-native";

const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  };
  
   const generateRandomPadding = (length: number) => {
    return Array.from({ length }, getRandomChar).join("");
  };
  const formatToMacStyle = (id: string) => {
    const clean = id.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const needed = 12 - clean.length;
    const padded = clean + generateRandomPadding(needed > 0 ? needed : 0);
    return padded.slice(0, 12).match(/.{2}/g)?.join(":") ?? padded;
  };

  export const isAndroid = Platform.OS === 'android';
  export const isIOS = Platform.OS === 'ios';
  

  export { formatToMacStyle };