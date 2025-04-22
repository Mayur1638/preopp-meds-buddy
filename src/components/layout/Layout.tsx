
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { AppLogo } from "@/components/common/AppLogo";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {user && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm px-4 py-2">
          <div className="container mx-auto flex justify-center items-center">
            <Link to="/" className="inline-block">
              <AppLogo size={36} />
            </Link>
          </div>
        </header>
      )}
      <main className={`container mx-auto px-4 ${user ? 'pt-16 pb-24' : 'py-8'}`}>
        {children}
      </main>
      {user && <BottomNav />}
      <Toaster />
    </div>
  );
}
