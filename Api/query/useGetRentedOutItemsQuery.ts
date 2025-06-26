import { getRentedOutItems } from "@/Api/fetch/getRentOutItemFetch";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

// Define query key and optional query params
type RentOutQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
};

export function useGetRentedOutItemsQuery(params?: RentOutQueryParams) {
  return useQuery({
    queryKey: [queryKeys.getItemsRentOut],
    queryFn: () => getRentedOutItems(params || {}),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
