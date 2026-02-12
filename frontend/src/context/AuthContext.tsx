import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

interface Village {
  id: number;
  name: string;
  district: string | null;
  state: string | null;
  created_at: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role?: string;
  village_id: number | null;
  is_active: boolean;
  created_at: string;
  village?: Village;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: string, village_id?: number | null) => Promise<void>;
  register: (name: string, email: string, password: string, role: string, village_id?: number | null) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: string, village_id?: number | null) => {
    try {
      const payload: any = { email, password, role };
      if (role === 'villager' && village_id) {
        payload.village_id = village_id;
      }
      const response = await api.post('/auth/login', payload);
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, role: string, village_id?: number | null) => {
    try {
      const payload: any = { name, email, password, role };
      if (role === 'villager') payload.village_id = village_id;
      const response = await api.post('/auth/register', payload);
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      const message = Array.isArray(detail)
        ? detail.map((e: { msg?: string }) => e.msg).filter(Boolean).join(', ') || 'Registration failed'
        : typeof detail === 'string'
          ? detail
          : 'Registration failed. Check backend is running and try again.';
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
