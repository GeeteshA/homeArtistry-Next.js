// src/context/AuthContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: null | { email: string; name: string };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | { email: string; name: string }>(null);

  const login = async (email: string) => {
    // Frontend-only mock implementation
    setUser({ email, name: 'User Name' });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, name: string) => {
    // Frontend-only mock implementation
    setUser({ email, name });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};