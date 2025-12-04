import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

export const useTransactions = (walletAddress = null, limit = 100) => {
  return useQuery({
    queryKey: ['transactions', walletAddress, limit],
    queryFn: async () => {
      const response = await apiService.getTransactions(walletAddress, limit);
      return response.transactions || [];
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

