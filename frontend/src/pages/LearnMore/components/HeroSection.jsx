import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const HeroSection = ({ mouseX, mouseY, handleMouseMove, handleMouseLeave }) => {
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const titleText = "Prediction Challenge";

  return (
    <motion.section 
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh] pt-16 relative"
      initial="hidden"
      animate="visible"
    >
      {/* Mobile Trophy (Top) / Desktop Trophy (Right) */}
      <div className="order-1 lg:order-2 relative w-full h-[400px] md:h-[500px] lg:h-[700px] flex items-center justify-center perspective-[1000px]">
        {/* Spotlight Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,210,60,0.15)_0%,rgba(227,30,36,0.08)_30%,rgba(0,87,217,0.08)_60%,rgba(0,200,83,0.08)_80%,transparent_100%)] blur-[60px] opacity-80 pointer-events-none" />

        {/* Glows */}
        <motion.div 
          className="absolute w-64 h-64 bg-[rgba(255,210,60,0.22)] rounded-full blur-[90px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-[rgba(0,200,83,0.12)] rounded-full blur-[100px] -ml-20 -mt-10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-[rgba(0,87,217,0.08)] rounded-full blur-[110px] ml-20 mt-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Shadow */}
        <motion.div
          className="absolute bottom-4 lg:bottom-12 w-48 h-10 bg-black/40 blur-[30px] rounded-[100%]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Trophy Container */}
        <motion.div
          className="relative z-10 w-full h-full preserve-3d"
          initial={{ opacity: 0, scale: 0.85, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Floating Animation */}
          <motion.div
            className="w-full h-full flex items-center justify-center preserve-3d"
            animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Mouse Interaction & Shine */}
            <motion.div
              className="relative w-auto h-[80%] md:h-[90%] flex items-center justify-center cursor-pointer"
              style={{ rotateX, rotateY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img src="/trophy.png" alt="World Cup Trophy" className="w-auto h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" />
              
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text Content (Bottom on Mobile, Left on Desktop) */}
      <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20">
        <div className="overflow-hidden mb-6 flex justify-center lg:justify-start flex-wrap">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold tracking-wider leading-none uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#E31E24] via-[#0057D9] to-[#00C853] pb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {titleText}
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-xl md:text-3xl text-gray-300 font-light italic mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          One Final. One Prediction. One Champion.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
