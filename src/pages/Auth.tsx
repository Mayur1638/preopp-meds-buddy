
import { useState } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {isSignUp ? (
        <SignUpForm onToggleForm={() => setIsSignUp(false)} />
      ) : (
        <SignInForm onToggleForm={() => setIsSignUp(true)} />
      )}
    </div>
  );
}
