  // src/hooks/useSignInMutation.ts
  import { useMutation } from "@tanstack/react-query";
import signInFetch from "../fetch/signInFetcher";

  export const useSignInMutation = () => {
    return useMutation({
      mutationFn: ({ email, password }: { email: string; password: string }) =>
        signInFetch(email, password),
    });
  };
