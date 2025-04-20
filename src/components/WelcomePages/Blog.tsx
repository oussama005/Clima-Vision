import  { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface NewsItem {
  date: string;
  title: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
}

const newsItems: NewsItem[] = [
  {
    date: "May 15, 2024",
    title: "Record Heat Wave Sweeps Across Europe",
    content: "Meteorologists report unprecedented temperatures with some regions exceeding 40°C for consecutive weeks.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Extreme Weather",
    readTime: "4 min read"
  },
  {
    date: "May 12, 2024",
    title: "New AI Model Improves Hurricane Prediction Accuracy",
    content: "The latest machine learning algorithms can now predict hurricane paths with 92% accuracy 72 hours in advance.",
    image: "https://images.unsplash.com/photo-1620207418302-439b387441b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Technology",
    readTime: "6 min read"
  },
  {
    date: "May 10, 2024",
    title: "Arctic Ice Melting Faster Than Projected",
    content: "New satellite data shows summer ice coverage is 30% below historical averages, impacting global weather patterns.",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Climate Change",
    readTime: "5 min read"
  },
  {
    date: "May 8, 2024",
    title: "Solar Flare Activity May Disrupt Global Communications",
    content: "NASA warns of potential GPS and radio disruptions as sunspot activity reaches solar maximum.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Space Weather",
    readTime: "3 min read"
  },
  {
    date: "May 5, 2024",
    title: "Monsoon Season Arrives Early in Southeast Asia",
    content: "Unexpected early rains bring relief to drought-stricken regions but cause flooding in urban areas.",
    image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Seasonal",
    readTime: "4 min read"
  },
  {
    date: "May 3, 2024",
    title: "New Weather Satellite Launched for Pacific Coverage",
    content: "The advanced Himawari-10 satellite will provide minute-by-minute storm tracking for the Pacific Rim.",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    date: "May 1, 2024",
    title: "Study Links Urban Heat Islands to Increased Storm Intensity",
    content: "Research shows cities may be amplifying thunderstorm strength through heat retention effects.",
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Research",
    readTime: "7 min read"
  }
];

const NewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleItems = newsItems.slice(activeIndex, activeIndex + 3);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 3));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < newsItems.length - 3 ? prev + 1 : 0));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Weather News & Updates
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Previous news"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Next news"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, index) => (
            <article 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <time className="text-sm text-gray-500 dark:text-gray-400">{item.date}</time>
                  <span className="text-xs text-gray-400">{item.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {item.content}
                </p>
                <button className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300">
                  Read more
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-1">
          {Array.from({ length: Math.ceil(newsItems.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index * 3)}
              className={`w-3 h-3 rounded-full transition-colors ${Math.floor(activeIndex / 3) === index ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`View news page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;