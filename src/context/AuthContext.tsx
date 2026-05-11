import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI } from '@/services/api';
import { STORAGE_KEYS } from '@/utils/constants';
import toast from 'react-hot-toast';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    location: string;
    role: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = sessionStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        try {
          const user = await authAPI.getCurrentUser();
          if (user) {
            setState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
            sessionStorage.removeItem(STORAGE_KEYS.USER);
            setState({ ...state, isLoading: false });
          }
        } catch {
          sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
          sessionStorage.removeItem(STORAGE_KEYS.USER);
          setState({ ...state, isLoading: false });
        }
      } else {
        setState({ ...state, isLoading: false });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true });
      const { user, token } = await authAPI.login(email, password);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success(`Welcome back, ${user.fullName}!`);
    } catch (error) {
      setState({ ...state, isLoading: false });
      throw error;
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    location: string;
    role: string;
  }) => {
    try {
      setState({ ...state, isLoading: true });
      const { user, token } = await authAPI.register(data);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success('Registration successful! Welcome to Agriculture Smart Assistant.');
    } catch (error) {
      setState({ ...state, isLoading: false });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true });
      const { user, token } = await authAPI.adminLogin(email, password);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success(`Welcome Admin, ${user.fullName}!`);
    } catch (error) {
      setState({ ...state, isLoading: false });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, adminLogin }}>
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
