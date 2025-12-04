import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

export const usePatientRecords = (patientId, enabled = true) => {
  return useQuery({
    queryKey: ['patient-records', patientId],
    queryFn: async () => {
      const response = await apiService.getPatientRecords(patientId);
      return response.records || [];
    },
    enabled: enabled && !!patientId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

