import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../../animations/variants';

const ShieldIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#0057D9] rounded-full blur-[20px] opacity-40 animate-pulse" />
    <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="50%" stopColor="#0057D9" />
          <stop offset="100%" stopColor="#002255" />
        </linearGradient>
        <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M50 5 L10 20 L10 50 C10 75 30 90 50 95 C70 90 90 75 90 50 L90 20 Z" fill="url(#shieldGrad)" stroke="url(#shieldBorder)" strokeWidth="3" />
      <path d="M50 5 L50 95 C70 90 90 75 90 50 L90 20 Z" fill="#000000" opacity="0.15" />
      <circle cx="50" cy="45" r="15" fill="#FFFFFF" opacity="0.9" />
      <path d="M30 80 C30 65 70 65 70 80" fill="#FFFFFF" opacity="0.9" />
    </svg>
  </div>
);

const FootballIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#00C853] rounded-full blur-[20px] opacity-40 animate-pulse" />
    <div className="absolute bottom-0 w-12 h-2 bg-[#00C853] rounded-full blur-[4px] opacity-60" />
    <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
      <defs>
        <radialGradient id="ballGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#CCCCCC" />
          <stop offset="100%" stopColor="#666666" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#ballGrad)" />
      <path d="M50 30 L65 45 L60 65 L40 65 L35 45 Z" fill="#111" />
      <path d="M50 30 L50 10 M65 45 L85 40 M60 65 L75 80 M40 65 L25 80 M35 45 L15 40" stroke="#111" strokeWidth="3" />
      <ellipse cx="40" cy="25" rx="15" ry="8" fill="#FFF" opacity="0.5" transform="rotate(-30 40 25)" />
    </svg>
  </div>
);

const PadlockIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#E31E24] rounded-full blur-[20px] opacity-40 animate-pulse" />
    <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
      <defs>
        <linearGradient id="lockBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="50%" stopColor="#E31E24" />
          <stop offset="100%" stopColor="#880000" />
        </linearGradient>
        <linearGradient id="shackle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#999" />
          <stop offset="50%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#666" />
        </linearGradient>
      </defs>
      <path d="M35 45 V30 C35 20 65 20 65 30 V45" fill="none" stroke="url(#shackle)" strokeWidth="12" strokeLinecap="round" />
      <rect x="25" y="45" width="50" height="40" rx="8" fill="url(#lockBody)" />
      <rect x="25" y="45" width="25" height="40" rx="8" fill="#000" opacity="0.15" />
      <circle cx="50" cy="60" r="6" fill="#111" />
      <rect x="48" y="60" width="4" height="12" fill="#111" />
    </svg>
  </div>
);

const TrophyIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#FFD54F] rounded-full blur-[20px] opacity-40 animate-pulse" />
    <div className="absolute inset-0 pointer-events-none">
      <motion.div animate={{ y: [-5, 5, -5], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-2 left-2 w-1 h-1 bg-[#FFF] rounded-full" />
      <motion.div animate={{ y: [5, -5, 5], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-4 right-2 w-1.5 h-1.5 bg-[#FFD54F] rounded-full" />
      <motion.div animate={{ y: [-8, 8, -8], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-8 right-0 w-1 h-1 bg-[#FFF] rounded-full" />
    </div>
    <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="30%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FF8F00" />
        </linearGradient>
      </defs>
      <path d="M25 20 C25 40 40 50 45 55 V75 H35 V85 H65 V75 H55 V55 C60 50 75 40 75 20 Z" fill="url(#trophyGrad)" />
      <path d="M25 25 C10 25 10 45 25 45" fill="none" stroke="url(#trophyGrad)" strokeWidth="6" />
      <path d="M75 25 C90 25 90 45 75 45" fill="none" stroke="url(#trophyGrad)" strokeWidth="6" />
      <path d="M25 20 L50 25 L75 20" fill="none" stroke="#FFF" opacity="0.5" strokeWidth="2" />
    </svg>
  </div>
);

const journeySteps = [
  { 
    id: "01",
    title: "Complete Registration", 
    desc: "Complete registration with all the details.", 
    icon: <ShieldIcon />, 
    color: "#0057D9", 
    shadow: "rgba(0,87,217,0.4)",
    bg: "rgba(0,87,217,0.05)"
  },
  { 
    id: "02",
    title: "Make Prediction", 
    desc: "Choose the World Cup Champion and predict the winning goal margin.", 
    icon: <FootballIcon />, 
    color: "#00C853", 
    shadow: "rgba(0,200,83,0.4)",
    bg: "rgba(0,200,83,0.05)"
  },
  { 
    id: "03",
    title: "Wait For The Final", 
    desc: "Predictions are locked once submitted. No edits are allowed after confirmation.", 
    icon: <PadlockIcon />, 
    color: "#E31E24", 
    shadow: "rgba(227,30,36,0.4)",
    bg: "rgba(227,30,36,0.05)"
  },
  { 
    id: "04",
    title: "Celebrate", 
    desc: "When the match ends, compare your prediction with the final result.", 
    icon: <TrophyIcon />, 
    color: "#FFD54F", 
    shadow: "rgba(255,213,79,0.4)",
    bg: "rgba(255,213,79,0.05)"
  }
];

const TimelineSection = () => {
  return (
    <motion.section variants={itemVariants} className="space-y-24 relative py-12">
      {/* Header */}
      <div className="text-center relative z-10">
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bebas font-bold text-white tracking-wide mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          How it works
        </motion.h2>

        <motion.p 
          className="text-xl md:text-2xl text-gray-400 font-light italic"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          4 Simple Steps. One Final. One Champion.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Horizontal Line for Desktop */}
        <div className="hidden lg:block absolute top-[50%] left-[10%] right-[10%] h-0.5 bg-gray-800 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {journeySteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Animation (Desktop) */}
              {index < 3 && (
                <motion.div 
                  className="hidden lg:block absolute top-[50%] left-[60%] right-[-40%] h-0.5 z-0"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2, ease: "easeInOut" }}
                  style={{ originX: 0, background: `linear-gradient(90deg, ${step.color}, ${journeySteps[index+1].color})` }}
                >
                  {/* Energy Flow Animation */}
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-white rounded-full blur-[2px]"
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>
              )}

              {/* Connector Animation (Mobile Vertical) */}
              {index < 3 && (
                <motion.div 
                  className="block lg:hidden absolute left-1/2 bottom-[-2rem] w-0.5 h-8 z-0 -translate-x-1/2"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2, ease: "easeInOut" }}
                  style={{ originY: 0, background: `linear-gradient(180deg, ${step.color}, ${journeySteps[index+1].color})` }}
                />
              )}

              {/* Card */}
              <motion.div 
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="relative bg-[#0d0d0d]/80 backdrop-blur-xl rounded-[22px] p-8 border border-white/5 flex flex-col items-center justify-start text-center h-full overflow-hidden transition-all duration-500 z-10 shadow-lg"
              >
                {/* Hover Animated Gradient Border */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[22px]"
                  style={{ 
                    boxShadow: `inset 0 0 0 1px ${step.color}`,
                    background: `radial-gradient(circle at center, ${step.bg} 0%, transparent 70%)`
                  }}
                />
                
                {/* Shadow Enhancement on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[22px] pointer-events-none"
                     style={{ boxShadow: `0 20px 40px -10px ${step.shadow}` }} 
                />

                {/* Huge Background Number */}
                <motion.div 
                  className="absolute top-4 right-4 text-8xl font-bebas font-bold text-white opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-500 pointer-events-none"
                >
                  {step.id}
                </motion.div>

                {/* Top Floating Badge */}
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-b-lg text-[10px] font-bold uppercase tracking-widest text-white border-x border-b border-white/20"
                  style={{ backgroundColor: step.color }}
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  Step {step.id}
                </motion.div>

                {/* Icon */}
                <motion.div 
                  className="mb-8 mt-12 relative"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 space-y-4 px-2">
                  <h3 className="text-xl font-bold font-sans text-white tracking-wide">{step.title}</h3>
                  <p className="text-gray-400 text-sm font-medium font-sans leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;
