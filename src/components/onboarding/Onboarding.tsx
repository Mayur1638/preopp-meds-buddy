
import React, { useState } from "react";
import { AppLogo } from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import { Pill, FlaskConical, Syringe } from "lucide-react";

const screens = [
  {
    title: "Welcome to PreOppBuddy",
    desc: "Your companion for safe pre-op medication management.",
    Icon: Pill,
    iconColor: "var(--primary)",
  },
  {
    title: "Track Meds Easily",
    desc: "Stay on top of every dose and never miss your critical medication before surgery!",
    Icon: FlaskConical,
    iconColor: "var(--accent)",
  },
  {
    title: "Be Prepared",
    desc: "Make pre-op safe, simple, and stress-free with your personal pre-surgery checklist.",
    Icon: Syringe,
    iconColor: "var(--success)",
  },
];

export function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [idx, setIdx] = useState(0);

  const next = () => {
    if (idx < screens.length - 1) setIdx((i) => i + 1);
    else onFinish();
  };

  const { Icon, iconColor } = screens[idx];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center animate-fade-in px-4 bg-background">
      <AppLogo size={60} />
      <div
        className="w-full max-w-sm mt-12 p-6 flex flex-col rounded-2xl shadow-md bg-card animate-slide-in-bottom"
        style={{ minHeight: 360 }}
      >
        <div className="mb-6 flex justify-center">
          <span
            className="rounded-xl p-5 bg-gradient-to-tr from-primary/20 via-accent/10 to-muted flex items-center justify-center shadow"
            style={{ animation: "pulse-gentle 2s infinite" }}
          >
            <Icon size={70} strokeWidth={2.5} style={{ color: `hsl(${iconColor})` }} />
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gradient text-center">
          {screens[idx].title}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">{screens[idx].desc}</p>
        <div className="flex flex-row items-center justify-center gap-2 mb-4">
          {screens.map((s, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-all ${
                i === idx ? "bg-primary" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        <Button size="sm" className="w-full text-base" onClick={next}>
          {idx < screens.length - 1 ? "Continue" : "Get Started"}
        </Button>
      </div>
    </div>
  );
}
