import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import categoriesFetch from "../fetch/categoriesFetch";

export  const useCategoriesQuery = () => {
    return useQuery({
        queryKey: [queryKeys.getCategory],
        queryFn: categoriesFetch
    })
}
