import React, { createContext } from 'react';
import { User } from '@/api/modules/auth/models';

export const CurrentUserContext = createContext({
  user: null,
  isAuthenticated: false,
});

interface CurrentUserProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export function CurrentUserProvider(props: CurrentUserProviderProps) {
  return (
    <CurrentUserContext.Provider
      value={{ user: props.user, isAuthenticated: !!props.user }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
}
