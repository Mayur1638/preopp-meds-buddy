import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Medication, TodayMedication, Procedure } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { generateTodayMedications } from "@/utils/medicationUtils";

type MedicationContextType = {
  medications: Medication[];
  todayMedications: TodayMedication[];
  procedures: Procedure[];
  addMedication: (medication: Omit<Medication, "id">) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  markMedicationTaken: (id: string) => void;
  markMedicationSkipped: (id: string) => void;
  markMedicationPending: (id: string) => void;
  getProcedureDetails: (id: string) => Procedure | undefined;
  addProcedure: (procedure: Procedure) => void;
};

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayMedications, setTodayMedications] = useState<TodayMedication[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMedications();
      fetchProcedures();
    }
  }, [user]);

  useEffect(() => {
    const todaysMeds = generateTodayMedications(medications);
    setTodayMedications(todaysMeds);
  }, [medications]);

  const fetchMedications = async () => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('id', user?.id);

      if (error) throw error;

      setMedications(data.map(med => ({
        id: med.id,
        name: med.medication_name,
        quantity: med.quantity || '',
        startDate: med.start_date || '',
        endDate: med.end_date,
        time: med.time || '',
        dosage: med.dosage,
        instructions: med.special_instructions
      })));
    } catch (error) {
      console.error('Error fetching medications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch medications",
        variant: "destructive",
      });
    }
  };

  const fetchProcedures = async () => {
    try {
      const { data, error } = await supabase
        .from('procedures')
        .select('*')
        .eq('id', user?.id);

      if (error) throw error;

      setProcedures(data.map(proc => ({
        id: proc.id,
        name: proc.procedure_name || '',
        date: proc.procedure_date || '',
        doctor: proc.doctor || '',
        location: proc.procedure_location,
        notes: ''
      })));
    } catch (error) {
      console.error('Error fetching procedures:', error);
      toast({
        title: "Error",
        description: "Failed to fetch procedures",
        variant: "destructive",
      });
    }
  };

  const addMedication = async (medication: Omit<Medication, "id">) => {
    try {
      const { data, error } = await supabase
        .from('medications')
        .insert([{
          id: user?.id,
          medication_name: medication.name,
          quantity: medication.quantity,
          start_date: medication.startDate,
          end_date: medication.endDate,
          time: medication.time,
          dosage: medication.dosage,
          special_instructions: medication.instructions
        }])
        .select()
        .single();

      if (error) throw error;

      setMedications([...medications, {
        id: data.id,
        name: data.medication_name,
        quantity: data.quantity || '',
        startDate: data.start_date || '',
        endDate: data.end_date,
        time: data.time || '',
        dosage: data.dosage,
        instructions: data.special_instructions
      }]);

      toast({
        title: "Success",
        description: "Medication added successfully",
      });
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication",
        variant: "destructive",
      });
    }
  };

  const updateMedication = async (medication: Medication) => {
    try {
      const { error } = await supabase
        .from('medications')
        .update({
          medication_name: medication.name,
          quantity: medication.quantity,
          start_date: medication.startDate,
          end_date: medication.endDate,
          time: medication.time,
          dosage: medication.dosage,
          special_instructions: medication.instructions
        })
        .eq('id', medication.id);

      if (error) throw error;

      setMedications(medications.map(med =>
        med.id === medication.id ? medication : med
      ));

      toast({
        title: "Success",
        description: "Medication updated successfully",
      });
    } catch (error) {
      console.error('Error updating medication:', error);
      toast({
        title: "Error",
        description: "Failed to update medication",
        variant: "destructive",
      });
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMedications(medications.filter(med => med.id !== id));
      toast({
        title: "Success",
        description: "Medication deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: "Error",
        description: "Failed to delete medication",
        variant: "destructive",
      });
    }
  };

  const markMedicationTaken = (id: string) => {
    setTodayMedications(todayMedications.map((med) =>
      med.id === id ? { ...med, status: 'taken' as const } : med
    ));
    toast({
      title: "Medication marked as taken",
      description: "Click undo to reverse this action",
    });
  };

  const markMedicationSkipped = (id: string) => {
    setTodayMedications(todayMedications.map((med) =>
      med.id === id ? { ...med, status: 'skipped' as const } : med
    ));
    toast({
      title: "Medication marked as skipped",
      description: "Click undo to reverse this action",
    });
  };

  const markMedicationPending = (id: string) => {
    setTodayMedications(todayMedications.map((med) =>
      med.id === id ? { ...med, status: 'pending' as const } : med
    ));
    toast({
      title: "Action undone",
      description: "Medication status has been reset",
    });
  };

  const getProcedureDetails = (id: string) => {
    return procedures.find(proc => proc.id === id);
  };

  const addProcedure = async (procedure: Procedure) => {
    try {
      const { data, error } = await supabase
        .from('procedures')
        .insert([{
          id: user?.id,
          procedure_name: procedure.name,
          procedure_date: procedure.date,
          doctor: procedure.doctor,
          procedure_location: procedure.location
        }])
        .select()
        .single();

      if (error) throw error;

      setProcedures([...procedures, {
        id: data.id,
        name: data.procedure_name || '',
        date: data.procedure_date || '',
        doctor: data.doctor || '',
        location: data.procedure_location,
        notes: procedure.notes || ''
      }]);

      toast({
        title: "Success",
        description: "Procedure added successfully",
      });
    } catch (error) {
      console.error('Error adding procedure:', error);
      toast({
        title: "Error",
        description: "Failed to add procedure",
        variant: "destructive",
      });
    }
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        todayMedications,
        procedures,
        addMedication,
        updateMedication,
        deleteMedication,
        markMedicationTaken,
        markMedicationSkipped,
        markMedicationPending,
        getProcedureDetails,
        addProcedure,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
};
