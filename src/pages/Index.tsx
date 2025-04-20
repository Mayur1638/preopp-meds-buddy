
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // This is just a redirect to the appropriate route based on authentication status
  return <Navigate to="/auth" replace />;
};

export default Index;
