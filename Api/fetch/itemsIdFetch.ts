import { api } from "../api";

export async function ItemsIdFetch(id: string) { 
  
    const res = await api.get(`item/${id}`); 
    return res.data;
  }
