import api from './api';

export const login = async ({ username, password }) => {
  const { data } = await api.post('/auth/login/', { username, password });
  return data;
};

export const register = async ({ username, email, password }) => {
  const { data } = await api.post('/auth/register/', { username, email, password });
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout/');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me/');
  return data;
};
