"use client";

import Image from 'next/image';
import React, { useCallback } from 'react';
import { FaBed, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
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
  };
  size?: string;
}

const ProjectCard2: React.FC<Props> = ({
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
  const handleWhatsAppClick = useCallback(() => {
    const message = `Hello, I am interested in the property.`;
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }, []);

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`;
  }, []);

  const handleCallClick = useCallback(() => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`;
  }, []);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-800 rounded-lg border border-gray-300 shadow-md hover:shadow-lg overflow-hidden cursor-pointer flex flex-col h-full transition-shadow duration-300 ease-in-out">
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
      <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          {/* Project Name */}
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{projectName}</h3>

          {/* Developer Name */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Created by :   
            <span className="font-semibold text-orange-500 dark:text-orange-400">  {developer.developerName}</span>
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2 mt-2">
          <IoLocationOutline className="mr-3  text-gray-800 dark:text-gray-400" />
          <span>{area?.areaName}</span>
        </div>

        {/* Rooms */}
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-4">
          <FaBed className="text-gray-800 dark:text-gray-400 ml-1 mr-2" />
          <span>{rooms.min} - {rooms.max} bedrooms</span>
        </div>

        {/* Contact Buttons */}
        <div className="border-t border-gray-300 dark:border-gray-500 pt-4 mt-auto">
          <div className="flex space-x-6">
            <button className="flex items-center hover:text-orange-500 text-sm" onClick={handleEmailClick}>
              <FaEnvelope className="text-xl mr-2 text-gray-600 dark:text-gray-300" />
              <span>Email</span>
            </button>
            <button className="flex items-center hover:text-orange-500 text-sm" onClick={handleCallClick}>
              <FaPhone className="text-xl mr-2 text-gray-600 dark:text-gray-300" />
              <span>Call</span>
            </button>
            <button className="flex items-center hover:text-orange-500 text-sm" onClick={handleWhatsAppClick}>
              <FaWhatsapp className="text-xl mr-2 text-gray-600 dark:text-gray-300" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard2;
