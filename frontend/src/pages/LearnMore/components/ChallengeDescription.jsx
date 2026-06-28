import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../../animations/variants';

const ChallengeDescription = () => {
  return (
    <motion.section variants={itemVariants}>
      <div className="bg-gradient-to-r from-[#0057D9]/20 to-[#E31E24]/20 rounded-3xl p-[1px]">
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center md:text-left">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            <p>Getting started is simple.</p>
            <p>Verify your identity, submit your prediction before the match begins, and wait for the final whistle to see if your prediction comes true.</p>
            <p>Every participant gets one chance to make their prediction, making every choice count.</p>
            <p>Whether you're a passionate football fan or simply enjoy the thrill of making predictions, the Predicta '26 Challenge is a fun way to join fellow students in celebrating the biggest match in world football.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ChallengeDescription;
