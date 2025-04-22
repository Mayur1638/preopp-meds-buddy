import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { PatientProfileForm } from "@/components/profile/PatientProfileForm";
import { EmergencyContactForm } from "@/components/profile/EmergencyContactForm";
import { usePatientData } from "@/hooks/usePatientData";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const { patientData, updateProfile } = usePatientData();
  
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
  
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingEmergencyContact, setEditingEmergencyContact] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setProfile({
      ...profile,
      emergencyContact: {
        ...profile.emergencyContact,
        [field]: value
      }
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        pateint_name: profile.name,
        patient_dob: profile.dob,
        patient_height: Number(profile.height),
        patient_weight: Number(profile.weight),
        gender: profile.gender,
        blood_group: profile.bloodGroup,
        allergies: profile.allergies,
      });
      
      setEditingProfile(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleSaveEmergencyContact = () => {
    // TODO: Implement emergency contact save functionality
    setEditingEmergencyContact(false);
    toast.success("Emergency contact updated");
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

  if (!editingProfile && !editingEmergencyContact) {
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

        <ProfilePreview 
          profile={profile} 
          onEditProfile={() => setEditingProfile(true)}
          onEditEmergencyContact={() => setEditingEmergencyContact(true)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto grid gap-6 pt-4">
      <div className="bg-card rounded-lg shadow-lg p-4">
        {editingProfile && (
          <PatientProfileForm
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={() => setEditingProfile(false)}
            onChange={handleProfileChange}
          />
        )}
        
        {editingEmergencyContact && (
          <EmergencyContactForm
            contact={profile.emergencyContact}
            onSave={handleSaveEmergencyContact}
            onCancel={() => setEditingEmergencyContact(false)}
            onChange={handleEmergencyContactChange}
          />
        )}
      </div>
    </div>
  );
}
