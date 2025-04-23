
import { Calendar, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProcedurePreparations({ preparations }: { preparations: string[] }) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Preparations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {preparations.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
