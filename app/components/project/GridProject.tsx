'use client';

import Image from 'next/image';
import React from 'react';
import { FaBed, FaBath, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrency } from '../hooks/useCurrency';
import { convertCurrency } from '@/lib/utils';
import PropertyDesc from '@/app/(root)/property/PropDesc';

interface Props {
  _id: string;
  images: {
    outImages: string[];
    backgroundImage: string;
  };
  projectName?: string;
 
  rooms?:{
    min: number;
    max: number;
  }
  area: {
    areaName: string;
  };
  description?: string;
  developer?: {
    developerName: string;
  };
  size: string;
  startPrice: number;

}
const GridProject: React.FC<Props> = ({
  _id,
  images,
  projectName,
  rooms,
  area,
  description='' , 
  developer,
  size,
  startPrice
}) => {
  
  const { selectedCurrency } = useCurrency();

  const exchangeRates = {
    AED: 3.67,
    EUR: 0.85,
    GBP: 0.75,
    USD: 1.00,
  };

  const convertedPrice = convertCurrency(startPrice || 0, 'USD', selectedCurrency, exchangeRates);

  
  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in the project: ${projectName}`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`;
  };

  const handleCallClick = () => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  };

  const words = description.split(' ');
  const truncatedDescription = words.slice(0, 40).join(' ');

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-600 dark:border-gray-600 rounded-lg border border-gray-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer flex flex-col h-full transition-shadow duration-300 ease-in-out">
      <Link href={`/projects/${projectName}`} className="block">
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64">
          <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-300"
            src={images.backgroundImage}
            alt="Property image"
            fill
            unoptimized
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6 md:p-8 lg:p-6 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{projectName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created by : 
            <span className="text-lg font-semibold text-orange-500 dark:text-orange-400">  {developer?.developerName}</span>
          </p>

          {startPrice !== null && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Starting price:
              <span className="text-lg font-semibold text-orange-500 dark:text-orange-400">
                {selectedCurrency} {convertedPrice.toFixed(2)}
              </span>
            </p>
          )}

         {/*  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Starting price:
            <span className="text-lg font-semibold text-orange-500 dark:text-orange-400">{selectedCurrency} {convertedPrice.toFixed(2)}</span>
          </p> */}
        </div>
        {/* <div className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
          <IoLocationOutline className="mr-2 text-gray-800 dark:text-gray-300" />
          <span>{location.city}, {area?.areaName}, {location.state}</span>
        </div> */}
        <div className="flex flex-wrap items-center text-xs sm:text-sm space-x-1 text-gray-700 dark:text-gray-300 mb-2">
          <FaBed className="text-gray-800 dark:text-gray-300" />
          <span>{rooms?.min} to {rooms?.max} bedrooms </span>
         
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
             <PropertyDesc description={truncatedDescription} />
               <span className='text-orange-500 underline'>Read More</span></div> 
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-4 sm:space-x-6">
              <button className="flex items-center hover:text-orange-500 text-xs sm:text-sm" onClick={handleEmailClick}>
                <FaEnvelope className="text-lg sm:text-xl mr-1 text-gray-600 dark:text-gray-300" />
                <span>Email</span>
              </button>
              <button className="flex items-center hover:text-orange-500 text-xs sm:text-sm" onClick={handleCallClick}>
                <FaPhone className="text-lg sm:text-xl mr-1 text-gray-600 dark:text-gray-300" />
                <span>Call</span>
              </button>
              <button className="flex items-center hover:text-orange-500 text-xs sm:text-sm" onClick={handleWhatsAppClick}>
                <FaWhatsapp className="text-lg sm:text-xl mr-1 text-gray-600 dark:text-gray-300" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridProject;
