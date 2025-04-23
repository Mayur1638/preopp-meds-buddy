
import React, { useState } from "react";
import { useMedication } from "@/contexts/MedicationContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddProcedureForm } from "@/components/procedures/AddProcedureForm";
import { RescheduleForm } from "@/components/procedures/RescheduleForm";
import { ProceduresList } from "@/components/procedures/ProceduresList";
import { useProcedures } from "@/hooks/useProcedures";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Procedures = () => {
  const { procedures, addProcedure } = useMedication();
  const { updateProcedure } = useProcedures();
  const [showAdd, setShowAdd] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);

  // Form state for add
  const [procName, setProcName] = useState("");
  const [procDate, setProcDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");

  // Form state for reschedule
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDoctor, setNewDoctor] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);

  // UI state for the reschedule success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    
    addProcedure({ 
      name: procName, 
      date: procDate, 
      location: hospital, 
      doctor: doctor,
      notes: "" // Add empty notes field to match Procedure type
    });
    
    // Reset form fields
    setProcName("");
    setProcDate("");
    setHospital("");
    setDoctor("");
    setShowAdd(false);
  };

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProcedure || !newDate || !newLocation || !newDoctor) return;
    
    setIsRescheduling(true);
    try {
      await updateProcedure({ 
        id: selectedProcedure, 
        updates: { 
          date: newDate, 
          location: newLocation, 
          doctor: newDoctor 
        }
      });
      setShowReschedule(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error rescheduling procedure:", error);
    } finally {
      setIsRescheduling(false);
      setSelectedProcedure(null);
      setNewDate("");
      setNewLocation("");
      setNewDoctor("");
    }
  };

  const openRescheduleDialog = (procedureId: string) => {
    setSelectedProcedure(procedureId);
    const procedure = procedures.find(p => p.id === procedureId);
    if (procedure) {
      setNewDate(procedure.date);
      setNewLocation(procedure.location || "");
      setNewDoctor(procedure.doctor || "");
    }
    setShowReschedule(true);
  };

  return (
    <div className="relative space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Procedures</h2>
        <Button 
          onClick={() => setShowAdd(true)}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="pb-8">
          <ProceduresList 
            procedures={upcomingProcedures}
            onReschedule={openRescheduleDialog}
            type="upcoming"
          />
        </TabsContent>
        
        <TabsContent value="past" className="pb-8">
          <ProceduresList 
            procedures={pastProcedures}
            onReschedule={openRescheduleDialog}
            type="past"
          />
        </TabsContent>
      </Tabs>

      {/* Add Procedure Form */}
      <AddProcedureForm
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        onSubmit={handleAdd}
        procName={procName}
        setProcName={setProcName}
        procDate={procDate}
        setProcDate={setProcDate}
        hospital={hospital}
        setHospital={setHospital}
        doctor={doctor}
        setDoctor={setDoctor}
      />

      {/* Reschedule Form */}
      <RescheduleForm
        showReschedule={showReschedule}
        setShowReschedule={setShowReschedule}
        onSubmit={handleReschedule}
        newDate={newDate}
        setNewDate={setNewDate}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        newDoctor={newDoctor}
        setNewDoctor={setNewDoctor}
        isLoading={isRescheduling}
      />

      {/* Success Modal for rescheduling */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rescheduled Successfully</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-green-600 font-semibold">
              Procedure has been rescheduled successfully!
            </p>
            <Button onClick={() => setShowSuccessModal(false)} className="mt-4 w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Procedures;
