import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-gradient-hero rounded-full blur-[120px] opacity-70 z-0 pointer-events-none" />

      <motion.div 
        className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto"
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
          Predict the Final.<br/>
          <span className="text-gradient-primary">Become the Champion.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-[#B5B5B5] mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Join the ultimate World Cup Final prediction challenge. Verify your identity, submit your prediction, and compete with fellow students for glory.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
          <a 
            href="/register" 
            className="w-full sm:w-auto px-10 py-4 bg-gradient-button-primary text-[#090909] font-bold text-lg rounded-full glow-hover transition-all duration-300 flex items-center justify-center gap-2"
          >
            Register Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="#how-it-works" 
            className="w-full sm:w-auto px-10 py-4 border-2 border-[#0057D9] text-white font-bold text-lg rounded-full hover:bg-[rgba(0,87,217,0.15)] hover:border-[#E31E24] transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
