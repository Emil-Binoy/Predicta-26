import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../../components/ui/GlassCard';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTES } from '../../constants/routes';

const Registration = () => {
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
        className="p-8 w-full max-w-2xl relative z-10 text-center"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Registration Closed</h2>
          
          <div className="space-y-4 text-gray-300 text-lg mb-8 max-w-md mx-auto">
            <p>
              Registration for Predicta '26 has officially closed.
            </p>
            <p>
              Thank you to everyone who registered and participated.
            </p>
            <p className="text-gray-400 text-base italic pt-2">
              The prediction phase will continue for registered participants.
            </p>
          </div>

          <Link 
            to="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Return to Home
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Registration;
