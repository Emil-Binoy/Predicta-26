import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-5 bg-[#050a17]/90 backdrop-blur-lg pt-16 pb-8 border-t border-[#1c2541] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">

          {/* Brand & Description */}
          <div className="text-center md:text-left flex-1">
            <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-4 tracking-tight drop-shadow-sm">
              Predicta 26
            </h3>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0 leading-relaxed">
              Experience the thrill of the World Cup prediction competition.
              Made for football fans in the college.
            </p>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1c2541] to-transparent mb-8 opacity-70" />

        {/* Copyright and Creator */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-sm text-gray-500">
          <p className="order-2 lg:order-1 text-center lg:text-left">© 2026 Predicta 26. All rights reserved.</p>

          <div className="flex flex-col md:flex-row items-center gap-6 order-1 lg:order-2">
            <p className="flex items-center gap-2 text-base">
              <span>Created by</span>
              <a
                href="https://emil-binoy.github.io/Portfolio-using-React/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center font-bold text-gray-200 transition-colors duration-300 hover:text-white group"
              >
                Emil Binoy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            </p>

            {/* Contact / Socials */}
            <div className="flex items-center gap-4 md:border-l border-[#1c2541] md:pl-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:block">Connect</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Emil-Binoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0a1020] border border-[#1c2541] flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] group"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/emil-binoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0a1020] border border-[#1c2541] flex items-center justify-center text-gray-400 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(10,102,194,0.15)] group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a
                  href="https://www.instagram.com/emil_binoy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0a1020] border border-[#1c2541] flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(225,48,108,0.15)] group"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
