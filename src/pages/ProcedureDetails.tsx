
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";
import { ProcedureDetail } from "@/types";

const ProcedureDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProcedureDetails } = useMedication();
  
  if (!id) {
    return <Navigate to="/procedures" />;
  }
  
  // Get the procedure details which should return a ProcedureDetail type
  const procedureDetails = getProcedureDetails(id);
  
  if (!procedureDetails) {
    return <Navigate to="/procedures" />;
  }

  return (
    <ProcedureDetailsView procedure={procedureDetails as ProcedureDetail} />
  );
};

export default ProcedureDetails;
