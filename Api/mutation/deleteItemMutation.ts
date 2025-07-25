// // src/Api/mutation/deleteItemMutation.ts
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteItem } from "../fetch/deleteItem";

// export const useDeleteItemMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteItem,
//     onSuccess: () => {
//       queryClient.invalidateQueries(); // Optional: refresh item list
//       console.log("Item deleted successfully");
//     },
//     onError: (error) => {
//       console.error("Failed to delete item:", error);
//     },
//   });
// };
// src/Api/mutation/deleteItemMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../fetch/deleteItem";

export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      // Invalidate relevant queries to refresh listings
      queryClient.invalidateQueries({queryKey:['pendingRentOutItems']});
      queryClient.invalidateQueries({queryKey:['rentedOutItems']});
      console.log("Item deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete item:", error);
    },
  });
};
