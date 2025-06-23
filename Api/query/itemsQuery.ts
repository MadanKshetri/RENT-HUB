// import { queryKeys } from "@/constants/queryKey";
// import { useQuery } from "@tanstack/react-query";
// import itemsFetch from "../fetch/itemsFetch";
// export const useGetItemsQuery = () =>{
// return useQuery({
//     queryFn: itemsFetch,    
//     queryKey:[queryKeys.getItems]
// })
// }

import { queryKeys } from "@/constants/queryKey"
import { useQuery } from "@tanstack/react-query"
import { itemsFetch } from "../fetch/itemsFetch"

export const  useGetItemsQuery = () =>{
    return useQuery({
        queryFn: itemsFetch,
        queryKey: [queryKeys.getItems]
    })
}