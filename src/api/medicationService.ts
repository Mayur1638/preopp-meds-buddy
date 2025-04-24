
import { supabase } from '@/integrations/supabase/client';
import { Medication } from '@/types';

export const fetchMedications = async (userId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', userId)    
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

export const addMedicationToDb = async (medication: Omit<Medication, 'id'>, userId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from('medications')
      .insert({
        user_id: userId,
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

    if (error) throw error;
    
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

export const updateMedicationInDb = async (id: string, updates: Partial<Medication>) => {
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
        status: updates.status
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
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

export const deleteMedicationFromDb = async (id: string) => {
  try {
    const { error } = await supabase
      .from('medications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting medication:", error);
  }
};
