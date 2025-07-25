// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "../api";

// export const useAcceptRequestMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => api.patch(`/rent-order/${id}/accept`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
//       queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
//     },
//   });
// };
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Toast from "react-native-toast-message";
// import accepted from "../fetch/acceptRentOrder";

// export const useAcceptRequestMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: accepted,
//     onSuccess: (data) => {
//       console.log("✅ Accept success response:", data);
//       queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
//       queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
//       Toast.show({ type: "success", text1: "Request accepted" });
//     },
//     onError: (error) => {
//       console.error("❌ Accept request error:", error);
//       Toast.show({ type: "error", text1: "Failed to accept request" });
//     },
//   });
// };


// hooks/useAcceptRequestMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import accepted from "../fetch/acceptRentOrder";

export const useAcceptRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accepted,
    onSuccess: (data) => {
      console.log("✅ Accept success response:", data);
      queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
      queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
      Toast.show({ type: "success", text1: "Request accepted" });
    },
    onError: (error: any) => {
      console.error("❌ Accept request error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to accept request",
        text2: error?.response?.data?.message || "Unknown error",
      });
    },
  });
};


