import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getStorageItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTES } from '../../constants/routes';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasRegistered = getStorageItem(STORAGE_KEYS.PREDICTION_ID) || location.state?.predictionId || location.pathname === ROUTES.PREDICT;

  const links = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Learn More', path: ROUTES.LEARN_MORE },
    ...(hasRegistered ? [{ name: 'Predict', path: ROUTES.PREDICT }] : [])
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/30 backdrop-blur-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to={ROUTES.HOME} className="text-3xl font-bebas font-bold text-gradient-primary tracking-wider">
              Predicta 26
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group px-1 py-2 text-sm font-medium transition-colors text-white"
                  >
                    <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors duration-200'}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E31E24] via-[#0057D9] to-[#00C853]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-left" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/30 backdrop-blur-sm absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 mt-2 bg-black ">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive ? 'bg-gray-900  text-white border-l-4 border-[#00C853]' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] border-l-4 border-transparent'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
