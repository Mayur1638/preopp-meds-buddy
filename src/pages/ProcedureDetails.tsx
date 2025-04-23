import { useMedication } from "@/contexts/MedicationContext";
import { useParams, Navigate } from "react-router-dom";
import { ProcedureDetailsView } from "@/components/procedures/ProcedureDetails";
import { useEffect, useState } from "react";
import { ProcedureDetail } from "@/types";
import { DosAndDontsDetails } from "@/components/procedures/DosAndDontsDetails";

const ProcedureDetails = () => {
  // Instead of fetching, always show hardcoded details
  // (if you want to keep "real" details functionality as a toggle, let me know!)
  return <DosAndDontsDetails />;
};

export default ProcedureDetails;
