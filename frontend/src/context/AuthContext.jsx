import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getAccessToken, getMe, login as loginRequest, logout as logoutRequest, register as registerRequest, updateMe } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const qc = useQueryClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrate = async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const me = await getMe();
      setUser(me);
      qc.removeQueries({ queryKey: ['posts', 'anon'], exact: false });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    const handleLogout = () => setUser(null);
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  const login = async (credentials) => {
    await loginRequest(credentials);
    const me = await getMe();
    setUser(me);
    qc.removeQueries({ queryKey: ['posts', 'anon'], exact: false });
    qc.removeQueries({ queryKey: ['posts', 'user'], exact: false });
    qc.invalidateQueries({ queryKey: ['posts'], exact: false });
    return me;
  };

  const register = async (payload) => {
    await registerRequest(payload);
    return login({ username: payload.username, password: payload.password });
  };

  const updateProfile = async (payload) => {
    const updated = await updateMe(payload);
    setUser(updated);
    return updated;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      qc.removeQueries({ queryKey: ['posts'], exact: false });
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user) && Boolean(getAccessToken()),
      login,
      register,
      updateProfile,
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
