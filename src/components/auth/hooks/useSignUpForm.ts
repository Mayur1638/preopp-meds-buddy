
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  height: string;
  weight: string;
  allergies: string;
  gender: string;
  bloodGroup: string;
}

export function useSignUpForm() {
  const { toast } = useToast();
  const { signUp } = useAuth();

  const [dataFetchLoading, setDataFetchLoading] = useState(false);
  const [dataFetchSuccess, setDataFetchSuccess] = useState(false);

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      height: "",
      weight: "",
      allergies: "",
      gender: "",
      bloodGroup: "",
    },
    mode: "onBlur",
    criteriaMode: "all",
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      dob,
      height,
      weight,
      allergies,
      gender,
      bloodGroup,
    } = values;

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields: Name, Email, and Password",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      form.setError("password", { type: "manual", message: "Password must be at least 8 characters." });
      return;
    }

    if (password !== confirmPassword) {
      form.setError("confirmPassword", { type: "manual", message: "Passwords do not match." });
      return;
    }

    form.clearErrors();

    try {
      // First sign up the user through auth system
      await signUp(email, password, name);
      
      // Now get the session to get the user ID
      const { data: { session } } = await import("@/integrations/supabase/client").then(m => m.supabase.auth.getSession());
      const userId = session?.user?.id;

      if (userId) {
        // Check if patient record already exists to avoid duplicate key error
        await import("@/integrations/supabase/client").then(async m => {
          const { supabase } = m;
          
          // First check if the patient record already exists
          const { data: existingPatient } = await supabase
            .from("patient_table")
            .select("id")
            .eq("id", userId)
            .maybeSingle();
            
          if (!existingPatient) {
            // Only insert if no record exists
            const { error } = await supabase
              .from("patient_table")
              .insert([{
                id: userId,
                pateint_name: name,
                patient_dob: dob || null,
                patient_height: height ? Number(height) : null,
                patient_weight: weight ? Number(weight) : null,
                gender: gender || null,
                blood_group: bloodGroup || null,
                allergies: allergies || null,
              }]);
              
            if (error) {
              console.error("Error creating patient profile:", error);
              toast({
                title: "Error",
                description: "Could not complete your medical profile: " + error.message,
                variant: "destructive",
              });
            }
          } else {
            // Update existing record
            const { error } = await supabase
              .from("patient_table")
              .update({
                pateint_name: name,
                patient_dob: dob || null,
                patient_height: height ? Number(height) : null,
                patient_weight: weight ? Number(weight) : null,
                gender: gender || null,
                blood_group: bloodGroup || null,
                allergies: allergies || null,
              })
              .eq("id", userId);
              
            if (error) {
              console.error("Error updating patient profile:", error);
              toast({
                title: "Error",
                description: "Could not update your medical profile: " + error.message,
                variant: "destructive",
              });
            }
          }
        });
      }

      setDataFetchLoading(true);
      setTimeout(() => {
        setDataFetchLoading(false);
        setDataFetchSuccess(true);
        setTimeout(() => setDataFetchSuccess(false), 2000);
      }, 2500);

      form.setValue("password", "");
      form.setValue("confirmPassword", "");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    }
  };

  return { form, handleSubmit, dataFetchLoading, dataFetchSuccess };
}
