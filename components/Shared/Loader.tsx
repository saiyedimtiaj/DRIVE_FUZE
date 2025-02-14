"use client";

const LoaderScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoaderScreen;
