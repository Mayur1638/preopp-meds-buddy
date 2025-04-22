
import React from "react";
import { FormInput } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";

interface PatientProfileFormProps {
  profile: {
    name: string;
    email: string;
    dob: string;
    height: string;
    weight: string;
    allergies: string;
    gender: string;
    bloodGroup: string;
  };
  onSave: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const genderOptions = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const PatientProfileForm: React.FC<PatientProfileFormProps> = ({
  profile,
  onSave,
  onCancel,
  onChange,
}) => {
  return (
    <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <FormInput 
        label="Name" 
        name="name" 
        value={profile.name} 
        onChange={onChange} 
        placeholder="Full Name" 
        disabled 
      />
      <FormInput 
        label="Email" 
        name="email" 
        value={profile.email} 
        onChange={onChange} 
        placeholder="Email" 
        disabled 
      />
      <FormInput 
        label="Date of Birth" 
        name="dob" 
        type="date" 
        value={profile.dob} 
        onChange={onChange} 
      />
      <FormInput 
        label="Height (cm)" 
        name="height" 
        type="number" 
        value={profile.height} 
        onChange={onChange} 
      />
      <FormInput 
        label="Weight (kg)" 
        name="weight" 
        type="number" 
        value={profile.weight} 
        onChange={onChange} 
      />
      <FormInput 
        label="Allergies" 
        name="allergies" 
        value={profile.allergies} 
        onChange={onChange} 
      />
      <div>
        <label className="block mb-1 text-xs">Gender</label>
        <select 
          name="gender" 
          value={profile.gender} 
          onChange={onChange} 
          className="w-full border rounded p-2 text-xs text-foreground bg-background"
        >
          <option value="">Select Gender</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-xs">Blood Group</label>
        <select 
          name="bloodGroup" 
          value={profile.bloodGroup} 
          onChange={onChange} 
          className="w-full border rounded p-2 text-xs text-foreground bg-background"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};
