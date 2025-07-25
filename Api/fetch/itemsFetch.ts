// import { api } from "../api";

// export default async function itemsFetch (){
//     const res = await api.get("/item");
//     return res.data.data
// }

import { api } from "../api";

export interface Item {
  id: string;
  name: string;
  rate: number;
  rateType: string;
  assets: { id: string; url: string; name: string }[];
  // Add other fields as needed
}

export interface ItemsResponse {
  data: Item[];
  pagination: {
    previousPage: number;
    nextPage: number | null;
    total: number;
    count: number;
  };
  message: string;
}

export default async function itemsFetch({
  page = 1,
  limit = 20,
  search = "",
  sortBy = "updatedAt",
  sortOrder = "asc",
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<ItemsResponse> {
  const res = await api.get("/item", {
    params: {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    },
  });


  return res.data;
  // typed as ItemsResponse
}
