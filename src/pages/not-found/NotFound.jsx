import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 mb-1">
      <section className="flex items-center justify-center h-screen p-16">
        <div className="container flex flex-col items-center">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-700 dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300">
              Sorry, we couldn't find this page!
            </p>
            <Link
              to="/"
              className="px-8 py-4 text-xl font-semibold rounded bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
