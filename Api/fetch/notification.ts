// src/Api/notificationsApi.ts
import { api } from "@/Api/api";

export const fetchNotifications = async (userId: string) => {
  const res = await api.get(`/notifications/${userId}`);
  return res.data; // Ensure this returns Notification[]
};
