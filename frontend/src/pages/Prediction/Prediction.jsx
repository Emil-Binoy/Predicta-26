import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import GlassCard from '../../components/ui/GlassCard';
import PredictionForm from './components/PredictionForm';
import PredictionLocked from './components/PredictionLocked';
import { usePrediction } from '../../hooks/usePrediction';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTES } from '../../constants/routes';
import { toast } from 'react-hot-toast';

const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [predictionId] = useState(() => getStorageItem(STORAGE_KEYS.PREDICTION_ID) || location.state?.predictionId || '');
  const [winningTeam, setWinningTeam] = useState(() => getStorageItem(STORAGE_KEYS.WINNING_TEAM) || '');
  const [predictedGoals, setPredictedGoals] = useState(() => getStorageItem(STORAGE_KEYS.PREDICTED_GOALS) || '');
  const [isPredicted, setIsPredicted] = useState(() => getStorageItem(STORAGE_KEYS.IS_PREDICTED) === 'true');
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const { isSubmitting, showConfetti, handlePrediction } = usePrediction();

  useEffect(() => {
    if (!predictionId) {
      toast.error('Please register first to make a prediction.');
      navigate(ROUTES.REGISTER);
      return;
    }

    const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [predictionId, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    handlePrediction(predictionId, winningTeam, predictedGoals, () => setIsPredicted(true));
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} />}

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

      <GlassCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 w-full max-w-3xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Make Your Prediction</h2>
          <p className="text-gray-300">Who will lift the trophy?</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {!isPredicted ? (
            <PredictionForm
              winningTeam={winningTeam}
              setWinningTeam={setWinningTeam}
              predictedGoals={predictedGoals}
              setPredictedGoals={setPredictedGoals}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          ) : (
            <PredictionLocked winningTeam={winningTeam} predictedGoals={predictedGoals} />
          )}
        </form>
      </GlassCard>
    </div>
  );
};

export default Prediction;
