import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ThumbsUp } from 'lucide-react';
import Rating from './Rating';
const cn = (...inputs) => twMerge(clsx(inputs));
const BookDetails = ({ book }) => {
  return (
    <div className={cn("flex space-x-6 p-4 bg-gray-100 rounded-lg")}>
      <div className={cn("w-2/5 flex-shrink-0")}>
        <img
          src={`https://picsum.photos/seed/${book.id}/200/300`}
          alt={`Cover for ${book.title}`}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className={cn("w-3/5")}>
        <h3 className={cn("text-xl font-bold text-gray-800")}>{book.title}</h3>
        <p className={cn("text-gray-600 italic mt-1")}>by {book.authors.join(', ')}</p>

        <div className={cn("flex items-center text-gray-700 font-medium mt-4")}>
          <ThumbsUp size={16} className="text-blue-500 mr-2" />
          {book.likes} {book.likes === 1 ? 'Like' : 'Likes'}
        </div>
        {book.reviews.length > 0 && (
          <div className={cn("mt-4")}>
            <h4 className={cn("text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2")}>Reviews ({book.reviews.length})</h4>
            <ul className={cn("space-y-4")}>
              {book.reviews.map((review) => (
                <li key={review.id} className={cn("p-3 bg-white rounded-md shadow-sm border border-gray-200")}>
                  <div className={cn("flex items-center justify-between text-sm text-gray-500 mb-1")}>
                    <span className={cn("font-medium text-gray-700")}>{review.author}</span>
                    <Rating value={review.rating} />
                  </div>
                  <p className={cn("text-gray-600 leading-relaxed")}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookDetails;