
import { useState } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">PreOpp<span className="text-primary">Buddy</span></h1>
        <p className="text-lg text-muted-foreground">Your pre-operative medication companion</p>
      </div>
      
      {isSignIn ? (
        <SignInForm onToggleForm={toggleForm} />
      ) : (
        <SignUpForm onToggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Auth;
