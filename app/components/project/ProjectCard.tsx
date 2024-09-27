'use client';

import Image from 'next/image';
import React from 'react';
import { FaBed, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { convertCurrency } from '@/lib/utils';
import { useCurrency } from '../hooks/useCurrency';
import PropertyDesc from '@/app/(root)/property/PropDesc';
import PriceConverter from '../currencyConverter/priceConverter';

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

const ProjectCard: React.FC<Props> = ({
  _id,
  images,
  projectName,
  rooms,
  area,
  description , 
  developer,
  size,
  startPrice
}) => {
  const additionalImages = images.outImages?.slice(1, 3);

  
  const truncatedDescription = description ? description.split(' ').slice(0, 40).join(' ') : '';

  

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


  return (
    <Link href={`/projects/${projectName}`} className="block h-full">
      <div className="relative w-full bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl overflow-hidden cursor-pointer flex flex-col md:flex-row h-full transition-shadow duration-300 ease-in-out">
        
        <div className="relative w-full md:w-2/3 lg:w-2/3 h-72 sm:h-80 overflow-hidden mr-1">
          <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-110 duration-500 ease-out"
            src={images.backgroundImage}
            alt="Property image"
            fill
            unoptimized
          />
        </div>

        <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 h-72 sm:h-80  space-y-1 overflow-hidden">
          {additionalImages?.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-1/2 overflow-hidden transition-transform transform hover:scale-110 duration-500 ease-out"
            >
              <Image
                src={img}
                alt={`Additional Image ${index + 1}`}
                fill
                className="object-cover w-full h-full rounded-sm"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="p-3 flex flex-col space-y-5 flex-grow">
          <div className='space-y-1'>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-black mb-1">{projectName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created by : 
              <span className='text-lg font-semibold text-orange-500 dark:text-orange-400'>  {developer?.developerName}</span>
            </p>

            {startPrice !== null && (
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting price :
             <PriceConverter
              price={startPrice}
              style="text-lg font-semibold text-orange-500 dark:text-orange-400"
           />
          </p>
          )}

           
            
          </div>

          <div>
            {/* <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <IoLocationOutline className="text-gray-800 mr-1" />
              <span>{location.city}, {area?.areaName}, {location.state}</span>
            </div> */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <FaBed className="mr-2 text-gray-800" />
              <span>{rooms?.min} to {rooms?.max} bedrooms </span>
            </div>
             <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-[35vw]">
             <PropertyDesc description={truncatedDescription} />
               <span className='text-orange-500 underline'>Read More</span></div> 
            
            {/* Contact buttons */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
            <div className="flex space-x-4">
              <button className="flex items-center text-sm text-gray-600 hover:text-orange-500" onClick={handleWhatsAppClick}>
                <FaWhatsapp className="mr-1 text-lg" />
                WhatsApp
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-orange-500" onClick={handleEmailClick}>
                <FaEnvelope className="mr-1 text-lg" />
                Email
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-orange-500" onClick={handleCallClick}>
                <FaPhone className="mr-1 text-lg" />
                Call
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
