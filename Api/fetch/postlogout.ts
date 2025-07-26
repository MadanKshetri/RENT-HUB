import { api } from "../api";
export default async function logout(){
  const response = await api.post("auth/logout");
  return response.data;
};
