import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../../animations/variants';

const rules = [
  "Only Kristu Jyoti College students may participate.",
  "Each participant may register only once.",
  "Predictions cannot be changed after submission.",
  "Predictions must be submitted before kickoff.",
  "Duplicate registrations are automatically rejected.",
  "Decisions made by the organizers are final."
];

const RulesSection = () => {
  return (
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
  );
};

export default RulesSection;
