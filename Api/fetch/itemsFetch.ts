import { api } from "../api";

export async function itemsFetch (){
    const res = await api.get("/item");
    return res.data.data
}