import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Button from '../../../components/ui/Button';
import { itemVariants } from '../../../animations/variants';
import { ROUTES } from '../../../constants/routes';

const CTASection = ({ hasRegistered }) => {
  return (
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
            <Button variant="success" to={ROUTES.REGISTER}>
              Register Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          <Button variant="secondary" to={ROUTES.HOME}>
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
