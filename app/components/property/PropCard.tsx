"use client";

import Image from 'next/image';
import React, { useCallback } from 'react';
import { FaBed, FaBath, FaPhone, FaWhatsapp, FaEnvelope, FaRulerCombined } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useCurrency } from '../hooks/useCurrency';
import PriceConverter from '../currencyConverter/priceConverter';

interface Props {
  _id: string;
  images: {
    backgroundImage: string;
  };
  title: string;
  price: number;
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

const PropCard: React.FC<Props> = React.memo(({
  _id,
  images,
  title,
  price,
  location,
  numOfrooms,
  numOfbathrooms,
  size,
  area,
}) => {
  
  const { selectedCurrency } = useCurrency();

  const handleWhatsAppClick = useCallback(() => {
    const message = `Hello, I am interested in the property: ${title}`;
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }, [title]);

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`;
  }, []);

  const handleCallClick = useCallback(() => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  }, []);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-600 dark:border-gray-600 rounded-lg border border-gray-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer flex flex-col h-full transition-shadow duration-300 ease-in-out">
      <Link href={`/property/${_id}`} className="block">
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64">
          <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-300"
            src={images?.backgroundImage}
            alt="Property image"
            fill
            unoptimized
            priority={true} // Ensures the image is loaded fast if it's critical
          />
        </div>
      </Link>
      <div className="p-4 sm:p-6 md:p-8 lg:p-6 flex flex-col justify-between flex-grow">
        <PriceConverter
          price={price}
          style="text-lg sm:text-md font-semibold text-orange-500 dark:text-orange-300 mb-2"
        />
        <h3 className="text-base sm:text-md md:text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <div className="flex items-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
          <IoLocationOutline className="mr-2 text-gray-800 dark:text-gray-300" />
          <span>{location.city}, {area?.areaName}, {location.state}</span>
        </div>
        <div className="flex flex-wrap items-center text-xs sm:text-sm space-x-1 text-gray-700 dark:text-gray-300 mb-2">
          <FaBed className="text-gray-800 dark:text-gray-300" />
          <span>{numOfrooms} Beds</span>
          <span>|</span>
          <FaBath className="text-gray-800 dark:text-gray-300" />
          <span>{numOfbathrooms} Baths</span>
          <span>|</span>
          <FaRulerCombined className="text-gray-800 dark:text-gray-300" />
          <span>{size} sq ft</span>
        </div>

        <div className="border-t border-gray-300 dark:border-white pt-4">
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
});

PropCard.displayName = 'PropCard';

export default PropCard;
