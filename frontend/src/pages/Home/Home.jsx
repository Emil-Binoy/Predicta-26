import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTES } from '../../constants/routes';

const Home = () => {
  const hasRegistered = !!getStorageItem(STORAGE_KEYS.PREDICTION_ID);
  const isPredicted = getStorageItem(STORAGE_KEYS.IS_PREDICTED) === 'true';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-gradient-hero rounded-full blur-[120px] opacity-70 z-0 pointer-events-none" />

        <motion.div
          className="mb-5 relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Floating Football */}
          <motion.div
            className="relative w-64 h-auto md:w-80  lg:w-96  mb-6"
            animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <img
              src="/football.png"
              alt="TRIONDA Football"
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* Typography */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas font-bold mb-4 tracking-wider leading-none uppercase">
            Predict the Final.<br />
            <span className="text-gradient-primary">Become the Champion.</span>
          </h1>

          <p className="text-lg md:text-2xl text-[#B5B5B5] mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Join the ultimate World Cup Final prediction challenge. Verify your identity, submit your prediction, and compete with fellow students for glory.
          </p>

          {/* Buttons */}
          <div className="flex flex-col  gap-6 justify-center w-full sm:w-auto">
            {!hasRegistered ? (
              <Button variant="danger-outline" disabled>
                Registration Closed
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </Button>
            ) : (
              <Button variant="danger" to={ROUTES.PREDICT}>
                {isPredicted ? 'View Prediction 🔒' : 'Predict Now'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            )}
            <div className='flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto'>
              <Button variant="insights-special" to={ROUTES.INSIGHTS} className="text-center flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Live Insights
              </Button>
              <Button variant="secondary" to={ROUTES.LEARN_MORE} className="text-center">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
