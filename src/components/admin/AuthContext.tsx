import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/server-api';

interface User {
  id: string | number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const me = await api.auth.me();
        const currentUser: User = {
          id: me.id,
          email: me.email,
          name: me.name || me.full_name || 'Admin',
          role: me.role || 'admin',
        };
        setUser(currentUser);
        localStorage.setItem('athar_admin_user', JSON.stringify(currentUser));
      } catch {
        setUser(null);
        localStorage.removeItem('athar_admin_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await api.auth.login(email, password);
      const me = await api.auth.me();
      const currentUser: User = {
        id: me.id,
        email: me.email,
        name: me.name || me.full_name || 'Admin',
        role: me.role || 'admin',
      };
      setUser(currentUser);
      localStorage.setItem('athar_admin_user', JSON.stringify(currentUser));
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // ignore logout network failure and clear local session anyway
    }
    setUser(null);
    localStorage.removeItem('athar_admin_user');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
