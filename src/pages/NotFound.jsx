import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[length:20px_20px] opacity-20"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full opacity-10 blur-[100px]"></div>
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500 rounded-full opacity-10 blur-[80px]"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-pulse">
            404
          </h1>
          <div className="h-0.5 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto my-6"></div>
          <h2 className="mt-2 text-3xl font-bold text-white">Page not found</h2>
          <p className="mt-2 text-lg text-gray-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            >
              <span className="relative">Go back home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-1 bg-gradient-to-l from-purple-500 to-transparent"></div>
    </div>
  );
};

export default NotFound;
