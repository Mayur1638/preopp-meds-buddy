
import { ProcedureDetail } from "@/types";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface ProcedureDetailsInfoProps {
  procedure: ProcedureDetail;
  procedureDate: Date;
}

export function ProcedureDetailsInfo({ procedure, procedureDate }: ProcedureDetailsInfoProps) {
  return (
    <React.Fragment>
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
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
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
      </CardContent>
    </React.Fragment>
  );
}
