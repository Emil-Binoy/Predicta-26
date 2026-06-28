import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const PredictionForm = ({
  winningTeam,
  setWinningTeam,
  predictedGoals,
  setPredictedGoals,
  isSubmitting,
  onSubmit
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Winning Team</label>
        <input
          type="text"
          value={winningTeam}
          onChange={(e) => setWinningTeam(e.target.value)}
          className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
          placeholder="Type the winning team name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Predict the Goals</label>
        <input
          type="number"
          min="0"
          value={predictedGoals}
          onChange={(e) => setPredictedGoals(e.target.value)}
          className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
          placeholder="e.g. 2"
        />
      </div>

      {winningTeam && predictedGoals && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[rgba(80,200,120,0.1)] border border-[#50c878] rounded-lg text-center"
        >
          <p className="text-[#50c878] font-medium">
            You predict <span className="font-bold text-white">{winningTeam}</span> with <span className="font-bold text-white">{predictedGoals} goals</span>.
          </p>
        </motion.div>
      )}

      <div className="pt-4 flex justify-center">
        <Button
          type="submit"
          variant="gold-rounded"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Lock Prediction ⚽'}
        </Button>
      </div>
    </>
  );
};

export default PredictionForm;
