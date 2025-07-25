// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthState {
//   user: any;
//   setUser: (user: any) => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//     }),
//     {
//       name: "auth-storage",
//       onRehydrateStorage: () => (state) => {
//         // Instead of using `set` directly here, call a setter function
//         if (state?.user) {
//           console.log("Rehydrated user:", state.user);
//         }
//       },
//     }
//   )
// );
