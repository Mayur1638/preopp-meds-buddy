
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Medication } from '@/types';
import { 
  fetchMedications, 
  addMedicationToDb, 
  updateMedicationInDb, 
  deleteMedicationFromDb 
} from '@/api/medicationService';

export const useMedications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', user?.id],
    queryFn: () => fetchMedications(user?.id),
    enabled: !!user?.id,
  });

  const { mutateAsync: addMedication } = useMutation({
    mutationFn: (medication: Omit<Medication, 'id'>) => 
      addMedicationToDb(medication, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  const { mutateAsync: updateMedication } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Medication> }) =>
      updateMedicationInDb(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  const { mutateAsync: deleteMedication } = useMutation({
    mutationFn: deleteMedicationFromDb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  return {
    medications: medications || [],
    isLoading,
    addMedication,
    updateMedication,
    deleteMedication,
  };
};
