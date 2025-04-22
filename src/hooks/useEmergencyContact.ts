
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface EmergencyContact {
  contact_name: string;
  contact_number: number;
  contact_relation: string;
}

export const useEmergencyContact = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchEmergencyContact = async () => {
    const { data, error } = await supabase
      .from('emergency_contact')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  };

  const updateEmergencyContact = async (updates: EmergencyContact) => {
    const { data, error } = await supabase
      .from('emergency_contact')
      .upsert(
        {
          user_id: user?.id,
          ...updates
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const { data: emergencyContact, isLoading } = useQuery({
    queryKey: ['emergencyContact', user?.id],
    queryFn: fetchEmergencyContact,
    enabled: !!user?.id,
  });

  const { mutateAsync: updateContact } = useMutation({
    mutationFn: updateEmergencyContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergencyContact'] });
    },
  });

  return {
    emergencyContact,
    isLoading,
    updateContact,
  };
};
