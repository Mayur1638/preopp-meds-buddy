
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm px-4 py-3">
          <div className="container mx-auto text-center">
            <Link to="/" className="inline-block">
              <span className="font-bold text-xl text-gradient">PreOpp<span className="text-primary">Buddy</span></span>
            </Link>
          </div>
        </header>
      )}
      <main className={`container mx-auto px-4 ${user ? 'pt-20 pb-24' : 'py-10'}`}>
        {children}
      </main>
      {user && <BottomNav />}
      <Toaster />
    </div>
  );
}
