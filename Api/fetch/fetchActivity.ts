// src/Api/fetch/fetchActivity.ts
import { api } from "../api";
export interface ActivityParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export const fetchActivity = async (params?: ActivityParams) => {
  const response = await api.get("/activity", {
    params,
  });

  return response.data;
};
