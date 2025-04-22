
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Patient, EmergencyContact, Medication, Procedure } from '@/types';

export function useSupabase() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const fetchPatient = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('patient_list')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data as Patient;
    } catch (error: any) {
      toast({
        title: 'Error fetching patient data',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmergencyContact = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('emergency_contact')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data as EmergencyContact;
    } catch (error: any) {
      toast({
        title: 'Error fetching emergency contact',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMedications = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Medication[];
    } catch (error: any) {
      toast({
        title: 'Error fetching medications',
        description: error.message,
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchProcedures = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('procedures')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data as Procedure[];
    } catch (error: any) {
      toast({
        title: 'Error fetching procedures',
        description: error.message,
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPatient,
    fetchEmergencyContact,
    fetchMedications,
    fetchProcedures,
  };
}
