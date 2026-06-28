import React, { forwardRef } from 'react';

const InputField = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <input
        ref={ref}
        className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
