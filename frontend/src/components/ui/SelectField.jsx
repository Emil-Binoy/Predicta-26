import React, { forwardRef } from 'react';

const SelectField = forwardRef(({ label, error, options = [], placeholder = 'Select an option', className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <select
        ref={ref}
        className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;
