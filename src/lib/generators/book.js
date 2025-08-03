import { Faker } from '@faker-js/faker';
const reviewsByLanguage = {
  en: [
    "A must-read for fans of the genre!",
    "The plot was a bit slow, but the characters were well-developed.",
    "I couldn't put this book down, it was that good.",
    "A fascinating read from start to finish.",
    "I highly recommend this book. Great story!",
    "A unique and compelling narrative.",
    "An excellent debut from a promising author.",
    "The world-building in this novel is truly exceptional.",
    "I loved the intricate details and emotional depth.",
    "The writing style is beautiful and poetic.",
    "An unexpected masterpiece.",
    "This book changed my perspective on the subject.",
    "A fantastic page-turner!",
    "The humor was a pleasant surprise.",
    "Left me wanting more. Can't wait for the sequel!",
  ],
  ru: [
    "Отличное чтение для всех любителей жанра!",
    "Сюжет немного затянут, но персонажи очень хорошо проработаны.",
    "Не мог оторваться от этой книги, настолько она хороша.",
    "Захватывающее повествование от начала до конца.",
    "Настоятельно рекомендую. Отличная история!",
    "Уникальный и увлекательный рассказ.",
    "Прекрасный дебют многообещающего автора.",
    "Мир в этом романе проработан просто потрясающе.",
    "Мне очень понравились тонкие детали и эмоциональная глубина.",
    "Стиль написания — красивый и поэтичный.",
    "Неожиданный шедевр.",
    "Эта книга изменила моё отношение к данной теме.",
    "Фантастический, захватывающий сюжет!",
    "Юмор стал приятным сюрпризом.",
    "Захотелось продолжения. Жду с нетерпением!",
  ],
  zh_CN: [
    "必读之作，流派粉丝不容错过！",
    "情节发展有些慢，但人物塑造非常出色。",
    "我爱不释手，这本书太棒了。",
    "引人入胜的阅读体验，从头到尾都非常棒。",
    "强烈推荐这本书。故事很精彩！",
    "一个独特而引人注目的叙事。",
    "一位前途光明的新作家的优秀处女作。",
    "这部小说的世界观构建真是非凡。",
    "我喜欢这些错综复杂的细节和情感深度。",
    "写作风格优美且富有诗意。",
    "一部意想不到的杰作。",
    "这本书改变了我对这个主题的看法。",
    "一本精彩的翻页书！",
    "幽默感是一个惊喜。",
    "让我意犹未尽。迫不及待地想看续集！",
  ],
};
export function generateBook(fakerInstance, language, settings) {
  const title = fakerInstance.commerce.productName();
  const authors = Array.from({ length: fakerInstance.number.int({ min: 1, max: 3 }) }, () =>
    fakerInstance.person.fullName()
  );
  const publisher = fakerInstance.company.name();
  const isbn = fakerInstance.commerce.isbn();
  const bookId = fakerInstance.string.uuid();
  const likesFloor = Math.floor(settings.likesPerBook);
  const likesRemainder = settings.likesPerBook % 1;
  const likes = likesFloor + (fakerInstance.number.float({ min: 0, max: 1 }) < likesRemainder ? 1 : 0);
  const reviewsFloor = Math.floor(settings.reviewsPerBook);
  const reviewsRemainder = settings.reviewsPerBook % 1;
  const reviewCount = reviewsFloor + (fakerInstance.number.float({ min: 0, max: 1 }) < reviewsRemainder ? 1 : 0);
  const reviewPhrases = reviewsByLanguage[language] || reviewsByLanguage['en'];
  const reviews = Array.from({ length: reviewCount }, () => {
    return {
      id: fakerInstance.string.uuid(),
      author: fakerInstance.person.fullName(),
      rating: fakerInstance.number.int({ min: 1, max: 5 }),
      comment: reviewPhrases[fakerInstance.number.int({ min: 0, max: reviewPhrases.length - 1 })],
    };
  });
  return {
    id: bookId,
    isbn,
    title,
    authors,
    publisher,
    cover: `https://picsum.photos/seed/${bookId}/200/300`,
    likes,
    reviews,
  };
}