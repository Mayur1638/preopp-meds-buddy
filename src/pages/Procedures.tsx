
import { useMedication } from "@/contexts/MedicationContext";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { Card } from "@/components/ui/card";

const Procedures = () => {
  const { procedures } = useMedication();
  
  // Sort procedures by date
  const sortedProcedures = [...procedures].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Split into upcoming and past procedures
  const today = new Date();
  const upcomingProcedures = sortedProcedures.filter(
    proc => new Date(proc.date) >= today
  );
  
  const pastProcedures = sortedProcedures.filter(
    proc => new Date(proc.date) < today
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Procedures</h1>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-medium">Upcoming Procedures</h2>
        
        {upcomingProcedures.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            No upcoming procedures scheduled.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        )}
      </div>
      
      {pastProcedures.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">Past Procedures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Procedures;
