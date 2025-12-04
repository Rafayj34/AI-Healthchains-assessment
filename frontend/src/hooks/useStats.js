import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiService.getStats();
      return response;
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds to keep stats fresh
  });
};

