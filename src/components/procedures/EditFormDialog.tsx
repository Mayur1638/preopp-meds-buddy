
import { EditProcedureForm } from "./EditProcedureForm";
import { ProcedureDetail } from "@/types";

interface EditFormDialogProps {
  procedure: ProcedureDetail;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProcedure: any) => void;
}

export function EditFormDialog(props: EditFormDialogProps) {
  return (
    <EditProcedureForm
      procedure={props.procedure}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    />
  );
}
