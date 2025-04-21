
import React from "react";
import { Pill } from "lucide-react";

export const AppLogo = ({
  size = 48,
  withText = false,
}: { size?: number; withText?: boolean }) => (
  <div className="flex items-center gap-2 select-none">
    <span
      className="rounded-2xl bg-gradient-to-br from-primary via-accent to-muted shadow-md flex items-center justify-center"
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: "inline-flex",
      }}
    >
      <Pill size={size * 0.7} className="text-card-foreground" strokeWidth={2.5} />
    </span>
    {withText && (
      <span
        className="font-bold text-lg md:text-xl text-gradient"
        style={{ letterSpacing: 2 }}
      >
        PreOpp<span className="text-primary">Buddy</span>
      </span>
    )}
  </div>
);
