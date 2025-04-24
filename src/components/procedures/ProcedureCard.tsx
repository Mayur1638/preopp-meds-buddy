
import { Procedure } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcedureCardProps {
  procedure: Procedure;
  onReschedule?: () => void;
  compact?: boolean;
}

export function ProcedureCard({ procedure, onReschedule, compact = false }: ProcedureCardProps) {
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
  
  const formattedDate = procedureDate.toLocaleDateString(undefined, { 
    weekday: compact ? 'short' : 'long', 
    year: 'numeric', 
    month: compact ? 'short' : 'long', 
    day: 'numeric' 
  });
  
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{procedure.name}</CardTitle>
          <Badge variant={badgeVariant}>
            {badgeText}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {procedure.doctor}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{formattedDate}</span>
        </div>
        {procedure.location && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{procedure.location}</span>
          </div>
        )}
        {procedure.notes && !compact && (
          <div className="text-sm mt-2">
            <span className="text-muted-foreground">Notes: </span>
            <span>{procedure.notes}</span>
          </div>
        )}
      </CardContent>
      
      {!compact && (
        <CardFooter className="pt-2 flex gap-2">
          <Link to={`/procedures/${procedure.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          {onReschedule && daysUntil >= 0 && (
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                onReschedule();
              }}
            >
              Edit
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
