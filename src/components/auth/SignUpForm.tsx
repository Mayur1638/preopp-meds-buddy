
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SignUpFormProps {
  onToggleForm: () => void;
}

export function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const genderOptions = ["Male", "Female", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const [isLoading, setIsLoading] = useState(false);
  const [ehrLoading, setEhrLoading] = useState(false);
  const [ehrSuccess, setEhrSuccess] = useState(false);

  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword ||
        !dob || !height || !weight || !gender || !bloodGroup ||
        !emergencyName || !emergencyContact || !emergencyRelation
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      setIsLoading(false);
      setEhrLoading(true);
      // Mimic EHR fetch 6-7s, show modal
      setTimeout(() => {
        setEhrLoading(false);
        setEhrSuccess(true);
      }, 6500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    }
  };

  const closeEhrSuccess = () => setEhrSuccess(false);

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-lg animate-slide-in-bottom">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gradient">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading || ehrLoading}
                className="focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || ehrLoading}
                className="focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || ehrLoading}
                className="focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || ehrLoading}
                className="focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="block text-sm">Date of Birth</label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={isLoading || ehrLoading}
                className="focus:border-primary"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="space-y-2 flex-1">
                <label htmlFor="height" className="block text-sm">Height (cm)</label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  disabled={isLoading || ehrLoading}
                  required
                />
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="weight" className="block text-sm">Weight (kg)</label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={isLoading || ehrLoading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="allergies" className="block text-sm">Allergies</label>
              <Input
                id="allergies"
                placeholder="Allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                disabled={isLoading || ehrLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm">Gender</label>
              <select
                id="gender"
                value={gender}
                className="w-full rounded border py-2 text-foreground bg-background"
                onChange={(e) => setGender(e.target.value)}
                disabled={isLoading || ehrLoading}
                required
              >
                <option value="">Select Gender</option>
                {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="bloodGroup" className="block text-sm">Blood Group</label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                className="w-full rounded border py-2 text-foreground bg-background"
                onChange={(e) => setBloodGroup(e.target.value)}
                disabled={isLoading || ehrLoading}
                required
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <fieldset className="border rounded-xl p-3 mt-2">
              <legend className="text-sm font-medium px-1">Emergency Contact</legend>
              <div className="space-y-2">
                <Input
                  id="emergencyName"
                  placeholder="Name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  disabled={isLoading || ehrLoading}
                  required
                />
                <Input
                  id="emergencyContact"
                  placeholder="Contact (phone/email)"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  disabled={isLoading || ehrLoading}
                  required
                />
                <Input
                  id="emergencyRelation"
                  placeholder="Relationship"
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                  disabled={isLoading || ehrLoading}
                  required
                />
              </div>
            </fieldset>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || ehrLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                size="sm"
                onClick={onToggleForm}
                disabled={isLoading || ehrLoading}
                className="text-primary p-0"
              >
                Sign in
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      {/* EHR Fetch Loading Modal */}
      <Dialog open={ehrLoading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fetching Data</DialogTitle>
            <DialogDescription>
              All your medical data is being fetched from EHR. Please wait...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* EHR Fetch Success Modal */}
      <Dialog open={ehrSuccess} onOpenChange={closeEhrSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Data Fetch Successful</DialogTitle>
            <DialogDescription>
              Your medical records have been synced!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={closeEhrSuccess} className="mt-2" type="button">Continue</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
