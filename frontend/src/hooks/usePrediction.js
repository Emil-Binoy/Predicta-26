import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { submitPrediction } from '../services/predictionService';
import { ROUTES } from '../constants/routes';
import { setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const usePrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handlePrediction = async (predictionId, winningTeam, predictedGoals, onSuccessCallback) => {
    if (!predictionId) {
      toast.error('Prediction ID is missing. Please register first.');
      return;
    }
    if (!winningTeam) {
      toast.error('Please enter the winning team');
      return;
    }
    if (!predictedGoals) {
      toast.error('Please enter the predicted goals');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitPrediction({
        predictionId,
        winningTeam,
        winningMargin: predictedGoals
      });

      if (res.success) {
        setShowConfetti(true);
        toast.success('Prediction submitted successfully!');
        
        setStorageItem(STORAGE_KEYS.WINNING_TEAM, winningTeam);
        setStorageItem(STORAGE_KEYS.PREDICTED_GOALS, predictedGoals);
        setStorageItem(STORAGE_KEYS.IS_PREDICTED, 'true');

        if (onSuccessCallback) {
          onSuccessCallback();
        }

        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 5000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Prediction failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, showConfetti, handlePrediction };
};
