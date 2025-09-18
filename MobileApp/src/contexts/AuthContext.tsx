import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import type { AuthState } from '../types';

type AuthContextType = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ token: null, user: null });

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setState({ token, user: res.data });
        } catch (e) {
          await AsyncStorage.removeItem('token');
          setState({ token: null, user: null });
        }
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    await AsyncStorage.setItem('token', token);
    setState({ token, user });
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    await AsyncStorage.setItem('token', token);
    setState({ token, user });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setState({ token: null, user: null });
  };

  const refreshUser = async () => {
    if (!state.token) return;
    const res = await api.get('/auth/me');
    setState((s) => ({ ...s, user: res.data }));
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};