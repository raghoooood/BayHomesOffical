"use client"

import Image from 'next/image';
import React from 'react';
import { FaBed, FaBath, FaPhone, FaWhatsapp, FaEnvelope, FaRulerCombined } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCurrency } from '../hooks/useCurrency';
import PriceConverter from '../currencyConverter/priceConverter';
import { getConvertedPrice } from '@/lib/utils';
import PropertyDesc from '@/app/(root)/property/PropDesc';

interface Props {
  _id: string;
  images: {
    propImages: string[];
  };
  title: string;
  price: number;
  description: string;
  numOfbathrooms: number;
  location: {
    city: string;
    state: string;
    street: string;
  };
  numOfrooms: number;
  area: {
    areaName: string;
  };
  size: string;
}

const AllPropCard: React.FC<Props> = ({ 
  _id,
  images,
  title,
  price,
  location,
  numOfrooms,
  numOfbathrooms,
  size,
  area,
  description
}) => {

  const additionalImages = images.propImages.slice(1, 3); // Get additional images, ensure there are at least 3
  
  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in the property: ${title}`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`;
  };

  const handleCallClick = () => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  };

  // Function to truncate description
  const truncateDescription = (desc: string, wordLimit: number) => {
    const words = desc.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return desc;
  };

  const truncatedDescription = truncateDescription(description, 30); // Update word limit

  return (
    <Link href={`/property/${_id}`}>
      <div className="relative w-full bg-white dark:bg-CardDark rounded-lg shadow-lg transition-shadow duration-300 ease-in-out flex flex-col md:flex-row h-full overflow-hidden cursor-pointer">
        <div className="relative w-full sm:w-2/5 w-2/3 h-80 sm:h-96 overflow-hidden">
          <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-500 ease-out rounded-md"
            src={images.propImages?.[0]}
            alt="Property image"
            fill
            unoptimized
          />
        </div>

        <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 h-80 sm:h-96 overflow-hidden">
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-1/2 overflow-hidden ml-2 mb-1 rounded-md "
            >
              <Image
                src={img}
                alt={`Additional Image ${index + 1}`}
                fill
                className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-500 ease-out"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="p-4 flex flex-col justify-between w-full sm:w-2/5">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <PriceConverter
            price={price}
            style="text-2xl font-semibold text-orange-500 dark:text-orange-400"
          />
          
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
            <IoLocationOutline className="mr-2 text-gray-500 dark:text-gray-400" />
            <span>{location.city}, {area?.areaName}, {location.state}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 space-x-2 mb-4">
            <FaBed className="text-gray-900 dark:text-gray-200" />
            <span>{numOfrooms} Beds</span>
            <FaBath className="text-gray-900 dark:text-gray-200" />
            <span>{numOfbathrooms} Baths</span>
            <FaRulerCombined className="text-gray-900 dark:text-gray-200" />
            <span>{size} sq ft</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">        
            <PropertyDesc description={truncatedDescription} />
          <span className="text-orange-500 underline">Read More</span></div>


          <div className="border-t border-gray-300 dark:border-gray-600 p-4 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center cursor-pointer" onClick={handleCallClick}>
                  <FaPhone className="text-lg text-gray-600 dark:text-gray-400" />
                  <span className="text-xs ml-1 hover:text-orange-500">Call</span>
                </div>
                <div className="flex items-center cursor-pointer" onClick={handleWhatsAppClick}>
                  <FaWhatsapp className="text-lg text-gray-900 dark:text-gray-200" />
                  <span className="text-xs ml-1 hover:text-orange-500">WhatsApp</span>
                </div>
                <div className="flex items-center cursor-pointer" onClick={handleEmailClick}>
                  <FaEnvelope className="text-lg text-gray-600 dark:text-gray-400" />
                  <span className="text-xs ml-1 hover:text-orange-500">Email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AllPropCard;
