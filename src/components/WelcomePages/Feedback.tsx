import  { useState, useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  text: string;
  name: string;
  title: string;
  img: string;
}

const testimonials: Testimonial[] = [
  {
    text: "As a daily weather tool, this site is unmatched. The clarity, precision, and visual design make it my go-to source before making any plans.",
    name: "Alice Moreau",
    title: "Weather Analyst, ClimatePro",
    img: "https://studiofalour.com/wp-content/uploads/2023/03/Studio-Falour-Comment-faire-une-belle-photo-de-profil-Linkedin-007.jpg",
  },
  {
    text: "The hyper-local forecasts have transformed how we plan our outdoor events. Accuracy is consistently better than other services we've tried.",
    name: "David Chen",
    title: "Event Planner, Skyline Productions",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "As a farmer, precise weather predictions are crucial. This service has helped me reduce crop losses by 30% through better planning.",
    name: "Maria Gonzalez",
    title: "Organic Farmer, GreenValley Farms",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "The API integration allows us to provide real-time weather data to our logistics platform, improving delivery efficiency by 18%.",
    name: "James Wilson",
    title: "CTO, LogiTrack Systems",
    img: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    text: "I've tried every weather app out there. This is the only one that combines accuracy with an interface that doesn't make me want to scream.",
    name: "Sophie Martin",
    title: "Avid Hiker & Outdoor Enthusiast",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    text: "Our airline relies on their severe weather alerts to optimize flight paths, saving thousands in fuel costs annually.",
    name: "Captain Robert Lee",
    title: "Pilot, Global Airways",
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  }
];

const FeedbackSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const { text, name, title, img } = testimonials[current];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Trusted by Professionals Worldwide
        </h2>
        
        <div 
          className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8 transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <FaQuoteLeft className="text-5xl text-indigo-500 flex-shrink-0" />
          
          <div className="flex-1">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {text}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <img 
                src={img} 
                alt={name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 dark:border-gray-700"
                loading="lazy"
              />
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${index === current ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`View testimonial from ${testimonials[index].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSlider;