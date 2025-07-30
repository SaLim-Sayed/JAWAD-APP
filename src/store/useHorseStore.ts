// src/store/useHorseStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HorseDetail, Horse } from '@/packages/Client/Services/@types/horse.types';

interface CartItem {
  horse: Horse | HorseDetail;
  quantity: number;
  type: string; // e.g., "Photo_session", "Riding", etc.
  sessionDate?: string;
  sessionTime?: string;
}

interface HorseStore {
  // Cart items
  cartItems: CartItem[];
  
  // Selected horse for booking
  selectedHorse: Horse | HorseDetail | null;
  
  // Stored/Favorite horses
  storedHorses: (Horse | HorseDetail)[];
  
  // Cart actions
  addToCart: (horse: Horse | HorseDetail, type: string, options?: { sessionDate?: string; sessionTime?: string }) => void;
  removeFromCart: (horseId: string, type: string) => void;
  updateCartItemQuantity: (horseId: string, type: string, quantity: number) => void;
  clearCart: () => void;
  
  // Selection actions
  setSelectedHorse: (horse: Horse | HorseDetail | null) => void;
  
  // Storage actions
  storeHorse: (horse: Horse | HorseDetail) => void;
  removeStoredHorse: (horseId: string) => void;
  clearStoredHorses: () => void;
  
  // Getters
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isHorseInCart: (horseId: string, type: string) => boolean;
  isHorseStored: (horseId: string) => boolean;
}

export const useHorseStore = create<HorseStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedHorse: null,
      storedHorses: [],

      addToCart: (horse, type, options = {}) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(
          item => item.horse._id === horse._id && item.type === type
        );

        if (existingItem) {
          // Update quantity if item already exists
          set({
            cartItems: cartItems.map(item =>
              item.horse._id === horse._id && item.type === type
                ? { ...item, quantity: item.quantity + 1, ...options }
                : item
            )
          });
        } else {
          // Add new item to cart
          set({
            cartItems: [
              ...cartItems,
              {
                horse,
                quantity: 1,
                type,
                ...options
              }
            ]
          });
        }
      },

      removeFromCart: (horseId, type) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter(
            item => !(item.horse._id === horseId && item.type === type)
          )
        });
      },

      updateCartItemQuantity: (horseId, type, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(horseId, type);
          return;
        }

        const { cartItems } = get();
        set({
          cartItems: cartItems.map(item =>
            item.horse._id === horseId && item.type === type
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      setSelectedHorse: (horse) => {
        set({ selectedHorse: horse });
      },

      storeHorse: (horse) => {
        const { storedHorses } = get();
        const isAlreadyStored = storedHorses.some(stored => stored._id === horse._id);
        
        if (!isAlreadyStored) {
          set({ storedHorses: [...storedHorses, horse] });
        }
      },

      removeStoredHorse: (horseId) => {
        const { storedHorses } = get();
        set({
          storedHorses: storedHorses.filter(horse => horse._id !== horseId)
        });
      },

      clearStoredHorses: () => {
        set({ storedHorses: [] });
      },

      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
          return total + (item.horse.price * item.quantity);
        }, 0);
      },

      getCartItemsCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },

      isHorseInCart: (horseId, type) => {
        const { cartItems } = get();
        return cartItems.some(
          item => item.horse._id === horseId && item.type === type
        );
      },

      isHorseStored: (horseId) => {
        const { storedHorses } = get();
        return storedHorses.some(horse => horse._id === horseId);
      }
    }),
    {
      name: 'horse-storage', // unique name for the storage
      storage: createJSONStorage(() => AsyncStorage),
      // Persist both cart items and stored horses
      partialize: (state) => ({
        cartItems: state.cartItems,
        storedHorses: state.storedHorses,
        // Don't persist selectedHorse as it should be session-based
      }),
    }
  )
);