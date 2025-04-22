
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const genderOptions = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const relationshipOptions = ["Parent", "Spouse", "Child", "Friend", "Other"];

export default function Profile() {
  const { user } = useAuth();
  // Mock for demo: normally, this would fetch/save extended profile from context/api/localStorage
  const [profile, setProfile] = useState({
    name: "Archana Tripathi",
    email: "archana@example.com",
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

  const handleEmergencyRelationshipChange = (value: string) => {
    setProfile({
      ...profile,
      emergencyContact: {
        ...profile.emergencyContact,
        relationship: value
      }
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    if (newTheme === "light") {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Should save to context/api for real app!

  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun size={20} className="text-primary" />
            <Label htmlFor="theme-toggle">Light Mode</Label>
            <Switch 
              id="theme-toggle" 
              checked={theme === "light"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        <ProfilePreview profile={profile} onEdit={() => setEditing(true)} />
      </div>
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
            <div className="space-y-3">
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
              <div className="space-y-2">
                <label className="block text-xs">Relationship</label>
                <Select
                  value={profile.emergencyContact.relationship}
                  onValueChange={handleEmergencyRelationshipChange}
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
            </div>
          </fieldset>
          <Button type="button" disabled>
            Save Changes  {/* Placeholder, implement save next! */}
          </Button>
        </form>
      </div>
    </div>
  );
}
