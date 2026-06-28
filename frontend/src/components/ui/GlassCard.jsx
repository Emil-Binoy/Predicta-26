import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', ...props }) => {
  const isAnimated = 'initial' in props || 'animate' in props || 'whileInView' in props || 'whileHover' in props || 'variants' in props;
  const Component = isAnimated ? motion.div : 'div';
  return (
    <Component className={`glass-card ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default GlassCard;
