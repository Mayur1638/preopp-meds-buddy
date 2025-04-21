
import React from "react";

export const AppLogo = ({ size = 48, withText = false }: { size?: number; withText?: boolean }) => (
  <div className="flex items-center gap-2 select-none">
    <img
      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=128&q=80"
      alt="App Logo"
      style={{ width: size, height: size, borderRadius: 12, objectFit: "cover", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
      className="bg-muted"
    />
    {withText && (
      <span className="font-bold text-lg md:text-xl text-gradient" style={{ letterSpacing: 2 }}>
        PreOpp<span className="text-primary">Buddy</span>
      </span>
    )}
  </div>
);
