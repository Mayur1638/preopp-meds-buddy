
import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";
import { useEffect, useState } from "react";
import { ProcedureDetail } from "@/types";

const ProcedureDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProcedureDetails } = useMedication();
  const [procedureDetails, setProcedureDetails] = useState<ProcedureDetail | null>(null);
  
  useEffect(() => {
    if (id) {
      const details = getProcedureDetails(id);
      setProcedureDetails(details);
    }
  }, [id, getProcedureDetails]);
  
  if (!id) {
    return <Navigate to="/procedures" />;
  }
  
  if (!procedureDetails) {
    return <Navigate to="/procedures" />;
  }

  return (
    <ProcedureDetailsView procedure={procedureDetails} />
  );
};

export default ProcedureDetails;
