import { categoryId } from "@/Api/fetch/getCategoriesId";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useCategoryItemsQuery = (categoryIdParam: string) => {
  console.log("catgoryId",categoryIdParam)
  return useQuery({
    queryKey: [queryKeys.getCategoryItems, categoryIdParam],
    queryFn: () => categoryId(categoryIdParam),
    enabled: !!categoryIdParam, // Ensures the query only runs when ID is available
  });
};
