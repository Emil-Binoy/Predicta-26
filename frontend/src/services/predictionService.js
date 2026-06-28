import apiClient from './apiClient';

export const submitPrediction = async (predictionData) => {
  const response = await apiClient.post('/api/auth/predict', predictionData);
  return response.data;
};
