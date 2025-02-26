import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center px-3 md:px-6 py-12 max-w-md mx-auto">
        <h1 className="text-3xl md:text-8xl font-extrabold tracking-widest mb-4">
          404
        </h1>
        <p className="text-xl md:text-3xl mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-4 md:px-8 py-2.5 md:py-4 text-lg md:text-[1.125rem] font-semibold text-black bg-white hover:bg-gray-200 transition duration-300 rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
