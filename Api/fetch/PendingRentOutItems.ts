// src/Api/fetch/PendingRentOutItems.ts
import { api } from "../api";

export async function getPendingRentOutItems() {
	try {
		const res = await api.get("/rent-order/rentOut", {
			 // Assuming backend supports this filter param
		});
		console.log("Pending onse:", res.data); // Debug log
		return res.data;
	} catch (error: any) {
		console.error("Fetch pending rent out items error:", error);
		throw error;
	}
}

export async function getPendingRentInItems() {
	try {
		const res = await api.get("/rent-order/rentIn", {
			 
		});
		console.log("Pending onse:", res.data); // Debug log
		return res.data;
	} catch (error: any) {
		console.error("Fetch pending rent out items error:", error);
		throw error;
	}
}
