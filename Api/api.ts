import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';


export const unauthApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL 
})

export const api = axios.create({
    baseURL:process.env.EXPO_PUBLIC_API_URL,
    headers:{
        "content-type": "application/json"
    }
    
}); 

api.interceptors.request.use(
  // Wrapping async logic in a function that returns a Promise<AxiosRequestConfig>
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);