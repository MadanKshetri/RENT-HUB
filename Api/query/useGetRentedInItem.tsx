import { getRentedInItems } from "@/Api/fetch/getRentInItemFetch";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

// Define query key and optional query params
type RentInQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
};

export function useGetRentedInItemsQuery(params?: RentInQueryParams) {
  return useQuery({
    queryKey: [queryKeys.getItemsRentIn],
    queryFn: () => getRentedInItems(params || {}),
  }); 
}
