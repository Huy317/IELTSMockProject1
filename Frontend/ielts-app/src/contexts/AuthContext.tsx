import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserInfo } from '../services/authService';
import { getCurrentUser, removeToken } from '../services/authService';

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (userData: UserInfo, token: string) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<UserInfo>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    // Check for updated user data in localStorage
    const updatedUserData = localStorage.getItem('updatedUserData');
    if (currentUser && updatedUserData) {
      try {
        const parsed = JSON.parse(updatedUserData);
        setUser({ ...currentUser, ...parsed });
      } catch (error) {
        console.error('Error parsing updated user data:', error);
        setUser(currentUser);
      }
    } else {
      setUser(currentUser);
    }
    
    setLoading(false);
  }, []);

  const login = (userData: UserInfo, token: string) => {
    setUser(userData);
    setLoading(false);
  };

  const updateUser = (updatedData: Partial<UserInfo>) => {
    setUser(prevUser => {
      if (prevUser) {
        const newUserData = { ...prevUser, ...updatedData };
        
        // Store updated data in localStorage
        const updatedFields = { ...updatedData };
        localStorage.setItem('updatedUserData', JSON.stringify(updatedFields));
        
        return newUserData;
      }
      return null;
    });
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('updatedUserData'); // Clear updated user data
    setUser(null);
    window.location.href = '/login';
    setLoading(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}