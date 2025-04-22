
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function FormInput({ label, className, id, icon, ...props }: FormInputProps) {
  const inputId = id || props.name;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input id={inputId} className={`${className} ${icon ? 'pr-12' : ''}`} {...props} />
        {icon && (
          <div className="absolute right-0 top-0 h-full flex items-center px-4 text-white">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
