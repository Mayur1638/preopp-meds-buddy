
import { Medication } from "@/types";
import { useMedication } from "@/contexts/MedicationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { MedicationForm } from "./MedicationForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatTime } from "@/lib/utils";

export function MedicationList() {
  const { medications, deleteMedication } = useMedication();
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [medicationToDelete, setMedicationToDelete] = useState<Medication | null>(null);

  const handleEditMedication = (medication: Medication) => {
    setEditingMedication(medication);
  };

  const handleDeleteMedication = (medication: Medication) => {
    setMedicationToDelete(medication);
  };

  const confirmDelete = () => {
    if (medicationToDelete) {
      deleteMedication(medicationToDelete.id);
      setMedicationToDelete(null);
    }
  };

  const handleCloseForm = () => {
    setEditingMedication(null);
    setIsAddingMedication(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ fontSize: 16 }}>Your medications</span>
        </div>
        <Button
          size="sm"
          aria-label="Add Medication"
          onClick={() => setIsAddingMedication(true)}
          variant="outline"
          className="flex gap-1 items-center px-3 py-1 rounded hover:bg-primary/10 duration-150"
        >
          <Plus size={18} /> Add
        </Button>
      </div>

      {isAddingMedication && (
        <MedicationForm onClose={handleCloseForm} />
      )}

      {editingMedication && (
        <MedicationForm medication={editingMedication} onClose={handleCloseForm} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{medication.name}</CardTitle>
                <Badge variant="outline">
                  {medication.quantity}
                </Badge>
              </div>
              <CardDescription>
                {medication.dosage}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{formatTime(medication.time)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Start: </span>
                  <span>{new Date(medication.start_date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">End: </span>
                  <span>{new Date(medication.end_date).toLocaleDateString()}</span>
                </div>
                {medication.instructions && (
                  <div className="text-sm mt-2">
                    <span className="text-muted-foreground">Instructions: </span>
                    <span>{medication.instructions}</span>
                  </div>
                )}
                <div className="flex space-x-2 mt-4 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMedication(medication)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteMedication(medication)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {medications.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 border border-dashed rounded-lg border-muted-foreground/30">
            <div className="text-center">
              <p className="text-muted-foreground">No medications found</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => setIsAddingMedication(true)}
              >
                Add your first medication
              </Button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={!!medicationToDelete} onOpenChange={(open) => !open && setMedicationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {medicationToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
