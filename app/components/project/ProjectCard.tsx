'use client';

import Image from 'next/image';
import React from 'react';
import { FaBed, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
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
  rooms?: {
    min: number;
    max: number;
  };
  area: {
    areaName: string;
  };
  description?: string;
  developer?: {
    developerName: string;
  };
  size: string;
  startPrice: number;
  location: string;
}

const ProjectCard: React.FC<Props> = ({
  _id,
  images,
  projectName,
  rooms,
  area,
  description,
  developer,
  size,
  startPrice,
  location,
}) => {
  const additionalImages = images.outImages?.slice(1, 3);

  const truncatedDescription = description
    ? description.split(' ').slice(0, 40).join(' ') + '...'
    : '';

  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in the project: ${projectName}`;
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      '_blank'
    );
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`;
  };

  const handleCallClick = () => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  };

  return (
    <Link href={`/projects/${projectName}`}>
      <div className="relative w-full bg-white dark:bg-CardDark rounded-lg shadow-lg transition-shadow duration-300 ease-in-out flex flex-col md:flex-row h-full overflow-hidden cursor-pointer">
      {/* Main Image */}
      <div className="relative w-full sm:w-2/5 w-2/3 h-80 sm:h-96 overflow-hidden">
      <Image
            className="object-cover w-full h-full transition-transform transform hover:scale-105 duration-500 ease-out rounded-md"
            src={images.backgroundImage}
            alt="Property image"
            fill
            unoptimized
          />
        </div>

        {/* Additional Images */}
        <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 h-80 sm:h-96 overflow-hidden">
          {additionalImages?.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-1/2 overflow-hidden ml-2 mb-1 rounded-md">           
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

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between w-full sm:w-2/5">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {projectName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Created by:{' '}
              <span className="font-semibold text-orange-500 dark:text-orange-400">
                {developer?.developerName}
              </span>
            </p>
            {startPrice !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Starting price:{' '}
                <PriceConverter
                  price={startPrice}
                  style="text-lg font-semibold text-orange-500 dark:text-orange-400"
                />
              </p>
            )}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <IoLocationOutline className="text-gray-800 dark:text-gray-300 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <FaBed className="mr-2 text-gray-800 dark:text-gray-300" />
              <span>
                {rooms?.min} to {rooms?.max} bedrooms
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            <PropertyDesc description={truncatedDescription} />
            <span className="text-orange-500 underline">Read More</span>
          </div>

          {/* Contact Buttons */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-sm text-gray-600 hover:text-orange-500"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp className="mr-1 text-lg" />
                WhatsApp
              </button>
              <button
                className="flex items-center text-sm text-gray-600 hover:text-orange-500"
                onClick={handleEmailClick}
              >
                <FaEnvelope className="mr-1 text-lg" />
                Email
              </button>
              <button
                className="flex items-center text-sm text-gray-600 hover:text-orange-500"
                onClick={handleCallClick}
              >
                <FaPhone className="mr-1 text-lg" />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
