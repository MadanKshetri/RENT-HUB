import { useMutation } from '@tanstack/react-query';
import signUpFetch from '../fetch/signUpFetcher';

export const useSignUpMutation = () =>{
    return useMutation({
        mutationFn: (values: any) => signUpFetch(values),
 });
}
