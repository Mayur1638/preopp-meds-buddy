
import React from "react";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import { useEmergencyContact } from "@/hooks/useEmergencyContact";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const relationshipOptions = ["Parent", "Spouse", "Child", "Friend", "Other"];

interface EmergencyContactFormProps {
  contact: {
    name: string;
    contact: string;
    relationship: string;
  };
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

export const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  contact,
  onSave,
  onCancel,
  onChange,
}) => {
  const { updateContact } = useEmergencyContact();

  const handleSave = async () => {
    try {
      await updateContact({
        contact_name: contact.name,
        contact_number: Number(contact.contact),
        contact_relation: contact.relationship,
      });
      onSave();
      toast.success("Emergency contact updated successfully");
    } catch (error) {
      toast.error("Failed to update emergency contact");
      console.error('Error updating emergency contact:', error);
    }
  };

  return (
    <div className="space-y-4">
      <FormInput 
        label="Name" 
        name="name" 
        value={contact.name} 
        onChange={(e) => onChange('name', e.target.value)} 
        placeholder="Contact Name" 
      />
      <FormInput 
        label="Contact" 
        name="contact" 
        value={contact.contact} 
        onChange={(e) => onChange('contact', e.target.value)} 
        placeholder="Phone/Email" 
        type="number"
      />
      <div className="space-y-2">
        <label className="block text-xs">Relationship</label>
        <Select
          value={contact.relationship}
          onValueChange={(value) => onChange('relationship', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Relationship" />
          </SelectTrigger>
          <SelectContent>
            {relationshipOptions.map((relation) => (
              <SelectItem key={relation} value={relation.toLowerCase()}>
                {relation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};
