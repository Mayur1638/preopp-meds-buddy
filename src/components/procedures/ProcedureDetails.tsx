
import { ProcedureDetail } from "@/types";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useMedication } from "@/contexts/MedicationContext";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  ProcedureDetailsHeader 
} from "./ProcedureDetailsHeader";
import { 
  ProcedureDetailsInfo 
} from "./ProcedureDetailsInfo";
import { 
  ProcedureDos 
} from "./ProcedureDos";
import { 
  ProcedureDonts 
} from "./ProcedureDonts";
import { 
  ProcedurePreparations 
} from "./ProcedurePreparations";
import { 
  ProcedureNotes 
} from "./ProcedureNotes";
import { 
  EditFormDialog 
} from "./EditFormDialog";

interface ProcedureDetailsProps {
  procedure: ProcedureDetail;
}

export function ProcedureDetailsView({ procedure }: ProcedureDetailsProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { updateProcedure } = useMedication();
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

  return (
    <div className="space-y-6">
      <ProcedureDetailsHeader
        badgeText={badgeText}
        badgeVariant={badgeVariant}
        onEdit={() => setShowEditForm(true)}
      />
      <Card className="shadow-md">
        <ProcedureDetailsInfo
          procedure={procedure}
          procedureDate={procedureDate}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          <ProcedureDos dos={procedure.dos} />
          <ProcedureDonts donts={procedure.donts} />
        </div>
        <div className="px-6 mt-4">
          <ProcedurePreparations preparations={procedure.preparations} />
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
