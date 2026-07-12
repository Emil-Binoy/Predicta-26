import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { loginAdmin, getParticipants, deleteParticipant, exportParticipantsData } from '../services/adminService';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const useAdmin = () => {
  const [token, setToken] = useState(() => getStorageItem(STORAGE_KEYS.ADMIN_TOKEN) || '');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExport = async () => {
    if (!token) return;
    setIsExporting(true);
    const toastId = toast.loading('Exporting participants...');
    try {
      const response = await exportParticipantsData(token);
      
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'Participants.xlsx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename=(.+)/);
        if (filenameMatch && filenameMatch.length === 2) {
            filename = filenameMatch[1];
        }
      }
      
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Participants exported successfully.', { id: toastId });
    } catch (error) {
      toast.error('Failed to export participant data.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    token,
    isLoggingIn,
    participants,
    isLoading,
    isExporting,
    handleLogin,
    handleLogout,
    fetchParticipants,
    handleDelete,
    handleExport
  };
};
