import React from 'react';
import { motion } from 'framer-motion';

const PredictionLocked = ({ winningTeam, predictedGoals }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-[rgba(80,200,120,0.1)] border-2 border-[#50c878] rounded-xl text-center shadow-[0_0_15px_rgba(80,200,120,0.2)]"
    >
      <h3 className="text-2xl font-bold text-white mb-2">Prediction Locked! 🔒</h3>
      <p className="text-lg text-[#50c878]">
        You predicted <span className="font-bold text-white">{winningTeam}</span> with <span className="font-bold text-white">{predictedGoals} goals</span>.
      </p>
      <p className="text-sm text-gray-400 mt-4">Good luck! You cannot change this prediction.</p>
    </motion.div>
  );
};

export default PredictionLocked;
