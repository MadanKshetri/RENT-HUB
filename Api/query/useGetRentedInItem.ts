import { getRentedInItems } from "@/Api/fetch/getRentInItemFetch";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

// Define query key and optional query params
export type RentInQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
  orderStatus?: string;
};

export function useGetRentedInItemsQuery(params: RentInQueryParams = {}) {
  return useQuery({
    queryKey: [
      queryKeys.getItemsRentIn,
      params.search || "",
      params.sortBy || "",
      params.sortOrder || "",
      params.limit || 10,
      params.page || 1,
      params.orderStatus || "", 
    ],
    queryFn: () => getRentedInItems(params),
    keepPreviousData: true, // optional: for smooth pagination
  });
}
