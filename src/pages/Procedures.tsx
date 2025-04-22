
import React, { useState } from "react";
import { useMedication } from "@/contexts/MedicationContext";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UK_HOSPITALS = [
  "St Thomas' Hospital, London",
  "Royal London Hospital",
  "Guy's Hospital, London",
  "King's College Hospital, London",
  "University College Hospital, London",
  "St Mary's Hospital, London",
  "Queen Elizabeth Hospital, Birmingham",
  "Addenbrooke's Hospital, Cambridge",
  "Royal Infirmary of Edinburgh",
  "John Radcliffe Hospital, Oxford"
];

const Procedures = () => {
  const { procedures, addProcedure } = useMedication();
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
      doctor,
      dos: [],
      donts: [],
      preparations: []
    });
    
    setProcName("");
    setProcDate("");
    setHospital("");
    setDoctor("");
    setShowAdd(false);
  };

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would go here in a real app
    setShowReschedule(false);
    setSelectedProcedure(null);
    setNewDate("");
    setNewLocation("");
  };

  const openRescheduleDialog = (procedureId: string) => {
    setSelectedProcedure(procedureId);
    const procedure = procedures.find(p => p.id === procedureId);
    if (procedure) {
      setNewDate(procedure.date);
      setNewLocation(procedure.location || "");
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
        
        <TabsContent value="upcoming">
          {upcomingProcedures.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No upcoming procedures scheduled.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {upcomingProcedures.map((procedure) => (
                <ProcedureCard 
                  key={procedure.id} 
                  procedure={procedure} 
                  onReschedule={() => openRescheduleDialog(procedure.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastProcedures.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No past procedures found.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pastProcedures.map((procedure) => (
                <ProcedureCard 
                  key={procedure.id} 
                  procedure={procedure}
                  onReschedule={() => openRescheduleDialog(procedure.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Procedure</DialogTitle>
          </DialogHeader>
          <form className="grid gap-3" onSubmit={handleAdd}>
            <div className="grid gap-2">
              <Label htmlFor="procedure-name">Procedure Name</Label>
              <Input
                id="procedure-name"
                type="text"
                value={procName}
                onChange={(e) => setProcName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="procedure-date">Date</Label>
              <Input
                id="procedure-date"
                type="date"
                value={procDate}
                onChange={(e) => setProcDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hospital-select">Hospital Location</Label>
              <Select value={hospital} onValueChange={setHospital}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {UK_HOSPITALS.map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doctor-name">Doctor Name</Label>
              <Input
                id="doctor-name"
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-2">Add</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Procedure</DialogTitle>
          </DialogHeader>
          <form className="grid gap-3" onSubmit={handleReschedule}>
            <div className="grid gap-2">
              <Label htmlFor="new-date">New Date</Label>
              <Input
                id="new-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-location">New Location</Label>
              <Select value={newLocation} onValueChange={setNewLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {UK_HOSPITALS.map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="mt-2">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Procedures;
