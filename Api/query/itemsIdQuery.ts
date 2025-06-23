// import { queryKeys } from "@/constants/queryKey";
// import { useQuery } from "@tanstack/react-query";
// import { ItemsIdFetch } from "../fetch/itemsIdFetch";

// // Update the hook to accept the itemId
// export const useGetItemIdQuery = (itemId: string | undefined) => {
//   return useQuery({

//     queryKey: [queryKeys.getItemsId, itemId],
//     queryFn: async () => {
//       if (!itemId) {
        
//         throw new Error("Item ID is required to fetch item details.");
//       }
//       return ItemsIdFetch(itemId);
//     },
    
//     enabled: !!itemId, 
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { ItemsIdFetch } from "../fetch/itemsIdFetch";

export const useGetItemIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => ItemsIdFetch(id),
  });
};
