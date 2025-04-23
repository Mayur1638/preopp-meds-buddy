
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";

const ProcedureDetails = () => {
  const { id } = useParams();
  const { procedures } = useMedication();

  // Find the procedure matching the id from the route
  const procedure = procedures.find((p) => p.id === id);

  // If procedure not found, redirect to procedures list
  if (!procedure) {
    return <Navigate to="/procedures" replace />;
  }

  // Use the ProcedureDetailsView component which has better UI
  return <ProcedureDetailsView procedure={procedure} />;
};

export default ProcedureDetails;
