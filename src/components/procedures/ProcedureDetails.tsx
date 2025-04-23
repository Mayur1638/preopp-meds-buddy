
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ProcedureDetailsHeader } from "./ProcedureDetailsHeader";
import { ProcedureDetailsInfo } from "./ProcedureDetailsInfo";
import { ProcedureDos } from "./ProcedureDos";
import { ProcedureDonts } from "./ProcedureDonts";
import { ProcedurePreparations } from "./ProcedurePreparations";
import { ProcedureNotes } from "./ProcedureNotes";
import { EditFormDialog } from "./EditFormDialog";
import { ProcedureDetail } from "@/types";
import { useMedication } from "@/contexts/MedicationContext";

interface ProcedureDetailsProps {
  procedureId: string;
  notes?: string;
}

const hardcodedDos = [
  "Arrive at least 30 minutes before your appointment.",
  "Bring your ID and insurance information.",
  "Inform the staff if you have allergies to medications.",
  "Wear comfortable, loose-fitting clothing.",
];

const hardcodedDonts = [
  "Do not eat or drink after midnight before your procedure.",
  "Do not bring valuables with you.",
  "Do not drive yourself home if sedation is involved.",
  "Do not apply lotions or perfumes on the day of the procedure.",
];

const hardcodedPreparations = [
  "Fast for 8 hours prior to the procedure.",
  "Arrange for someone to drive you home.",
  "Prepare a list of any medications you take.",
  "Follow pre-procedure bathing instructions, if any.",
];

export function ProcedureDetailsView({ procedureId, notes }: ProcedureDetailsProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { updateProcedure } = useMedication();

  const handleUpdateProcedure = async (updatedProcedure: any) => {
    try {
      await updateProcedure(updatedProcedure);
      setShowEditForm(false);
      toast({
        title: "Procedure updated",
        description: "The procedure details have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update procedure. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Simulate procedure detail retrieval, replace this with your own lookup if needed
  const procedure: ProcedureDetail = {
    id: procedureId,
    name: "Sample Procedure",
    date: "2025-08-21",
    doctor: "Dr. Johnson",
    location: "Example Hospital",
    notes: notes ?? "Please arrive 15 minutes early.",
    description:
      "A routine medical procedure performed by the physician. Please follow your pre-op instructions carefully.",
    dos: hardcodedDos,
    donts: hardcodedDonts,
    preparations: hardcodedPreparations,
  };

  const procedureDate = new Date(procedure.date);
  const today = new Date();
  const daysUntil = Math.ceil(
    (procedureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let badgeText = "";
  let badgeVariant: "default" | "outline" | "secondary" | "destructive" = "outline";

  if (daysUntil < 0) {
    badgeText = "Past";
    badgeVariant = "outline";
  } else if (daysUntil === 0) {
    badgeText = "Today";
    badgeVariant = "destructive";
  } else if (daysUntil <= 3) {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "destructive";
  } else if (daysUntil <= 7) {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "default";
  } else {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "secondary";
  }

  return (
    <div className="space-y-6">
      <ProcedureDetailsHeader
        badgeText={badgeText}
        badgeVariant={badgeVariant}
        onEdit={() => setShowEditForm(true)}
      />
      <Card className="shadow-md">
        <ProcedureDetailsInfo procedure={procedure} procedureDate={procedureDate} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <ProcedureDos dos={hardcodedDos} />
          <ProcedureDonts donts={hardcodedDonts} />
        </div>
        <div className="px-6 mt-4 pb-3">
          <ProcedurePreparations preparations={hardcodedPreparations} />
        </div>
        <div className="px-6">
          <ProcedureNotes notes={procedure.notes} />
        </div>
      </Card>
      <EditFormDialog
        procedure={procedure}
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSubmit={handleUpdateProcedure}
      />
    </div>
  );
}
