
import { MedicationList } from "@/components/medications/MedicationList";
import { useMedication } from "@/contexts/MedicationContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MedicationForm } from "@/components/medications/MedicationForm";

const Medications = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative space-y-6">
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
