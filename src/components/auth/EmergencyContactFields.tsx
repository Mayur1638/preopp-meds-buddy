
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignUpFormValues } from "./hooks/useSignUpForm";

interface EmergencyContactFieldsProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  disabled?: boolean;
}

export function EmergencyContactFields({ register, errors, disabled }: EmergencyContactFieldsProps) {
  return (
    <fieldset className="border rounded-xl p-3 mt-2">
      <legend className="text-sm font-medium px-1">Emergency Contact</legend>
      <div className="space-y-2">
        <Input
          id="emergencyName"
          placeholder="Name"
          {...register("emergencyName", { required: "Emergency name is required" })}
          disabled={disabled}
        />
        {errors.emergencyName && (
          <span className="text-destructive text-xs">{errors.emergencyName.message}</span>
        )}
        <Input
          id="emergencyContact"
          placeholder="Contact (phone/email)"
          {...register("emergencyContact", { required: "Emergency contact is required" })}
          disabled={disabled}
        />
        {errors.emergencyContact && (
          <span className="text-destructive text-xs">{errors.emergencyContact.message}</span>
        )}
        <Input
          id="emergencyRelation"
          placeholder="Relationship"
          {...register("emergencyRelation", { required: "Emergency relationship is required" })}
          disabled={disabled}
        />
        {errors.emergencyRelation && (
          <span className="text-destructive text-xs">{errors.emergencyRelation.message}</span>
        )}
      </div>
    </fieldset>
  );
}
