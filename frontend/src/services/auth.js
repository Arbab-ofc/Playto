import api from './api';

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};

export const login = async ({ username, password }) => {
  const { data } = await api.post('/auth/login/', { username, password });
  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);
  setCookie('access', data.access);
  return data;
};

export const register = async ({ username, email, password }) => {
  const { data } = await api.post('/auth/register/', { username, email, password });
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout/');
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  clearCookie('access');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me/');
  return data;
};

export const getAccessToken = () => localStorage.getItem('access');
