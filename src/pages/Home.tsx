
import { useMedication } from "@/contexts/MedicationContext";
import { MedicationCard } from "@/components/medications/MedicationCard";
import { ProcedureCard } from "@/components/procedures/ProcedureCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pill, Calendar, Plus, ArrowRight } from "lucide-react";

const Home = () => {
  const { todayMedications, procedures } = useMedication();
  
  // Find immediate medication (if any)
  const immediateMedication = todayMedications.find(med => med.isImmediate && med.status === 'pending');
  
  // Filter out medications that are not taken or skipped
  const pendingMedications = todayMedications.filter(med => med.status === 'pending');
  const takenMedications = todayMedications.filter(med => med.status === 'taken');
  const skippedMedications = todayMedications.filter(med => med.status === 'skipped');
  
  // Get upcoming procedures (max 2)
  const upcomingProcedures = procedures
    .filter(proc => new Date(proc.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to PreOpp<span className="text-primary">Buddy</span></h1>
      </div>
      
      {/* Immediate Medication Card */}
      {immediateMedication && (
        <Card className="border-primary/50 bg-primary/5 shadow-md animate-pulse-gentle">
          <CardHeader>
            <CardTitle className="text-xl">Take Now</CardTitle>
            <CardDescription>Your immediate medication</CardDescription>
          </CardHeader>
          <CardContent>
            <MedicationCard 
              medication={immediateMedication} 
              isImmediate={true} 
            />
          </CardContent>
        </Card>
      )}
      
      {/* Today's Medications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <Pill className="mr-2 h-5 w-5 text-primary" />
            Today's Medications
          </h2>
          <Link to="/medications">
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="mr-1 h-4 w-4" />
              Manage
            </Button>
          </Link>
        </div>
        
        {pendingMedications.length === 0 && takenMedications.length === 0 && skippedMedications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4">No medications scheduled for today</p>
              <Link to="/medications">
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Medication
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {pendingMedications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-md font-medium text-muted-foreground">Pending</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingMedications.map((medication) => (
                    <MedicationCard 
                      key={medication.id} 
                      medication={medication}
                      isImmediate={false}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {takenMedications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-md font-medium text-muted-foreground">Taken</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {takenMedications.map((medication) => (
                    <MedicationCard 
                      key={medication.id} 
                      medication={medication}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {skippedMedications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-md font-medium text-muted-foreground">Skipped</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skippedMedications.map((medication) => (
                    <MedicationCard 
                      key={medication.id} 
                      medication={medication}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Separator />
      
      {/* Upcoming Procedures */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Upcoming Procedures
          </h2>
          <Link to="/procedures">
            <Button variant="outline" size="sm" className="flex items-center">
              All Procedures
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {upcomingProcedures.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <p className="text-muted-foreground">No upcoming procedures</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
