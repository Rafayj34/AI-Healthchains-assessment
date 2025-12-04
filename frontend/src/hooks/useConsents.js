import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

export const useConsents = (status = null, patientId = null) => {
  return useQuery({
    queryKey: ['consents', status, patientId],
    queryFn: async () => {
      const response = await apiService.getConsents(patientId, status);
      return response.consents || [];
    },
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useCreateConsent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (consentData) => {
      return await apiService.createConsent(consentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consents'] });
    },
  });
};

export const useUpdateConsent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      return await apiService.updateConsent(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consents'] });
    },
  });
};

