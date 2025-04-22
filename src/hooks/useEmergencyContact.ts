
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
    // First check if a record exists for this user
    const { data: existingContact } = await supabase
      .from('emergency_contact')
      .select('id')
      .eq('user_id', user?.id)
      .maybeSingle();
    
    let result;
    
    if (existingContact) {
      // Update existing record
      result = await supabase
        .from('emergency_contact')
        .update({
          contact_name: updates.contact_name,
          contact_number: updates.contact_number,
          contact_relation: updates.contact_relation
        })
        .eq('user_id', user?.id)
        .select()
        .single();
    } else {
      // Insert new record
      result = await supabase
        .from('emergency_contact')
        .insert({
          user_id: user?.id,
          contact_name: updates.contact_name,
          contact_number: updates.contact_number,
          contact_relation: updates.contact_relation
        })
        .select()
        .single();
    }
    
    if (result.error) throw result.error;
    return result.data;
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
