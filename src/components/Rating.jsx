import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const cn = (...inputs) => twMerge(clsx(inputs));
const Rating = ({ value }) => {
  return (
    <div className={cn("flex items-center text-yellow-500")}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < value ? "currentColor" : "none"}
          stroke={index < value ? "none" : "currentColor"}
          className={cn("w-4 h-4")}
        />
      ))}
    </div>
  );
};
export default Rating;