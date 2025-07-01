import { api } from "../api";

export async function categoryId(categoryId: string) {
  console.log("message",categoryId)
  const res = await api.get(`/item?categoryId=${categoryId}`);
    console.log("Raw API response:", res);
      console.log("Response data:", res.data);
  
  return res.data;  
}
