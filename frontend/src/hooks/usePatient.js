import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

export const usePatient = (patientId, enabled = true) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      const response = await apiService.getPatient(patientId);
      return response;
    },
    enabled: enabled && !!patientId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

