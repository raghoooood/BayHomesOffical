import Image from 'next/image';
import React from 'react';
import { FaBed, FaBath, FaPhone, FaWhatsapp, FaEnvelope, FaRulerCombined } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';


interface Props {
  _id: string;
  images: {
    backgroundImage: string;
  };
  projectName: string;
  startPrice?: number;
  location: string;
  rooms: {
    min: number;
    max: number;
  };
  area?: {
    areaName: string;
  };
  developer: {
    developerName: string;
  }
  size?: string;
}

const ProjectCrad2: React.FC<Props> = ({
  _id,
  images,
  projectName,
  startPrice,
  location,
  rooms,
  size,
  developer,
  area,
}) => {


  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-600 dark:border-gray-600 rounded-lg border border-gray-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer flex flex-col h-full transition-shadow duration-300 ease-in-out">
      <Link href={`/projects/${projectName}`} className="block">
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64">
          <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-300"
            src={images?.backgroundImage}
            alt="Property image"
            fill
            unoptimized
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6 md:p-8 lg:p-6 flex flex-col justify-between flex-grow">
      <div className="p-6 flex flex-col justify-between flex-grow">
          <div className='space-y-2'>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-black mb-1">{projectName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created by: 
              <span className='text-lg font-semibold text-orange-500 dark:text-orange-400'>{developer.developerName}</span>
            </p>
          </div>
        
        <div className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
          <IoLocationOutline className="mr-2 text-gray-800 dark:text-gray-300" />
          <span>{area?.areaName}</span>
        </div>
        <div className="flex flex-wrap items-center text-xs sm:text-sm space-x-1 text-gray-700 dark:text-gray-300 mb-2">
          <FaBed className="text-gray-800 dark:text-gray-300" />
          <span>{rooms.min},{rooms.max}</span>
          
      
        </div>

        
      </div>
    </div>
</div>
  );
};

export default ProjectCrad2;
