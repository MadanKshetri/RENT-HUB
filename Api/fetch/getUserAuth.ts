import { api } from "../api";

export default async function getUserAuth(){
    const res = await api.get("/auth/user")
    return res.data;
}