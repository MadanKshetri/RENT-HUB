import { api } from "../api";

export default async function signUpFetch(values: any) {

	const res = await api.post("auth/register", values);

	// console.log(res);
	
	return res.data;
}


