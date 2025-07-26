// // useLogoutMutation.ts
// import { useMutation } from "@tanstack/react-query";
// import logout from "../fetch/postlogout";
// export const useLogoutMutation = () => {
//   return useMutation({
//     mutationFn: logout,
//     onSuccess: (data) => {
//       console.log("Logout successful:", data.message);
//       // Optional: Clear localStorage or Zustand state here
//     },
//     onError: (error: any) => {
//       console.error("Logout error:", error.response?.data || error.message);
//     },
//   });
// };
// mutations/useLogoutMutation.ts
// mutations/useLogoutMutation.ts
import { logoutAsync } from '@/src/utils/authHelpers';
import { useMutation } from '@tanstack/react-query';
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutAsync,
    // onSuccess: async () => {
    //   await logoutAsync(); // clears AsyncStorage + Zustand
    // },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};

