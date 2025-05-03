
import React from 'react';

const FormField = ({ number, label, placeholder, type = 'text' }) => {
  return (
    <div className="flex  space-x-4">
      <span className="text-[#f5f5f5] flex items-center text-[18px] border h-[24px] noto-sans px-2 mt-1 rounded-[18px]">
        {number}
      </span>
      <div className="flex-1">
        <label className="block text-[16px] md:text-[20px] noto-sans text-[#f5f5f5]  tracking-wide">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full mt-2 p-2 text-[16px] md:text-[18px] text-[#f5f5f5]/70 bg-transparent border-b border-[#f5f5f5]/15 focus:outline-none focus:border-white text-white noto-sans placeholder-[#f5f5f5]/30 Capitalize "
        />
      </div>
    </div>
  );
};

export default FormField;