
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Medication } from '@/types';

export const useMedications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchMedications = async () => {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    const { data, error } = await supabase
      .from('medications')
      .insert({
        user_id: user?.id,
        medication_name: medication.name,
        medication_strengthosage: medication.quantity,
        dosage: medication.dosage,
        start_date: medication.startDate,
        end_date: medication.endDate,
        time: medication.time,
        special_instructions: medication.instructions,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    const { data, error } = await supabase
      .from('medications')
      .update({
        medication_name: updates.name,
        medication_strengthosage: updates.quantity,
        dosage: updates.dosage,
        start_date: updates.startDate,
        end_date: updates.endDate,
        time: updates.time,
        special_instructions: updates.instructions,
      })
      .eq('id', id)
      .eq('user_id', user?.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteMedication = async (id: string) => {
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) throw error;
  };

  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', user?.id],
    queryFn: fetchMedications,
    enabled: !!user?.id,
  });

  const { mutateAsync: addMedicationMutation } = useMutation({
    mutationFn: addMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  const { mutateAsync: updateMedicationMutation } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Medication> }) =>
      updateMedication(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  const { mutateAsync: deleteMedicationMutation } = useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });

  return {
    medications,
    isLoading,
    addMedication: addMedicationMutation,
    updateMedication: updateMedicationMutation,
    deleteMedication: deleteMedicationMutation,
  };
};
