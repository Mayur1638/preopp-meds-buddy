
import { useState } from "react";
import { Medication } from "@/types";
import { useMedication } from "@/contexts/MedicationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface MedicationFormProps {
  medication?: Medication;
  onClose: () => void;
}

export function MedicationForm({ medication, onClose }: MedicationFormProps) {
  const [name, setName] = useState(medication?.name || "");
  const [quantity, setQuantity] = useState(medication?.quantity || "");
  const [startDate, setStartDate] = useState(medication?.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(medication?.endDate || "");
  const [time, setTime] = useState(medication?.time || "");
  const [dosage, setDosage] = useState(medication?.dosage || "");
  const [instructions, setInstructions] = useState(medication?.instructions || "");
  
  const { addMedication, updateMedication } = useMedication();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !quantity || !startDate || !endDate || !time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (medication) {
      updateMedication({
        id: medication.id,
        name,
        quantity,
        startDate,
        endDate,
        time,
        dosage,
        instructions,
      });
      toast({
        title: "Success",
        description: "Medication updated successfully",
      });
    } else {
      addMedication({
        name,
        quantity,
        startDate,
        endDate,
        time,
        dosage,
        instructions,
      });
      toast({
        title: "Success",
        description: "Medication added successfully",
      });
    }
    
    onClose();
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-slide-in-bottom">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            {medication ? "Edit Medication" : "Add Medication"}
          </CardTitle>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {medication 
            ? "Update the details of your medication" 
            : "Enter the details of your medication"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Medication Name *
            </label>
            <Input
              id="name"
              placeholder="e.g. Aspirin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="quantity">
              Quantity/Strength *
            </label>
            <Input
              id="quantity"
              placeholder="e.g. 100mg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="startDate">
                Start Date *
              </label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="endDate">
                End Date *
              </label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="time">
                Time *
              </label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="dosage">
                Dosage
              </label>
              <Input
                id="dosage"
                placeholder="e.g. 1 tablet"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="instructions">
              Special Instructions
            </label>
            <Textarea
              id="instructions"
              placeholder="e.g. Take with food"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {medication ? "Update" : "Add"} Medication
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
