
import { FiAlertCircle, FiSettings, FiCloud } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <FiAlertCircle className="w-6 h-6" />,
    title: "Real-time Forecasts",
    description: "Weather data updated every 15 minutes for your exact location"
  },
  {
    icon: <FiSettings className="w-6 h-6" />,
    title: "Customized experience",
    description: "Personalize your dashboard with preferred units and display options."
  },
  {
    icon: <FiCloud className="w-6 h-6" />,
    title: "Local conditions",
    description: "Hyper-local weather data with minute-by-minute precipitation forecasts."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for <span className="text-indigo-600 dark:text-indigo-400">Precise Forecasting</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            Our platform combines advanced meteorological data with intuitive design to deliver the most accurate weather predictions.
          </p>
          <Link 
          to="/features" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
            Explore All Features
         
        </Link>
         
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-start gap-4"
            >
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;