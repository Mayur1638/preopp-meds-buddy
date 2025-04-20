
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";

const ProcedureDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProcedureDetails } = useMedication();
  
  if (!id) {
    return <Navigate to="/procedures" />;
  }
  
  const procedureDetails = getProcedureDetails(id);
  
  if (!procedureDetails) {
    return <Navigate to="/procedures" />;
  }

  return (
    <ProcedureDetailsView procedure={procedureDetails} />
  );
};

export default ProcedureDetails;
