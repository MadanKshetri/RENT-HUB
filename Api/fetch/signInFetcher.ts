import { api } from "../api";
 export default async function signInFetch (email:string, password:string){
    const res = await api.post("/auth/login",{
      email,
      password,
    });
   //  console.log(res)
    return res.data
 }