import { api } from "../api";


export default async function categoriesFetch(){
   const res = await api.get("/category")
   return res.data
}

export  async function categotiesIdFetch (){
 const res = await api.get(`/categoty/{id}`)
 return res.data
}