
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProcedureDos({ dos }: { dos: string[] }) {
  return (
    <Card className="border-success/30 bg-success/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-success" />
          Do's
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {dos.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-success mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
