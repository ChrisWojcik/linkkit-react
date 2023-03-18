import React, { useState, useMemo } from 'react';
import { User } from '@/web/lib/api';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user] = useState<User | null>(
    window.__INITIAL_STATE__?.auth?.user || null
  );

  const contextValue = useMemo(
    () => ({ user, isAuthenticated: !!user }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
