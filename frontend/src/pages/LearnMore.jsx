import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaFutbol, FaLock, FaTrophy, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
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

const LearnMore = () => {
  const hasRegistered = !!localStorage.getItem('predictionId');

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

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const titleText = "Prediction Challenge";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rules = [
    "Only Kristu Jyoti College students may participate.",
    "Each participant may register only once.",
    "Predictions cannot be changed after submission.",
    "Predictions must be submitted before kickoff.",
    "Duplicate registrations are automatically rejected.",
    "Decisions made by the organizers are final."
  ];

  return (
    <div className="relative min-h-screen bg-[#090909] overflow-hidden  pb-24 text-white">
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
        
        {/* Hero Section */}
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

        {/* Introduction Card */}
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

        {/* How It Works Timeline */}
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

        {/* Challenge Description */}
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

        {/* Rules Section */}
        <motion.section variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bebas font-bold text-white tracking-wide">Rules & Regulations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E31E24] to-yellow-500 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-start space-x-4 group"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-gray-400 group-hover:bg-[#E31E24]/20 group-hover:text-[#E31E24] group-hover:border-[#E31E24]/30 transition-all duration-300">
                  {index + 1}
                </div>
                <p className="text-gray-300 font-light text-sm leading-relaxed mt-1">{rule}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call To Action */}
        <motion.section variants={itemVariants} className="relative rounded-3xl overflow-hidden py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00C853]/20 via-black/80 to-[#0057D9]/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-bebas font-bold text-white tracking-wide uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Ready to Make Your Prediction?
            </h2>
            <div className="flex flex-col space-y-2 text-2xl md:text-3xl text-gray-300 font-light italic">
              <span>One Final.</span>
              <span>One Prediction.</span>
              <span className="text-white font-medium">One Champion.</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              {!hasRegistered && (
                <Link 
                  to="/register"
                  className="w-full sm:w-auto px-10 py-4 bg-[#00C853] hover:bg-[#00E676] text-black font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,200,83,0.4)] hover:shadow-[0_0_30px_rgba(0,200,83,0.6)] hover:-translate-y-1 group"
                >
                  Register Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link 
                to="/"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-[#0057D9] hover:bg-[#0057D9]/20 text-white font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default LearnMore;
