import React from 'react';
const Slider = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col items-start my-4">
      <label className="text-sm font-bold text-gray-700">
        {label}: <span className="font-normal">{value}</span>
      </label>
      <input
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
      />
    </div>
  );
};
export default Slider;