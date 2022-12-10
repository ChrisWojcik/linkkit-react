import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  element: React.ReactElement;
}

export function ProtectedRoute({
  isAllowed,
  redirectPath,
  element,
}: ProtectedRouteProps) {
  return isAllowed ? element : <Navigate to={redirectPath} replace />;
}
