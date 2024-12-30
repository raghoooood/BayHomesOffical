/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com' , 's3-ap-southeast-1.amazonaws.com'],
  

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

  
  productionBrowserSourceMaps: true,
   
}

module.exports = nextConfig 
