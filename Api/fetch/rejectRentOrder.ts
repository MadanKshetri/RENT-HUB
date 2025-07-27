import { api } from "../api";

export default async function rejected(id: string) {
  console.log("Reject request", id);

  const res = await api.patch(`/rent-order/${id}/status`, {
    status: "rejected",
  });

  return res.data;
}
