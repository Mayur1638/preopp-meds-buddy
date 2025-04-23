
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProcedureDonts({ donts }: { donts: string[] }) {
  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
          Don'ts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {donts.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 text-destructive mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
