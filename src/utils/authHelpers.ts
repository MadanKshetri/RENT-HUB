// utils/authHelpers.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/authStore';
export const loginAsync = async () => {
  await AsyncStorage.setItem('token', 'your-token-here'); // optional
  useAuthStore.getState().login();
};

export const logoutAsync = async () => {
  await AsyncStorage.removeItem('token');
  useAuthStore.getState().logout();
};
