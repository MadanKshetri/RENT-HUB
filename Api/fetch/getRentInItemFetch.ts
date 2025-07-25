import { api } from "../api"; // or your correct api path

export interface RentOrder {
  id: string;
  orderStatus: string;
  totalPrice: number;
  item: {
    id: string;
    name: string;
    rate: number;
    rateType: string;
    assets: { id: string; url: string; name: string }[];
  };
  rentStart: string;
  rentEnd: string;
  renter: { id: string; name: string };
  owner: { id: string; name: string };
  note: string;
}

export interface RentOrderResponse {
  message: string;
  data: RentOrder[];
  pagination: {
    previousPage: number;
    nextPage: number | null;
    total: number;
    count: number;
  };
}

export async function getRentedInItems({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<RentOrderResponse> {
  try {
    const res = await api.get("/rent-order/rentIn", {
      params: { page, limit },
    });
    return res.data;
  } catch (error: any) {
    console.error("Fetch RentIn Error:", error?.response?.data || error.message);
    throw error;
  }
}

