
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If user is authenticated, redirect to home, otherwise to auth
  return user ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />;
};

export default Index;
