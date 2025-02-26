/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "mediaservice.audi.com",
      "media-assets.mazda.eu",
      "media.istockphoto.com",
      "res.cloudinary.com",
      "apany-backend.onrender.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
