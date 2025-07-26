// hooks/useKycMutation.ts
import { useMutation } from '@tanstack/react-query';
import uploadKYC from '../fetch/kycVerify';
export const useKycMutation = () => {
  return useMutation({
    mutationFn: uploadKYC,
  });
};
