import { api } from "../api";

export async function categoryId(categoryId: string) {
  const res = await api.get(`/categories/${categoryId}/items`);
  return res.data.data;
}
