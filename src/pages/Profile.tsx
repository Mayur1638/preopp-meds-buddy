
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { ProfilePreview } from "@/components/profile/ProfilePreview";

const genderOptions = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function Profile() {
  const { user } = useAuth();
  // Mock for demo: normally, this would fetch/save extended profile from context/api/localStorage
  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    dob: "",
    height: "",
    weight: "",
    allergies: "",
    gender: "",
    bloodGroup: "",
    emergencyContact: {
      name: "",
      contact: "",
      relationship: "",
    }
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      emergencyContact: {
        ...profile.emergencyContact,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // Should save to context/api for real app!

  if (!editing) {
    return (
      <ProfilePreview profile={profile} onEdit={() => setEditing(true)} />
    );
  }

  return (
    <div className="max-w-xl mx-auto grid gap-6 pt-4">
      {/* Edit form */}
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
      </div>
      <div className="bg-card rounded-lg shadow-lg">
        <form className="grid gap-4 p-4">
          <FormInput 
            label="Name" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            placeholder="Full Name" 
            disabled 
          />
          <FormInput 
            label="Email" 
            name="email" 
            value={profile.email} 
            onChange={handleChange} 
            placeholder="Email" 
            disabled 
          />
          <FormInput 
            label="Date of Birth" 
            name="dob" 
            type="date" 
            value={profile.dob} 
            onChange={handleChange} 
          />
          <FormInput 
            label="Height (cm)" 
            name="height" 
            type="number" 
            value={profile.height} 
            onChange={handleChange} 
          />
          <FormInput 
            label="Weight (kg)" 
            name="weight" 
            type="number" 
            value={profile.weight} 
            onChange={handleChange} 
          />
          <FormInput 
            label="Allergies" 
            name="allergies" 
            value={profile.allergies} 
            onChange={handleChange} 
          />
          <div>
            <label className="block mb-1 text-xs">Gender</label>
            <select name="gender" value={profile.gender} onChange={handleSelectChange} className="w-full border rounded p-2 text-xs text-foreground bg-background">
              <option value="">Select Gender</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-xs">Blood Group</label>
            <select name="bloodGroup" value={profile.bloodGroup} onChange={handleSelectChange} className="w-full border rounded p-2 text-xs text-foreground bg-background">
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <fieldset className="border rounded-xl p-3 mt-2">
            <legend className="text-xs font-medium px-1">Emergency Contact</legend>
            <FormInput 
              label="Name" 
              name="name" 
              value={profile.emergencyContact.name} 
              onChange={handleEmergencyContactChange} 
              placeholder="Contact Name" 
            />
            <FormInput 
              label="Contact" 
              name="contact" 
              value={profile.emergencyContact.contact} 
              onChange={handleEmergencyContactChange} 
              placeholder="Phone/Email" 
            />
            <FormInput 
              label="Relationship" 
              name="relationship" 
              value={profile.emergencyContact.relationship} 
              onChange={handleEmergencyContactChange} 
              placeholder="Relation" 
            />
          </fieldset>
          <Button type="button" disabled>
            Save Changes  {/* Placeholder, implement save next! */}
          </Button>
        </form>
      </div>
    </div>
  );
}
