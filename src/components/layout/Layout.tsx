
import { Navbar } from "./Navbar";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user && <Navbar />}
      <main className={`container mx-auto px-4 ${user ? 'pt-20 pb-10' : 'py-10'}`}>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
