
import { MedicationList } from "@/components/medications/MedicationList";

const Medications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medications</h1>
      <MedicationList />
    </div>
  );
};

export default Medications;
