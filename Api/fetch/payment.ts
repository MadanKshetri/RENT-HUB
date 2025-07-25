import { api } from "../api";
export const handleKhaltiPayment = async (rentOrderId: string) => {
  try {
    const response = await api.post("/payment/verify/khalti", {
      provider: "khalti",
      rentOrderId: rentOrderId,
    });

    console.log("Payment verified successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Payment verification failed:", error);
    throw error;
  }
};
