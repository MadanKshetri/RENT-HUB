// src/Api/query/useGetPendingRentOutItemsQuery.ts
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getPendingRentInItems, getPendingRentOutItems } from "../fetch/PendingRentOutItems";

export function useGetPendingRentOutItemsQuery() {
  return useQuery({
    queryKey: [queryKeys.getpendingItem], // Make sure this key is unique & consistent
    queryFn: getPendingRentOutItems,
    staleTime:0, 
   
    // optional caching 5 min
     
  });
}

export function useGetPendingRentInItemsQuery() {
  return useQuery({
    queryKey: [queryKeys.getPendingItem], // Make sure this key is unique & consistent
    queryFn: getPendingRentInItems,
    staleTime: 0, // optional caching 5 min
     
  });
}



