// src/Api/query/useGetActivityQuery.ts
import { useQuery } from "@tanstack/react-query";
import { ActivityParams, fetchActivity } from "../fetch/fetchActivity";

export const useGetActivityQuery = (params?: ActivityParams) => {
  return useQuery({
    queryKey: ["activity", params],
    queryFn: () => fetchActivity(params),
  });
};
