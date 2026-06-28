import { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { containerVariants } from '../../animations/variants';
import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import TimelineSection from './components/TimelineSection';
import ChallengeDescription from './components/ChallengeDescription';
import RulesSection from './components/RulesSection';
import CTASection from './components/CTASection';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';

const LearnMore = () => {
  const hasRegistered = !!getStorageItem(STORAGE_KEYS.PREDICTION_ID);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative min-h-screen bg-[#090909] overflow-hidden pb-24 text-white">
      {/* Background Textures & Glows */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#E31E24] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] bg-[#0057D9] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[30vw] h-[30vw] bg-[#00C853] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection 
          mouseX={mouseX} 
          mouseY={mouseY} 
          handleMouseMove={handleMouseMove} 
          handleMouseLeave={handleMouseLeave} 
        />
        
        <IntroductionSection />
        
        <TimelineSection />
        
        <ChallengeDescription />
        
        <RulesSection />
        
        <CTASection hasRegistered={hasRegistered} />
      </motion.div>
    </div>
  );
};

export default LearnMore;
