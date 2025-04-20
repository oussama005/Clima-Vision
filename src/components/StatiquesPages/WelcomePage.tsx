
import FeedbackSlider from '../WelcomePages/Feedback';
import WeatheriaFeatures from '../WelcomePages/Discover';
import WeatherNews from '../WelcomePages/Blog';
import { Footer } from "../StatiquesPages/Footer";
import { SignUpButton } from "@clerk/clerk-react";

export default function WelcomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900">
        <div className="max-w-4xl mx-auto z-[2] animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-indigo-600 dark:text-indigo-400">Weather service</span> with forecast
            <br />for <span className="text-indigo-600 dark:text-indigo-400">65K locations</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
            Our service is one of the first weather sites in Sweden and has been recognized by the users as trusted and loved. As a trusted brand, it has above <strong className="text-indigo-600 dark:text-indigo-400">1.7 million</strong> monthly real users.
          </p>
          <div className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                Get Started
              </button>
            </SignUpButton>
            <button className="px-8 py-3 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full w-12 h-12 hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
              <span className="text-xl">▶</span>
            </button>
          </div>
        </div>

        <div className="relative flex justify-center w-full z-[1] mt-12 px-4">
          <img
            src="./dashboard.png"
            alt="Dashboard Preview"
            className="w-full max-w-4xl rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700"
            loading="lazy"
          />
        </div>
      </section>

      {/* Features Section */}
      <WeatheriaFeatures />

      {/* News Section */}
      <WeatherNews />

      {/* Testimonials Section */}
      <FeedbackSlider />

      {/* Footer */}
      <Footer />
    </>
  );
}