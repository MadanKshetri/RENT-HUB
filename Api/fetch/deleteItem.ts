// src/Api/fetch/deleteItem.ts
import { api } from "../api";
export const deleteItem = async (id: string) => {
  const response = await api.delete(`/item/${id}`);
  return response.data;
};
