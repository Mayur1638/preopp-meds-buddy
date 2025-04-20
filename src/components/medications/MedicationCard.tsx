
import { TodayMedication } from "@/types";
import { useMedication } from "@/contexts/MedicationContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface MedicationCardProps {
  medication: TodayMedication;
  isImmediate?: boolean;
}

export function MedicationCard({ medication, isImmediate }: MedicationCardProps) {
  const { markMedicationTaken, markMedicationSkipped } = useMedication();

  const handleMarkTaken = () => {
    markMedicationTaken(medication.id);
  };

  const handleMarkSkipped = () => {
    markMedicationSkipped(medication.id);
  };

  return (
    <Card className={`w-full shadow-md transition-all duration-300 ${
      medication.status === 'taken' ? 'border-success/50 bg-success/10' :
      medication.status === 'skipped' ? 'border-destructive/50 bg-destructive/10' :
      isImmediate ? 'border-primary/50 bg-primary/5 animate-pulse-gentle' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className={medication.status === 'skipped' ? 'text-destructive' : ''}>
            {medication.name}
          </CardTitle>
          {medication.status === 'pending' && (
            <Badge 
              variant={isImmediate ? "default" : "outline"} 
              className={isImmediate ? "bg-primary text-primary-foreground" : ""}
            >
              {isImmediate ? "Take Now" : formatTime(medication.time)}
            </Badge>
          )}
          {medication.status === 'taken' && (
            <Badge variant="outline" className="bg-success/20 text-success border-success/30">
              <CheckCircle className="mr-1 h-3 w-3" /> Taken
            </Badge>
          )}
          {medication.status === 'skipped' && (
            <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
              <XCircle className="mr-1 h-3 w-3" /> Skipped
            </Badge>
          )}
        </div>
        <CardDescription>
          {medication.dosage} - {medication.quantity}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{formatTime(medication.time)}</span>
          {medication.instructions && (
            <span className="ml-2 text-muted-foreground">({medication.instructions})</span>
          )}
        </div>
      </CardContent>
      {medication.status === 'pending' && (
        <CardFooter className="pt-0">
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-success hover:border-success hover:bg-success/20 text-success"
              onClick={handleMarkTaken}
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Taken
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-destructive hover:border-destructive hover:bg-destructive/20 text-destructive"
              onClick={handleMarkSkipped}
            >
              <XCircle className="mr-1 h-4 w-4" />
              Skip
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
