import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import BookDetails from './BookDetails';
import { ChevronDown, ChevronUp } from 'lucide-react';
const cn = (...inputs) => twMerge(clsx(inputs));
const BookRow = ({ book, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn("p-[3px] bg-gray-50 rounded-lg shadow-sm border border-gray-200 cursor-pointer")}>
      <div 
        className="grid grid-cols-[50px_1fr_2fr_2fr_50px] items-center gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-center text-gray-600 font-medium">{index}</div>
        <div className="text-center text-sm font-mono text-gray-600">{book.isbn}</div>
        <div className="flex items-center">
          <img
            src={`https://picsum.photos/seed/${book.id}/40/40`}
            alt={`Cover for ${book.title}`}
            className="w-10 h-10 object-cover rounded-md mr-2"
          />
          <span className="font-bold text-gray-800">{book.title}</span>
        </div>
        <div className="text-gray-600 truncate">{book.authors.join(', ')}</div>
        <div className="flex justify-end">
          {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <BookDetails book={book} />
        </div>
      )}
    </div>
  );
};
export default BookRow;