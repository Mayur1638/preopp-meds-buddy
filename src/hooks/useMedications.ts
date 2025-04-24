import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Medication } from '@/types';

export const useMedications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user?.id)    
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        id: item.id,
        name: item.medication_name || '',
        quantity: item.medication_strengthosage || '',
        dosage: item.dosage || '',
        startDate: item.start_date || '',
        endDate: item.end_date || '',
        time: item.time || '',
        instructions: item.special_instructions || '',
        status: item.status || 'not_taken'
      }));
    } catch (error) {
      console.error("Error fetching medications:", error);
      return [];
    }
  };

  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    try {
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
          status: 'not_taken'
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding medication:", error);
        return {
          id: `temp-${Date.now()}`,
          ...medication,
          status: 'not_taken'
        };
      }
      
      return {
        id: data.id,
        name: data.medication_name || '',
        quantity: data.medication_strengthosage || '',
        dosage: data.dosage || '',
        startDate: data.start_date || '',
        endDate: data.end_date || '',
        time: data.time || '',
        instructions: data.special_instructions || '',
        status: data.status || 'not_taken'
      };
    } catch (error) {
      console.error("Error adding medication:", error);
      return {
        id: `temp-${Date.now()}`,
        ...medication,
        status: 'not_taken'
      };
    }
  };

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    try {
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
          status: updates.status || 'not_taken'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Error updating medication:", error);
        return {
          id,
          ...updates,
          status: updates.status || 'not_taken'
        };
      }
      
      return {
        id: data.id,
        name: data.medication_name || '',
        quantity: data.medication_strengthosage || '',
        dosage: data.dosage || '',
        startDate: data.start_date || '',
        endDate: data.end_date || '',
        time: data.time || '',
        instructions: data.special_instructions || '',
        status: data.status || 'not_taken'
      };
    } catch (error) {
      console.error("Error updating medication:", error);
      return {
        id,
        ...updates,
        status: updates.status || 'not_taken'
      };
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting medication:", error);
      }
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
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
    medications: medications || [],
    isLoading,
    addMedication: addMedicationMutation,
    updateMedication: updateMedicationMutation,
    deleteMedication: deleteMedicationMutation,
  };
};
