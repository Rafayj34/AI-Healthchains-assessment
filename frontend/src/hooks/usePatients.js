import { useQuery,  } from '@tanstack/react-query';
import { apiService } from '../services/apiService';


export const usePatients = ({ page = 1, limit = 10, search = '', enabled = true } = {}) => {
  return useQuery({
    queryKey: ['patients', page, limit, search],
    queryFn: async () => {
      const response = await apiService.getPatients(page, limit, search);
      return response;
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000, 
  });
};

