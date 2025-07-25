import { api } from "../api";

export default async function accepted(id:string) {
  console.log("Accept request", id)

  const res = await api.patch(`/rent-order/${id}/accept`, null )

  return res.data
  
}