// /Api/query/useActiveListings.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useActiveListings = () => {
  return useQuery({
    queryKey: ['activeListings'],
    queryFn: async () => {
      const res = await api.get('/items/owner?status=active');
      return res.data;
    },
  });
};
