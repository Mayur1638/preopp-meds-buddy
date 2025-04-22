
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/textarea";
import { Procedure } from "@/types";

interface EditProcedureFormProps {
  procedure: Procedure;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProcedure: Procedure) => void;
}

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
          
          <FormInput
            label="Doctor"
            id="proc-doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
          
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
