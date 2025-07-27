import { api } from "../api";
const getTrendingItems = async ({ limit = 4 }: { page?: number; limit?: number }) => {
  const response = await api.get("/item/trending", {
    params: {  limit },
  });
  return response.data;
};

export default getTrendingItems;
