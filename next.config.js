/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dprcbv08r/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },

  
   
  // Custom environment variable validation
  webpack(config, { isServer }) {
    if (isServer) {
      // Check if required environment variables are set
      const requiredEnvVars = [
        'NEXT_PUBLIC_API_URL',
        'NEXT_PUBLIC_CLOUDINARY_URL',
        'NEXT_PUBLIC_SANITY_PROJECT_ID',
      ];

      requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
          console.error(`Error: Missing required environment variable: ${envVar}`);
          process.exit(1); // Stop build if any required env var is missing
        }
      });
    }

    return config;
  },
};

module.exports = nextConfig;
