'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthSession } from './types';
import { mockUsers } from './mock-data';

interface AuthContextType {
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, fullName: string, role: 'student' | 'teacher') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('finquest_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSession(parsed);
        } catch (e) {
          console.log('[v0] Failed to parse stored session');
          localStorage.removeItem('finquest_session');
        }
      }
    } catch (e) {
      console.log('[v0] localStorage access error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Mock authentication - in production, call your API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = Object.values(mockUsers).find((u) => u.email === email);
    if (!user || password !== 'password') {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    const newSession: AuthSession = {
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
    };

    setSession(newSession);
    try {
      localStorage.setItem('finquest_session', JSON.stringify(newSession));
    } catch (e) {
      console.log('[v0] Failed to save session to localStorage:', e);
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    try {
      localStorage.removeItem('finquest_session');
    } catch (e) {
      console.log('[v0] Failed to remove session from localStorage:', e);
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, fullName: string, role: 'student' | 'teacher') => {
      setIsLoading(true);
      // Mock signup - in production, call your API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: `${role}-${Date.now()}`,
        email,
        fullName,
        role,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };

      const newSession: AuthSession = {
        user: newUser,
        token: `mock-token-${newUser.id}-${Date.now()}`,
      };

      setSession(newSession);
      try {
        localStorage.setItem('finquest_session', JSON.stringify(newSession));
      } catch (e) {
        console.log('[v0] Failed to save session to localStorage:', e);
      }
      setIsLoading(false);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isAuthenticated: !!session,
        user: session?.user || null,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
