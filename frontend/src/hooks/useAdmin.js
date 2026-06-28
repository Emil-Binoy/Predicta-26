import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { loginAdmin, getParticipants, deleteParticipant } from '../services/adminService';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const useAdmin = () => {
  const [token, setToken] = useState(() => getStorageItem(STORAGE_KEYS.ADMIN_TOKEN) || '');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setIsLoggingIn(true);
    try {
      const res = await loginAdmin({ username, password });
      if (res.success) {
        toast.success('Login successful!');
        setStorageItem(STORAGE_KEYS.ADMIN_TOKEN, res.token);
        setToken(res.token);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = useCallback(() => {
    removeStorageItem(STORAGE_KEYS.ADMIN_TOKEN);
    setToken('');
    setParticipants([]);
  }, []);

  const fetchParticipants = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await getParticipants(token);
      if (res.success) {
        setParticipants(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch participants. Session might be expired.');
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  }, [token, handleLogout]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this participant?')) return;
    try {
      const res = await deleteParticipant(id, token);
      if (res.success) {
        toast.success('Participant deleted successfully');
        setParticipants((prev) => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete participant');
    }
  };

  return {
    token,
    isLoggingIn,
    participants,
    isLoading,
    handleLogin,
    handleLogout,
    fetchParticipants,
    handleDelete
  };
};
