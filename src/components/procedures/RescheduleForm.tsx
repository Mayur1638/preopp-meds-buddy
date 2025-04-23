
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

interface RescheduleFormProps {
  showReschedule: boolean;
  setShowReschedule: (show: boolean) => void;
  onSubmit: (event: React.FormEvent) => void;
  newDate: string;
  setNewDate: (date: string) => void;
  newLocation: string;
  setNewLocation: (location: string) => void;
  isLoading?: boolean;
}

export const RescheduleForm = ({
  showReschedule,
  setShowReschedule,
  onSubmit,
  newDate,
  setNewDate,
  newLocation,
  setNewLocation,
  isLoading = false,
}: RescheduleFormProps) => {
  return (
    <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Procedure</DialogTitle>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={onSubmit}>
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
          <Button disabled={isLoading} type="submit" className="mt-2">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
