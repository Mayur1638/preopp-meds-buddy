
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Medication, TodayMedication, Procedure } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { MOCK_MEDICATIONS, MOCK_PROCEDURES, MOCK_PROCEDURE_DETAILS } from "@/data/mockMedications";
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
  getProcedureDetails: (id: string) => typeof MOCK_PROCEDURE_DETAILS[keyof typeof MOCK_PROCEDURE_DETAILS] | undefined;
  addProcedure: (procedure: Procedure) => void;
};

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [todayMedications, setTodayMedications] = useState<TodayMedication[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>(MOCK_PROCEDURES);
  const { toast } = useToast();

  useEffect(() => {
    const todaysMeds = generateTodayMedications(medications);
    setTodayMedications(todaysMeds);
  }, [medications]);

  const addMedication = (medication: Omit<Medication, "id">) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (medication: Medication) => {
    setMedications(medications.map((med) => 
      med.id === medication.id ? medication : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
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
  
  const addProcedure = (procedure: Procedure) => {
    setProcedures([...procedures, procedure]);
    toast({
      title: "Success",
      description: "Procedure added successfully",
    });
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
