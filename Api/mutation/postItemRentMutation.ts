import { useMutation } from "@tanstack/react-query";
import postItemForRent from "../fetch/postItemRentFetch";

type PostItemForRentInput = {
  id: string; 
  note: string;
  startDate: string;
  endDate: string;
};

export const usePostItemRentMutation = () => {
  return useMutation({
    mutationFn: (data: PostItemForRentInput) =>
      postItemForRent(data.id, {
        note: data.note,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
  });
};