
export function ProcedureNotes({ notes }: { notes?: string }) {
  if (!notes) return null;
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
      <p className="text-muted-foreground">{notes}</p>
    </div>
  );
}
