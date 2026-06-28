import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/ui/GlassCard';
import RegistrationForm from './components/RegistrationForm';
import { useRegistration } from '../../hooks/useRegistration';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTES } from '../../constants/routes';

const Registration = () => {
  const { isSubmitting, handleRegistration } = useRegistration();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPredictionId = getStorageItem(STORAGE_KEYS.PREDICTION_ID);
    if (storedPredictionId) {
      navigate(ROUTES.PREDICT);
    }
  }, [navigate]);

  return (
    <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#50c878] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Join the Championship</h2>
          <p className="text-gray-300">Enter your details to register</p>
        </div>

        <RegistrationForm isSubmitting={isSubmitting} onSubmit={handleRegistration} />
      </GlassCard>
    </div>
  );
};

export default Registration;
