
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Procedure } from '@/types';

export const useProcedures = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchProcedures = async () => {
    const { data, error } = await supabase
      .from('procedures')
      .select('*')
      .eq('user_id', user?.id)
      .order('procedure_date', { ascending: true });

    if (error) throw error;
    
    // Map Supabase data to our frontend Procedure type
    return data.map(item => ({
      id: item.id,
      name: item.procedure_name || '',
      date: item.procedure_date || '',
      doctor: item.doctor_name || '',
      location: item.hospital_name || '',
    }));
  };

  const addProcedure = async (procedure: Omit<Procedure, 'id'>) => {
    const { data, error } = await supabase
      .from('procedures')
      .insert({
        user_id: user?.id,
        procedure_name: procedure.name,
        procedure_date: procedure.date,
        doctor_name: procedure.doctor,
        hospital_name: procedure.location,
      })
      .select()
      .single();

    if (error) throw error;
    
    // Map to frontend type
    return {
      id: data.id,
      name: data.procedure_name || '',
      date: data.procedure_date || '',
      doctor: data.doctor_name || '',
      location: data.hospital_name || '',
    };
  };

  const updateProcedure = async (id: string, updates: Partial<Procedure>) => {
    const { data, error } = await supabase
      .from('procedures')
      .update({
        procedure_name: updates.name,
        procedure_date: updates.date,
        doctor_name: updates.doctor,
        hospital_name: updates.location,
      })
      .eq('id', id)
      .eq('user_id', user?.id)
      .select()
      .single();

    if (error) throw error;
    
    // Map to frontend type
    return {
      id: data.id,
      name: data.procedure_name || '',
      date: data.procedure_date || '',
      doctor: data.doctor_name || '',
      location: data.hospital_name || '',
    };
  };

  const deleteProcedure = async (id: string) => {
    const { error } = await supabase
      .from('procedures')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) throw error;
  };

  const { data: procedures, isLoading } = useQuery({
    queryKey: ['procedures', user?.id],
    queryFn: fetchProcedures,
    enabled: !!user?.id,
  });

  const { mutateAsync: addProcedureMutation } = useMutation({
    mutationFn: addProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });
    },
  });

  const { mutateAsync: updateProcedureMutation } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Procedure> }) =>
      updateProcedure(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });
    },
  });

  const { mutateAsync: deleteProcedureMutation } = useMutation({
    mutationFn: deleteProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });
    },
  });

  return {
    procedures: procedures || [],
    isLoading,
    addProcedure: addProcedureMutation,
    updateProcedure: updateProcedureMutation,
    deleteProcedure: deleteProcedureMutation,
  };
};
