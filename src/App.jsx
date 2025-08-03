import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BookRow from './components/BookRow';
import { generateBook } from './lib/generators/book';
import Slider from './components/Slider';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RefreshCcw } from 'lucide-react';
import { Faker, ru, en, zh_CN } from '@faker-js/faker';
const cn = (...inputs) => twMerge(clsx(inputs));
const locales = {
  'ru': [ru, en],
  'en': [en],
  'zh_CN': [zh_CN, en],
};
const App = () => {
  const [userSeed, setUserSeed] = useState(() => Math.floor(Math.random() * 1000000000));
  const [language, setLanguage] = useState('en');
  const [likesPerBook, setLikesPerBook] = useState(2.7);
  const [reviewsPerBook, setReviewsPerBook] = useState(4.2);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const settings = useMemo(() => ({
    likesPerBook,
    reviewsPerBook,
  }), [likesPerBook, reviewsPerBook]);
  const generateRandomSeed = () => {
    setUserSeed(Math.floor(Math.random() * 1000000000));
  };
  const loadMoreBooks = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setBooks(prevBooks => {
      const startCount = prevBooks.length;
      const newBooksCount = startCount === 0 ? 20 : 10;
      const locale = locales[language] || [en];
      const fakerInstance = new Faker({ locale: locale });
      fakerInstance.seed(userSeed + startCount);
      const newBooks = Array.from({ length: newBooksCount }, (_, index) =>
        generateBook(fakerInstance, language, settings)
      );
      setLoading(false);
      return [...prevBooks, ...newBooks];
    });
  }, [language, userSeed, settings, loading]);
  useEffect(() => {
    setBooks([]);
    loadMoreBooks();
  }, [userSeed, language, settings]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = 
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500;
      if (isAtBottom && !loading) {
        loadMoreBooks();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMoreBooks]);
  return (
    <div className={cn("max-w-[1200px] mx-auto p-5 bg-white rounded-lg shadow-lg")}>
      <div className={cn("flex flex-wrap gap-5 mb-5 pb-5 border-b border-gray-200")}>
        <div className="flex flex-col font-bold">
          <label>Seed:</label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="number"
              value={userSeed}
              onChange={(e) => setUserSeed(e.target.value)}
              className={cn("p-2 border border-gray-300 rounded-md flex-grow")}
            />
            <button 
              onClick={generateRandomSeed} 
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              aria-label="Generate random seed"
            >
              <RefreshCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <label className={cn("flex flex-col font-bold")}>
          Language:
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className={cn("p-2 border border-gray-300 rounded-md mt-1")}
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="zh_CN">Chinese</option>
          </select>
        </label>
        <Slider
          label="Likes per book"
          value={likesPerBook}
          onChange={(e) => setLikesPerBook(parseFloat(e.target.value))}
          min={0}
          max={10}
          step={0.1}
        />
        <Slider
          label="Reviews per book"
          value={reviewsPerBook}
          onChange={(e) => setReviewsPerBook(parseFloat(e.target.value))}
          min={0}
          max={10}
          step={0.1}
        />
      </div>
      <div className="hidden md:grid grid-cols-[50px_1fr_2fr_2fr_50px] items-center gap-4 text-gray-500 font-semibold border-b-2 border-gray-200 pb-2 mb-4">
        <div className="text-center">#</div>
        <div className="text-center">ISBN</div>
        <div>Title</div>
        <div>Author(s)</div>
        <div></div>
      </div>
      <div className={cn("flex flex-col gap-1")}>
        {books.map((book, index) => (
          <BookRow key={book.id} book={book} index={index + 1} />
        ))}
      </div>
      {loading && <p className={cn("text-center text-gray-500 mt-5")}>Loading...</p>}
    </div>
  );
};
export default App;