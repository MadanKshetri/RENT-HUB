// import itemsFetch from "@/Api/fetch/itemsFetch";
// import { queryKeys } from "@/constants/queryKey";
// import { useQuery } from "@tanstack/react-query";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { ItemsResponse } from "@/Api/fetch/itemsFetch";

// export const useGetItemsQuery = ({
//   search = "",
//   sortBy = "createdAt",
//   sortOrder = "desc",
//   limit = 10,
// }) => {
//   return useInfiniteQuery({
//     queryKey: [queryKeys.getItems, search, sortBy, sortOrder],
//     queryFn: ({ pageParam = 1 }) =>
//       itemsFetch({ page: Number(pageParam), limit, search, sortBy, sortOrder }),
//     getNextPageParam: (lastPage) => lastPage.pagination?.nextPage ?? undefined,
//   });
// };

import { queryKeys } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";
import itemsFetch, { ItemsResponse } from "../fetch/itemsFetch";

export const useGetItemsQuery = ({
	search = "",
	sortBy = "createdAt",
	sortOrder = "desc",
	limit = 10,
}) => {
	return useInfiniteQuery<
		ItemsResponse,
		Error,
		ItemsResponse,
		[string, string, string, string]
	>({
		queryKey: [queryKeys.getItems, search, sortBy, sortOrder],
		queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
			itemsFetch({ page: pageParam, limit, search, sortBy, sortOrder }),
		getNextPageParam: (lastPage) => lastPage.pagination?.nextPage ?? undefined,
	});
};
