
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const usePatientData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchPatientData = async () => {
    // First fetch patient data
    const { data: patientData, error: patientError } = await supabase
      .from('patient_table')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (patientError) throw patientError;

    // Then fetch emergency contact data
    const { data: emergencyContact, error: emergencyError } = await supabase
      .from('emergency_contact')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (emergencyError) throw emergencyError;

    // Combine the data
    return {
      ...patientData,
      emergencyContact: emergencyContact || null
    };
  };

  const updatePatientData = async (updates: {
    pateint_name?: string;
    patient_dob?: string;
    patient_height?: number;
    patient_weight?: number;
    gender?: string;
    blood_group?: string;
    allergies?: string;
  }) => {
    const { data, error } = await supabase
      .from('patient_table')
      .update(updates)
      .eq('id', user?.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const { data: patientData, isLoading } = useQuery({
    queryKey: ['patientData', user?.id],
    queryFn: fetchPatientData,
    enabled: !!user?.id,
  });

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: updatePatientData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientData'] });
    },
  });

  return {
    patientData,
    isLoading,
    updateProfile,
  };
};
