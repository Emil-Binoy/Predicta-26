import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerUser } from '../services/authService';
import { ROUTES } from '../constants/routes';
import { setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const useRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success('Registration successful!');
        setStorageItem(STORAGE_KEYS.PREDICTION_ID, res.data.predictionId);
        navigate(ROUTES.PREDICT, { state: { predictionId: res.data.predictionId } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleRegistration };
};
