
import { useMedication } from "@/contexts/MedicationContext";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Procedures = () => {
  const { procedures, addProcedure } = useMedication();
  const [showAdd, setShowAdd] = useState(false);

  // Form state for add
  const [procName, setProcName] = useState("");
  const [procDate, setProcDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");

  // Sort procedures by date
  const sortedProcedures = [...procedures].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Split into upcoming and past procedures
  const today = new Date();
  const upcomingProcedures = sortedProcedures.filter(
    proc => new Date(proc.date) >= today
  );

  const pastProcedures = sortedProcedures.filter(
    proc => new Date(proc.date) < today
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procName || !procDate || !hospital || !doctor) return;
    addProcedure({ id: Date.now().toString(), name: procName, date: procDate, location: hospital, doctor });
    setProcName("");
    setProcDate("");
    setHospital("");
    setDoctor("");
    setShowAdd(false);
  };

  return (
    <div className="relative space-y-8">
      <div className="space-y-6">
        {upcomingProcedures.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            No upcoming procedures scheduled.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        )}
      </div>
      
      {pastProcedures.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        </div>
      )}
      {/* Floating + button */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 right-6 z-40 bg-primary text-primary-foreground rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl hover:bg-primary/80 transition"
        aria-label="Add Procedure"
      >
        <Plus size={28} />
        <span className="sr-only">Add Procedure</span>
      </button>
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Procedure</DialogTitle>
          </DialogHeader>
          <form className="grid gap-3" onSubmit={handleAdd}>
            <input
              type="text"
              className="border px-3 py-2 rounded"
              placeholder="Procedure Name"
              value={procName}
              onChange={(e) => setProcName(e.target.value)}
              required
            />
            <input
              type="date"
              className="border px-3 py-2 rounded"
              placeholder="Date"
              value={procDate}
              onChange={(e) => setProcDate(e.target.value)}
              required
            />
            <input
              type="text"
              className="border px-3 py-2 rounded"
              placeholder="Hospital Name"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
            />
            <input
              type="text"
              className="border px-3 py-2 rounded"
              placeholder="Doctor Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded px-4 py-2 mt-2"
            >Add</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Procedures;
