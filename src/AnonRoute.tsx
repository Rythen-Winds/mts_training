import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './DB/AuthProvider';

export const AnonRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated, otherwise redirect to login
  if (isAuthenticated) {
    // Redirect to the login route if user is null
    // You can replace '/login' with your actual login route
    return <Navigate to='/' />;
  }

  return <>{element}</>;
};
