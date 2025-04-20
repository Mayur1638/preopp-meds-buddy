
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Pill, Calendar, Settings, LogOut, AlignJustify, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: "/", label: "Home", icon: <Pill className="mr-2 h-4 w-4" /> },
    { path: "/medications", label: "Medications", icon: <Pill className="mr-2 h-4 w-4" /> },
    { path: "/procedures", label: "Procedures", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { path: "/profile", label: "Profile", icon: <Settings className="mr-2 h-4 w-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl text-gradient">PreOpp<span className="text-primary">Buddy</span></span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <AlignJustify className="h-6 w-6" />
          )}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button 
                variant={location.pathname === link.path ? "default" : "ghost"} 
                size="sm" 
                className="flex items-center"
              >
                {link.icon}
                {link.label}
              </Button>
            </Link>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-destructive"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border py-2 animate-slide-in-bottom">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button 
                  variant={location.pathname === link.path ? "default" : "ghost"} 
                  size="sm" 
                  className="flex items-center w-full justify-start my-1"
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-destructive w-full justify-start my-1"
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
