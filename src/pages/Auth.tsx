
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { AppLogo } from "@/components/common/AppLogo";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { useAuth } from "@/contexts/AuthContext";

const ONBOARD_KEY = "preopp-onboarding-complete";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARD_KEY);
    if (!onboarded) setShowOnboarding(true);
  }, []);

  const onFinishOnboarding = () => {
    localStorage.setItem(ONBOARD_KEY, "true");
    setShowOnboarding(false);
  };

  // If loading, show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user is authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  if (showOnboarding) {
    return <Onboarding onFinish={onFinishOnboarding} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8 flex flex-col items-center gap-2">
        <AppLogo size={60} />
        <h1 className="text-2xl font-bold text-gradient mb-1">PreOpp<span className="text-primary">Buddy</span></h1>
        <p className="text-sm text-muted-foreground">Your pre-operative medication companion</p>
      </div>
      {isSignIn ? (
        <SignInForm onToggleForm={() => setIsSignIn(false)} />
      ) : (
        <SignUpForm onToggleForm={() => setIsSignIn(true)} />
      )}
    </div>
  );
};

export default Auth;
