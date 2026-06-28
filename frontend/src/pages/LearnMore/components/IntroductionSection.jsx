import React from 'react';
import { motion } from 'framer-motion';
import { FaFutbol } from 'react-icons/fa';
import { itemVariants } from '../../../animations/variants';

const IntroductionSection = () => {
  return (
    <motion.section variants={itemVariants}>
      <div className="relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/10 to-white/0 hover:from-[#00C853]/50 hover:to-[#0057D9]/30 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-3xl" />
        <div className="relative p-10 md:p-14 z-10">
          <div className="absolute top-6 right-6 text-white/10 group-hover:text-[#00C853]/40 transition-colors duration-500">
            <FaFutbol size={80} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bebas font-bold mb-6 text-white tracking-wide">
            Welcome to the Predicta '26<br />Prediction Challenge
          </h2>
          <div className="space-y-4 text-gray-300 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            <p>Welcome to the Predicta '26 Prediction Challenge—your chance to be part of the excitement surrounding the FIFA World Cup Final.</p>
            <p>If you think you can predict the final result, this is your opportunity to put your instincts to the test.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroductionSection;
