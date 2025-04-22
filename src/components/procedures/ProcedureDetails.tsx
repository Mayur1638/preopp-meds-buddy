
import { Procedure } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface ProcedureDetailsProps {
  procedure: Procedure;
}

export function ProcedureDetailsView({ procedure }: ProcedureDetailsProps) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/procedures">
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Procedures
          </Button>
        </Link>
        <Badge variant={badgeVariant} className="text-sm">
          {badgeText}
        </Badge>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{procedure.name}</CardTitle>
          <CardDescription className="text-lg flex items-center">
            <User className="h-4 w-4 mr-1 text-muted-foreground" />
            {procedure.doctor}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{procedureDate.toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            
            {procedure.location && (
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>{procedure.location}</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">About the Procedure</h3>
            <p className="text-muted-foreground">{procedure.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-success/30 bg-success/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {procedure.dos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-success mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {procedure.donts.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Preparations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {procedure.preparations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {procedure.notes && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
              <p className="text-muted-foreground">{procedure.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
