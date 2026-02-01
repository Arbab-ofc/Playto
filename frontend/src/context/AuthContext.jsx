import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAccessToken, getMe, login as loginRequest, logout as logoutRequest, register as registerRequest, updateMe } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  const login = async (credentials) => {
    await loginRequest(credentials);
    const me = await getMe();
    setUser(me);
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
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
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
