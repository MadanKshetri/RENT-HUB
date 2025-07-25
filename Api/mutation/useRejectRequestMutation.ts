// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "../api";

// export const useRejectRequestMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => api.patch(`/rent-order/${id}/reject`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
//     },
//   });
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { api } from "../api";

export const useRejectRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.patch(`/rent-order/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
      queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
      Toast.show({ type: "success", text1: "Request rejected" });
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Failed to reject request" });
    },
  });
};
