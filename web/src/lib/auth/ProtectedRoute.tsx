import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/web/lib/auth';

interface ProtectedRouteProps {
  redirectPath: string;
  children: React.ReactElement;
}

export function ProtectedRoute({
  redirectPath,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
}
