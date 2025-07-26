import { api } from "../api";
export default async function uploadKYC (formData: FormData){
  try {
    const response = await api.post("/auth/verify", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('KYC Upload Error:', error.response?.data || error.message);
    throw error;
  }
};
