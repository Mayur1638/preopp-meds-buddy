
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
  emergencyName: string;
  emergencyContact: string;
  emergencyRelation: string;
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
      emergencyName: "",
      emergencyContact: "",
      emergencyRelation: "",
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
      emergencyName,
      emergencyContact,
      emergencyRelation
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
      await signUp(email, password, name);
      
      const { data: { session } } = await import("@/integrations/supabase/client").then(m => m.supabase.auth.getSession());
      const userId = session?.user?.id;

      if (userId) {
        await import("@/integrations/supabase/client").then(async m => {
          const { supabase } = m;
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
            toast({
              title: "Error",
              description: "Could not complete your medical profile: " + error.message,
              variant: "destructive",
            });
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
