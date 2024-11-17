'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AreaCardData } from '@/utils/areaCardData';

const AreaCard: React.FC<AreaCardData> = ({ image, areaName }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/areas/${areaName}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col rounded-lg overflow-hidden shadow-lg dark:bg-CardDark w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg transition-transform transform hover:scale-105 duration-300"
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 transition-transform transform hover:scale-105 duration-300">
        <Image
          src={image as string}
          alt={areaName}
          className="object-cover w-full h-full"
          layout="fill"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="flex items-center justify-center bg-white dark:bg-CardDark p-3">
        <h3 className="text-md sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
          {areaName}
        </h3>
      </div>
    </div>
  );
};

export default AreaCard;
