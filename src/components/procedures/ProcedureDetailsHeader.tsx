
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcedureDetailsHeaderProps {
  badgeText: string;
  badgeVariant: "default" | "outline" | "secondary" | "destructive";
  onEdit: () => void;
}

export function ProcedureDetailsHeader({
  badgeText,
  badgeVariant,
  onEdit,
}: ProcedureDetailsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <Link to="/procedures">
        <Button variant="ghost" className="flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Procedures
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Badge variant={badgeVariant} className="text-sm">
          {badgeText}
        </Badge>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
          className="flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}
