// import { api } from "../api";

// export async function getRentedOutItems (){
//     const res = await api.get("/dashboard/rentout")
//     return res.data
// }

import { api } from "../api";

type RentOutQueryParams = {
	search?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	limit?: number;
	page?: number;
};

export async function getRentedOutItems(params: RentOutQueryParams = {}) {
  try {
    const defaultParams = {
      search: '',
      sortBy: 'name',         // valid default
      sortOrder: 'desc',      // must be 'asc' or 'desc'
      limit: 10,              // fallback number
      page: 1,                // fallback page
    };

    const finalParams = { ...defaultParams, ...params };

    console.log("Sending final params:", finalParams);

    const res = await api.get("/dashboard/rentout", { params: finalParams });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
}
