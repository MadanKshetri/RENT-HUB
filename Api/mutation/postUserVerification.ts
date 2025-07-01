import { useMutation } from "@tanstack/react-query";
import authVerify, { VerifyDocumentParams } from "../fetch/userVerification";

export function useVerifyDocumentMutation() {
  return useMutation({
    mutationFn: (data: VerifyDocumentParams) => authVerify(data),
  });
}
