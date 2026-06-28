import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  to, 
  className = '', 
  onClick, 
  type = 'button', 
  disabled = false,
  isLoading = false,
  ...props 
}) => {
  let baseClasses = "transition-all duration-300 flex items-center justify-center gap-2 font-bold ";
  
  if (variant === 'primary') {
    // Used in Home for Register
    baseClasses += "w-full sm:w-auto px-10 py-4 bg-gradient-button-primary text-[#090909] text-lg rounded-full glow-hover";
  } else if (variant === 'secondary') {
    // Used in Home for Learn More
    baseClasses += "w-full sm:w-auto px-10 py-4 border-2 border-[#0057D9] text-white text-lg rounded-full hover:bg-[rgba(0,87,217,0.15)] hover:border-[#E31E24]";
  } else if (variant === 'gold') {
    // Used in Registration, Admin login
    baseClasses += "w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]";
  } else if (variant === 'gold-rounded') {
    // Used in Prediction
    baseClasses += "px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black text-lg rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]";
  } else if (variant === 'danger-outline') {
    baseClasses += "px-6 py-2 bg-[rgba(227,30,36,0.1)] border border-[#E31E24] text-[#E31E24] font-medium rounded-lg hover:bg-[#E31E24] hover:text-white";
  } else if (variant === 'success') {
    // Used in Learn More CTA
    baseClasses += "w-full sm:w-auto px-10 py-4 bg-[#00C853] hover:bg-[#00E676] text-black text-lg rounded-full shadow-[0_0_20px_rgba(0,200,83,0.4)] hover:shadow-[0_0_30px_rgba(0,200,83,0.6)] hover:-translate-y-1 group";
  }

  const combinedClasses = `${baseClasses} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = isLoading ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 currentColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {children}
    </>
  ) : children;

  if (to) {
    return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  }

  if (href) {
    return <a href={href} className={combinedClasses} {...props}>{content}</a>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || isLoading} className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;
