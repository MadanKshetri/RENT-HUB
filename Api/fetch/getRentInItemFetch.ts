// import { api } from "../api";

// type RentOutQueryParams = {
//     search?: string;
//     sortBy?: string;
//     sortOrder?: "asc" | "desc";
//     limit?: number;
//     page?: number;
// };

// export async function getRentedInItems(params: RentOutQueryParams = {}) {
//   try {
//     const defaultParams = {
//       search: '',
//       sortBy: 'name',         // valid default
//       sortOrder: 'desc',      // must be 'asc' or 'desc'
//       limit: 10,              // fallback number
//       page: 1,                // fallback page
//     };

//     const finalParams = { ...defaultParams, ...params };

//     console.log("Sending final params:", finalParams);

//     const res = await api.get("/rent-order", { params: finalParams });
//     return res.data;
//   } catch (error: any) {
//     if (error.response) {
//       console.error("Server responded with:", error.response.data);
//     } else {
//       console.error("Unexpected error:", error.message);
//     }
//     throw error;
//   }
// }

import { api } from "../api"; // or your correct api path

type RentInQueryParams = {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
};

export async function getRentedInItems(params: RentInQueryParams = {}) {
  try {
    // Default fallback params
    const defaultParams = {
      search: "",
      sortBy: "name",   // Important: your API must support this field
      sortOrder: "desc",
      limit: 10,
      page: 1,
    };

    const finalParams = { ...defaultParams, ...params };

    console.log("Sending rent-in params:", finalParams);

    const res = await api.get("/rent-order", { params: finalParams });
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
