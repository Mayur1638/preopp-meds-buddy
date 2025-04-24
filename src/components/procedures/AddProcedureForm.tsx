import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

// Updated doctors list with diverse names
const DOCTORS = [
  "Dr. Sarah Johnson",
  "Dr. Michael Chen",
  "Dr. Emma Williams",
  "Dr. James Anderson",
  "Dr. Maria Garcia",
  "Dr. David Thompson",
  "Dr. Sophie Martin",
  "Dr. Thomas Wilson",
  "Dr. Lisa Parker",
  "Dr. Robert Brown",
];

interface AddProcedureFormProps {
  showAdd: boolean;
  setShowAdd: (show: boolean) => void;
  onSubmit: (event: React.FormEvent) => void;
  procName: string;
  setProcName: (name: string) => void;
  procDate: string;
  setProcDate: (date: string) => void;
  hospital: string;
  setHospital: (hospital: string) => void;
  doctor: string;
  setDoctor: (doctor: string) => void;
}

export const AddProcedureForm = ({
  showAdd,
  setShowAdd,
  onSubmit,
  procName,
  setProcName,
  procDate,
  setProcDate,
  hospital,
  setHospital,
  doctor,
  setDoctor,
}: AddProcedureFormProps) => {
  return (
    <Dialog open={showAdd} onOpenChange={setShowAdd}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Procedure</DialogTitle>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={onSubmit}>
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
            <Label htmlFor="doctor-select">Doctor Name</Label>
            <Select value={doctor} onValueChange={setDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((doc) => (
                  <SelectItem key={doc} value={doc}>{doc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="mt-2">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
