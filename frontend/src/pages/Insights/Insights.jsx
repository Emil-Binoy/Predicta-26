import React, { useEffect } from 'react';
import PredictionInsights from '../../components/home/PredictionInsights';

const Insights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Glow matching home */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-gradient-hero rounded-full blur-[120px] opacity-30 z-0 pointer-events-none" />
      
      <PredictionInsights />
    </div>
  );
};

export default Insights;
