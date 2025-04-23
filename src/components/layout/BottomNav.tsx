
import { Home, Pill, Calendar, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LogoutDialog } from "./LogoutDialog";

export function BottomNav() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => setShowLogout(true);

  const handleConfirm = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
    } finally {
      setShowLogout(false);
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => setShowLogout(false);

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { path: "/medications", label: "Meds", icon: <Pill className="h-5 w-5" /> },
    { path: "/procedures", label: "Procedures", icon: <Calendar className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 text-destructive",
              isLoggingOut ? "opacity-50 cursor-not-allowed" : "hover:text-destructive/80"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1">{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </nav>
      <LogoutDialog open={showLogout} onConfirm={handleConfirm} onCancel={handleCancel} />
    </>
  );
}
