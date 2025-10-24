import { Button } from "@material-tailwind/react";
import { MdLocationOn } from "react-icons/md";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/egy2.jpg"
            alt="nile river"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-4">
            Discover Egypt
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-xl mx-auto font-bold font-serif">
            A world of beauty, stories, and thrill
          </p>
          <Link to="/places">
            <Button
              color="white"
              size="lg"
              className="text-white font-semibold rounded-lg bg-teal-600 hover:bg-white hover:text-teal-600"
            >
              Explore now
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-10 md:py-12 mb-1">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4 text-gray-800 dark:text-gray-200">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <MdLocationOn className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-3xl font-light mb-1">150+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Destinations
              </p>
            </div>

            <div className="flex flex-col items-center p-4 text-gray-800 dark:text-gray-200">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <FaUsers className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-3xl font-light mb-1">50K+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Happy Travelers
              </p>
            </div>

            <div className="flex flex-col items-center p-4 text-gray-800 dark:text-gray-200">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <FaTrophy className="h-6 w-6 text-teal-600" />
              </div>
              <p className="text-3xl font-light mb-1">5,000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Years of History
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
