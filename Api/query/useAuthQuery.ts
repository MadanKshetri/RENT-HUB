import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import getUserAuth from "../fetch/getUserAuth";

export default function useAuthUserQuery(){
    return useQuery({
        queryKey:[queryKeys.getUserInfo],
         queryFn:() => getUserAuth()
    })
}