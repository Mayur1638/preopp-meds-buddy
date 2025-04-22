
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Medication, TodayMedication, Procedure } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { generateTodayMedications } from "@/utils/medicationUtils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

type MedicationContextType = {
  medications: Medication[];
  todayMedications: TodayMedication[];
  procedures: Procedure[];
  addMedication: (medication: Omit<Medication, "id" | "user_id" | "created_at">) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  markMedicationTaken: (id: string) => void;
  markMedicationSkipped: (id: string) => void;
  markMedicationPending: (id: string) => void;
  getProcedureDetails: (id: string) => Promise<Procedure | null>;
  addProcedure: (procedure: Omit<Procedure, "id" | "user_id" | "created_at">) => Promise<void>;
};

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayMedications, setTodayMedications] = useState<TodayMedication[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch medications and procedures when user changes
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
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedications(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching medications",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchProcedures = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('procedures')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setProcedures(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching procedures",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addMedication = async (medication: Omit<Medication, "id" | "user_id" | "created_at">) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('medications')
        .insert([{ ...medication, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medication added successfully",
      });

      await fetchMedications();
    } catch (error: any) {
      toast({
        title: "Error adding medication",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateMedication = async (medication: Medication) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('medications')
        .update(medication)
        .eq('id', medication.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medication updated successfully",
      });

      await fetchMedications();
    } catch (error: any) {
      toast({
        title: "Error updating medication",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteMedication = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medication deleted successfully",
      });

      await fetchMedications();
    } catch (error: any) {
      toast({
        title: "Error deleting medication",
        description: error.message,
        variant: "destructive",
      });
      throw error;
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

  const getProcedureDetails = async (id: string): Promise<Procedure | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('procedures')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error fetching procedure details",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const addProcedure = async (procedure: Omit<Procedure, "id" | "user_id" | "created_at">) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('procedures')
        .insert([{ ...procedure, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Procedure added successfully",
      });

      await fetchProcedures();
    } catch (error: any) {
      toast({
        title: "Error adding procedure",
        description: error.message,
        variant: "destructive",
      });
      throw error;
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
