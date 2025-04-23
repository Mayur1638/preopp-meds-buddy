
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";
import { ProcedureDetail } from "@/types";

const ProcedureDetails = () => {
  const { id } = useParams();
  const { procedures, getProcedureDetails } = useMedication();

  // Find the procedure matching the id from the route
  const procedure = procedures.find((p) => p.id === id);

  // If procedure not found, redirect to procedures list
  if (!procedure) {
    return <Navigate to="/procedures" replace />;
  }

  // Get the full procedure details including dos and donts
  const procedureDetails = getProcedureDetails(id || "");
  
  // Merge the procedure from DB with the details (which might come from mock data)
  const enhancedProcedure: ProcedureDetail = {
    ...procedure, // DB fields (id, name, date, doctor, location, notes)
    description: procedureDetails?.description || "No description available",
    dos: procedureDetails?.dos || [],
    donts: procedureDetails?.donts || [],
    preparations: procedureDetails?.preparations || []
  };

  // Use the ProcedureDetailsView component which has better UI
  return <ProcedureDetailsView procedure={enhancedProcedure} />;
};

export default ProcedureDetails;
