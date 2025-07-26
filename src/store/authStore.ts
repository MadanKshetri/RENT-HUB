// stores/useAuthStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthState = {
  isLoggedIn: boolean;
  showLoginPrompt: boolean;
  login: () => void;
  logout: () => void;
  dismissPrompt: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      showLoginPrompt: true,
      login: () => {
         AsyncStorage.removeItem("token")
        return set({ isLoggedIn: true, showLoginPrompt: false })},
      logout: () => set({ isLoggedIn: false, showLoginPrompt: true }),
      dismissPrompt: () => set({ showLoginPrompt: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
