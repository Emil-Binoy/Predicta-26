import apiClient from './apiClient';

export const loginAdmin = async (credentials) => {
  const response = await apiClient.post('/api/auth/admin/login', credentials);
  return response.data;
};

export const getParticipants = async (token) => {
  const response = await apiClient.get('/api/admin/participants', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteParticipant = async (id, token) => {
  const response = await apiClient.delete(`/api/admin/participants/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
