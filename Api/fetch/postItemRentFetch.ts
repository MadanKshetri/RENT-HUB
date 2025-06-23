import { api } from "../api";

export default async function postItemForRent(
  id: string, 
  data: {
    note: string;
    startDate: string;
    endDate: string;
  }
) {


    console.log("hello1123",id, data)
  
    const res = await api.post(`/item/${id}/rent`, data);

    console.log("lkasdfjlasd", res);
    
    return res.data; 
  
}

