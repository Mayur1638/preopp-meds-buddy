
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProfileData = {
  name: string;
  email: string;
  dob: string;
  height: string;
  weight: string;
  allergies: string;
  gender: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    contact: string;
    relationship: string;
  };
};

interface ProfilePreviewProps {
  profile: ProfileData;
  onEdit: () => void;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profile, onEdit }) => {
  return (
    <div className="max-w-xl mx-auto pt-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Patient Profile</CardTitle>
            <CardDescription className="text-xs">Preview your medical & personal details</CardDescription>
          </div>
          <Button variant="ghost" size="icon" aria-label="Edit Profile" onClick={onEdit}>
            <Edit size={18} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2 text-sm">
            <ProfileRow label="Name" value={profile.name} />
            <ProfileRow label="Email" value={profile.email} />
            <ProfileRow label="Date of Birth" value={profile.dob} />
            <ProfileRow label="Height" value={profile.height ? `${profile.height} cm` : ""} />
            <ProfileRow label="Weight" value={profile.weight ? `${profile.weight} kg` : ""} />
            <ProfileRow label="Allergies" value={profile.allergies} />
            <ProfileRow label="Gender" value={profile.gender} />
            <ProfileRow label="Blood Group" value={profile.bloodGroup} />
          </div>
        </CardContent>
      </Card>
      
      {/* Separate Emergency Contact Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-2 text-sm">
            <ProfileRow label="Name" value={profile.emergencyContact.name} />
            <ProfileRow label="Contact" value={profile.emergencyContact.contact} />
            <ProfileRow label="Relation" value={profile.emergencyContact.relationship} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center py-0.5">
    <div className="w-32 text-muted-foreground font-medium text-xs">{label}</div>
    <div className="truncate">{value || <span className="text-muted-foreground">—</span>}</div>
  </div>
);
