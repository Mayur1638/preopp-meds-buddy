
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/textarea";
import { Procedure } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditProcedureFormProps {
  procedure: Procedure;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProcedure: Procedure) => void;
}

// 10 pre-defined doctor names
const DOCTORS = [
  "Dr. Raj Patel",
  "Dr. Maya Iyer",
  "Dr. Sneha Menon",
  "Dr. Anil Sharma",
  "Dr. Ayesha Khan",
  "Dr. Rohan Gupta",
  "Dr. Rachel Mathew",
  "Dr. Suresh Desai",
  "Dr. Priya Singh",
  "Dr. Amit Joshi",
];

export function EditProcedureForm({ procedure, isOpen, onClose, onSubmit }: EditProcedureFormProps) {
  const [procName, setProcName] = useState(procedure.name);
  const [procDate, setProcDate] = useState(procedure.date);
  const [doctor, setDoctor] = useState(procedure.doctor);
  const [location, setLocation] = useState(procedure.location || "");
  const [notes, setNotes] = useState(procedure.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProcedure: Procedure = {
      ...procedure,
      name: procName,
      date: procDate,
      doctor,
      location,
      notes
    };
    onSubmit(updatedProcedure);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Procedure</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FormInput
            label="Procedure Name"
            id="proc-name"
            value={procName}
            onChange={(e) => setProcName(e.target.value)}
            required
          />
          <FormInput
            label="Date"
            id="proc-date"
            type="date"
            value={procDate}
            onChange={(e) => setProcDate(e.target.value)}
            required
          />
          {/* Doctor Predefined Select */}
          <div className="space-y-2">
            <label htmlFor="proc-doctor" className="text-sm font-medium">
              Doctor
            </label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger id="proc-doctor">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((d) => (
                  <SelectItem value={d} key={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormInput
            label="Location"
            id="proc-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="space-y-2">
            <label htmlFor="proc-notes" className="text-sm font-medium">
              Notes
            </label>
            <Textarea
              id="proc-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
