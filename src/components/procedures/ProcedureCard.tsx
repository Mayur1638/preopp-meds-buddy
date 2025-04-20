
import { Procedure } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcedureCardProps {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  const procedureDate = new Date(procedure.date);
  const today = new Date();
  const daysUntil = Math.ceil((procedureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  let badgeText = "";
  let badgeVariant: "default" | "outline" | "secondary" | "destructive" = "outline";
  
  if (daysUntil < 0) {
    badgeText = "Past";
    badgeVariant = "outline";
  } else if (daysUntil === 0) {
    badgeText = "Today";
    badgeVariant = "destructive";
  } else if (daysUntil <= 3) {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "destructive";
  } else if (daysUntil <= 7) {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "default";
  } else {
    badgeText = `${daysUntil} days away`;
    badgeVariant = "secondary";
  }
  
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{procedure.name}</CardTitle>
          <Badge variant={badgeVariant}>
            {badgeText}
          </Badge>
        </div>
        <CardDescription>
          with {procedure.doctor}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{procedureDate.toLocaleDateString(undefined, { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          {procedure.location && (
            <div className="text-sm">
              <span className="text-muted-foreground">Location: </span>
              <span>{procedure.location}</span>
            </div>
          )}
          {procedure.notes && (
            <div className="text-sm mt-2">
              <span className="text-muted-foreground">Notes: </span>
              <span>{procedure.notes}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/procedures/${procedure.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
