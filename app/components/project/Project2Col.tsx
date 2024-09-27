'use client';
import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface ColsProps {
  backgroundImage: string;
  title: string;
  description: string;
  aminities: string[];
}

const Project2Col: React.FC<ColsProps> = ({ backgroundImage, title, description, aminities }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#04083d] to-[#090e4f] flex flex-col lg:flex-row justify-center items-center px-6 py-10 rounded-xl">
      {/* Image Section */}
      <div className="relative w-full lg:w-1/2 h-80 lg:h-[calc(100vh-8rem)] mb-8 lg:mb-0 rounded-xl overflow-hidden">
        <Image
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={backgroundImage}
          alt="Project Image"
          fill
          unoptimized
        />
      </div>

      {/* Text Section */}
      <div className="relative w-full lg:w-1/2 lg:pl-12 flex flex-col justify-center space-y-4 lg:space-y-6">
        <h4 className="text-3xl lg:text-5xl font-bold mb-2 lg:mb-4 text-gray-100 text-left">
          {title}
        </h4>
        <p className="text-lg lg:text-xl text-gray-200 leading-relaxed text-left">
          {description}
        </p>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-2 text-gray-50 ">
          {aminities.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 ">
              <FaCheck className="text-green-400" />
              <p className="text-sm lg:text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Project2Col;
