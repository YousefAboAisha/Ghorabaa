/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ar", "en"], // List of supported locales
    defaultLocale: "ar", // Default locale
    localeDetection: true, // Optional: detects user locale via browser
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
