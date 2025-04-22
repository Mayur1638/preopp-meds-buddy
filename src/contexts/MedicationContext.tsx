import { createContext, useContext, ReactNode } from "react";
import { Medication, TodayMedication, Procedure } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useMedications } from "@/hooks/useMedications";
import { useProcedures } from "@/hooks/useProcedures";
import { generateTodayMedications } from "@/utils/medicationUtils";

type MedicationContextType = {
  medications: Medication[];
  todayMedications: TodayMedication[];
  procedures: Procedure[];
  addMedication: (medication: Omit<Medication, "id">) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  markMedicationTaken: (id: string) => void;
  markMedicationSkipped: (id: string) => void;
  markMedicationPending: (id: string) => void;
  getProcedureDetails: (id: string) => any;
  addProcedure: (procedure: Procedure) => Promise<void>;
};

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { 
    medications = [], 
    addMedication: addMedicationToDb,
    updateMedication: updateMedicationInDb,
    deleteMedication: deleteMedicationFromDb
  } = useMedications();
  
  const {
    procedures = [],
    addProcedure: addProcedureToDb
  } = useProcedures();

  const todayMedications = generateTodayMedications(medications);

  const addMedication = async (medication: Omit<Medication, "id">) => {
    try {
      await addMedicationToDb(medication);
      toast({
        title: "Success",
        description: "Medication added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add medication",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateMedication = async (medication: Medication) => {
    try {
      await updateMedicationInDb({ id: medication.id, updates: medication });
      toast({
        title: "Success",
        description: "Medication updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update medication",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteMedication = async (id: string) => {
    try {
      await deleteMedicationFromDb(id);
      toast({
        title: "Success",
        description: "Medication deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete medication",
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

  const getProcedureDetails = (id: string) => MOCK_PROCEDURE_DETAILS[id];
  
  const addProcedure = async (procedure: Procedure) => {
    try {
      await addProcedureToDb(procedure);
      toast({
        title: "Success",
        description: "Procedure added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add procedure",
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
