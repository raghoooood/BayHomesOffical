'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export interface DeveloperProps {
  developerName: string;
  description: string;
  image: string;
}

const DeveloperHero: React.FC<DeveloperProps> = ({ 
  developerName,
  description,
  image,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client before rendering dynamic content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent server-client mismatch
  if (!isMounted) {
    return null; // Render nothing on the server side
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-[#04083d] to-[#090e4f] flex justify-center items-center px-6 py-10 rounded-xl">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-4 space-y-12 md:space-y-0">
        {/* Left section with developer info */}
        <div className="text-center md:text-left md:w-1/2 p-5">
          <h5 className="text-xs text-gray-400 pb-4 uppercase tracking-wide">About the Developer</h5>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {developerName}
          </h1>
          <p className="mt-6 text-gray-200 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right section with developer image */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end p-5">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <Image
              src={image}
              alt="Developer logo"
              width={250}
              height={250}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperHero;
