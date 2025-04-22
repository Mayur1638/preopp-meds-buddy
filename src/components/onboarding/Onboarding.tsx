import React from 'react';
import { Pill, Calendar, Clock, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { AppLogo } from "@/components/common/AppLogo";

export const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const iconClassName = "text-primary";

  const onboardingSteps = [
    {
      icon: <Pill className={iconClassName} size={48} />,
      title: "Medication Management",
      description: "Track and manage your medications with ease"
    },
    {
      icon: <Calendar className={iconClassName} size={48} />,
      title: "Procedure Tracking",
      description: "Keep track of your upcoming medical procedures"
    },
    {
      icon: <Clock className={iconClassName} size={48} />,
      title: "Timely Reminders",
      description: "Never miss a medication or appointment"
    },
    {
      icon: <Heart className={iconClassName} size={48} />,
      title: "Personalized Health",
      description: "Your health companion, always by your side"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AppLogo size={60} withText />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient mb-1">Welcome to PreOpp<span className="text-primary">Buddy</span>!</h1>
        <p className="text-sm text-muted-foreground">Let's get you started with a quick tour.</p>
      </div>
      <div className="space-y-6">
        {onboardingSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="rounded-full bg-secondary p-3">{step.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-8" onClick={onFinish}>Get Started</Button>
    </div>
  );
};
