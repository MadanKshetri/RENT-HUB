import { useQuery } from "@tanstack/react-query";
import getTrendingItems from "../fetch/trending";

export const useGetTrendingItemsQuery = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["trendingItems", page, limit],
    queryFn: () => getTrendingItems({ page, limit }),
  });
};
