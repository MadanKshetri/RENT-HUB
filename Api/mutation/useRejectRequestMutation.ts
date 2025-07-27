import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import rejected from "../fetch/rejectRentOrder";

export const useRejectRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejected,
    onSuccess: (data) => {
      console.log("Reject success response:", data);
      queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
      queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
      Toast.show({ type: "success", text1: "Request rejected" });
    },
    onError: (error: any) => {
      console.error("Reject request error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to reject request",
        text2: error?.response?.data?.message || "Unknown error",
      });
    },
  });
};
