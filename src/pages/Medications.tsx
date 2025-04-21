
import { MedicationList } from "@/components/medications/MedicationList";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { MedicationForm } from "@/components/medications/MedicationForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Medications = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="relative space-y-6">
      {/* Show medication list */}
      <MedicationList />
      {/* Floating + button */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-6 z-40 bg-primary text-primary-foreground rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl hover:bg-primary/80 transition"
        aria-label="Add Medication"
      >
        <Plus size={28} />
        <span className="sr-only">Add Medication</span>
      </button>
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <MedicationForm onSuccess={() => setShowAdd(false)} onClose={() => setShowAdd(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Medications;
