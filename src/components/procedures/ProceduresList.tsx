
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProcedureCard } from "./ProcedureCard";
import { Procedure } from "@/types";

interface ProceduresListProps {
  procedures: Procedure[];
  onReschedule: (id: string) => void;
  type: "upcoming" | "past";
}

export const ProceduresList = ({ procedures, onReschedule, type }: ProceduresListProps) => {
  if (procedures.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No {type} procedures {type === "upcoming" ? "scheduled" : "found"}.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {procedures.map((procedure) => (
        <ProcedureCard 
          key={procedure.id} 
          procedure={procedure}
          onReschedule={() => onReschedule(procedure.id)}
        />
      ))}
    </div>
  );
};
