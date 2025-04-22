
import { MedicationList } from "@/components/medications/MedicationList";
import { useMedication } from "@/contexts/MedicationContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MedicationForm } from "@/components/medications/MedicationForm";
import { PlusCircle } from "lucide-react";

const Medications = () => {
  const [showForm, setShowForm] = useState(false);
  const { medications } = useMedication();

  return (
    <div className="relative space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Medications ({medications.length})</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Medication
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <MedicationForm onClose={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <MedicationList />
    </div>
  );
};

export default Medications;
