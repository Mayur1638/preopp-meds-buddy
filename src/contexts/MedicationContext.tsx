import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Medication, TodayMedication, Procedure, ProcedureDetail } from "@/types";
import { useToast } from "@/hooks/use-toast";

type MedicationContextType = {
  medications: Medication[];
  todayMedications: TodayMedication[];
  procedures: Procedure[];
  addMedication: (medication: Omit<Medication, "id">) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  markMedicationTaken: (id: string) => void;
  markMedicationSkipped: (id: string) => void;
  getProcedureDetails: (id: string) => ProcedureDetail | undefined;
};

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

// Mock data
const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "1",
    name: "Aspirin",
    quantity: "100mg",
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    time: "08:00",
    dosage: "1 tablet",
    instructions: "Take with food"
  },
  {
    id: "2",
    name: "Metoprolol",
    quantity: "50mg",
    startDate: "2025-04-10",
    endDate: "2025-04-30",
    time: "12:00",
    dosage: "1 tablet",
    instructions: "Take with water"
  },
  {
    id: "3",
    name: "Simvastatin",
    quantity: "20mg",
    startDate: "2025-04-01",
    endDate: "2025-06-01",
    time: "20:00",
    dosage: "1 tablet",
    instructions: "Take at bedtime"
  }
];

const MOCK_PROCEDURES: Procedure[] = [
  {
    id: "1",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure"
  },
  {
    id: "2",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure"
  }
];

const MOCK_PROCEDURE_DETAILS: Record<string, ProcedureDetail> = {
  "1": {
    id: "1",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure",
    description: "A colonoscopy is a procedure to look at the inside of your colon.",
    dos: [
      "Follow the bowel preparation instructions exactly",
      "Complete the entire prep solution",
      "Stay hydrated with clear liquids",
      "Arrange for someone to drive you home"
    ],
    donts: [
      "Don't eat solid food the day before",
      "Don't take medications that thin your blood",
      "Don't wear jewelry or bring valuables",
      "Don't drive for 24 hours after the procedure"
    ],
    preparations: [
      "Stop iron supplements 5 days before",
      "Clear liquid diet the day before",
      "Complete bowel prep as directed",
      "Arrive 30 minutes before appointment"
    ]
  },
  "2": {
    id: "2",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure",
    description: "Arthroscopy is a minimally invasive surgical procedure used to diagnose and treat problems inside a joint.",
    dos: [
      "Arrange for transportation home",
      "Follow fasting instructions",
      "Bring your insurance card",
      "Wear loose, comfortable clothing"
    ],
    donts: [
      "Don't eat or drink after midnight",
      "Don't take aspirin or blood thinners",
      "Don't wear contact lenses",
      "Don't apply lotions or perfumes"
    ],
    preparations: [
      "Get pre-op blood work done",
      "Stop certain medications as directed",
      "Prepare your home for recovery",
      "Have ice packs ready for recovery"
    ]
  }
};

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [todayMedications, setTodayMedications] = useState<TodayMedication[]>([]);
  const [procedures] = useState<Procedure[]>(MOCK_PROCEDURES);
  const { toast } = useToast();

  useEffect(() => {
    // Generate today's medications based on current date and time
    const today = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    
    const todaysMeds = medications
      .filter(med => {
        return med.startDate <= today && med.endDate >= today;
      })
      .map(med => {
        const medHour = parseInt(med.time.split(':')[0]);
        // Mark a medication as immediate if it's the closest upcoming medication
        // or if it's within the last hour
        const isImmediate = 
          medHour >= currentHour && 
          medHour <= currentHour + 1;
          
        return {
          ...med,
          status: 'pending' as const,
          isImmediate
        };
      })
      .sort((a, b) => {
        const timeA = parseInt(a.time.split(':')[0]);
        const timeB = parseInt(b.time.split(':')[0]);
        return timeA - timeB;
      });
      
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
    setMedications(
      medications.map((med) => (med.id === medication.id ? medication : med))
    );
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const markMedicationTaken = (id: string) => {
    setTodayMedications(
      todayMedications.map((med) =>
        med.id === id ? { ...med, status: 'taken' as const } : med
      )
    );

    toast({
      title: "Medication marked as taken",
      description: "Click undo to reverse this action",
      action: (
        <button
          onClick={() => undoMedicationStatus(id)}
          className="text-primary hover:text-primary/90 font-medium"
        >
          Undo
        </button>
      ),
    });
  };

  const markMedicationSkipped = (id: string) => {
    setTodayMedications(
      todayMedications.map((med) =>
        med.id === id ? { ...med, status: 'skipped' as const } : med
      )
    );

    toast({
      title: "Medication marked as skipped",
      description: "Click undo to reverse this action",
      action: (
        <button
          onClick={() => undoMedicationStatus(id)}
          className="text-primary hover:text-primary/90 font-medium"
        >
          Undo
        </button>
      ),
    });
  };

  const undoMedicationStatus = (id: string) => {
    setTodayMedications(
      todayMedications.map((med) =>
        med.id === id ? { ...med, status: 'pending' as const } : med
      )
    );
    
    toast({
      title: "Action undone",
      description: "Medication status has been reset",
    });
  };

  const getProcedureDetails = (id: string) => {
    return MOCK_PROCEDURE_DETAILS[id];
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
        getProcedureDetails,
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
