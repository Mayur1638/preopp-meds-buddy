
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { DosAndDontsDetails } from "@/components/procedures/DosAndDontsDetails";

const ProcedureDetails = () => {
  const { id } = useParams();
  const { procedures } = useMedication();

  // Find the procedure matching the id from the route
  const procedure = procedures.find((p) => p.id === id);

  // If procedure not found, redirect to procedures list
  if (!procedure) {
    return <Navigate to="/procedures" replace />;
  }

  return <DosAndDontsDetails procedure={procedure} />;
};

export default ProcedureDetails;

