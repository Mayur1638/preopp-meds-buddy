import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ProfilePreview } from "@/components/profile/ProfilePreview";
import { PatientProfileForm } from "@/components/profile/PatientProfileForm";
import { EmergencyContactForm } from "@/components/profile/EmergencyContactForm";
import { usePatientData } from "@/hooks/usePatientData";
import { useEmergencyContact } from "@/hooks/useEmergencyContact";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const { patientData, updateProfile, isLoading: profileLoading } = usePatientData();
  const { emergencyContact, isLoading: contactLoading } = useEmergencyContact();
  
  const [profile, setProfile] = useState({
    name: patientData?.pateint_name || "Archana Tripathi",
    email: user?.email || "archana@example.com",
    dob: patientData?.patient_dob || "",
    height: patientData?.patient_height?.toString() || "",
    weight: patientData?.patient_weight?.toString() || "",
    allergies: patientData?.allergies || "",
    gender: patientData?.gender || "",
    bloodGroup: patientData?.blood_group || "",
    emergencyContact: {
      name: emergencyContact?.contact_name || "",
      contact: emergencyContact?.contact_number?.toString() || "",
      relationship: emergencyContact?.contact_relation || "",
    }
  });
  
  useEffect(() => {
    if (patientData) {
      setProfile(prev => ({
        ...prev,
        name: patientData.pateint_name || prev.name,
        dob: patientData.patient_dob || prev.dob,
        height: patientData.patient_height?.toString() || prev.height,
        weight: patientData.patient_weight?.toString() || prev.weight,
        allergies: patientData.allergies || prev.allergies,
        gender: patientData.gender || prev.gender,
        bloodGroup: patientData.blood_group || prev.bloodGroup,
      }));
    }
  }, [patientData]);

  useEffect(() => {
    if (emergencyContact) {
      setProfile(prev => ({
        ...prev,
        emergencyContact: {
          name: emergencyContact.contact_name || "",
          contact: emergencyContact.contact_number?.toString() || "",
          relationship: emergencyContact.contact_relation || "",
        }
      }));
    }
  }, [emergencyContact]);
  
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingEmergencyContact, setEditingEmergencyContact] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
      console.error('Error updating profile:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  if (profileLoading || contactLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile data...</div>;
  }

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
            onSave={() => setEditingEmergencyContact(false)}
            onCancel={() => setEditingEmergencyContact(false)}
            onChange={handleEmergencyContactChange}
          />
        )}
      </div>
    </div>
  );
}
