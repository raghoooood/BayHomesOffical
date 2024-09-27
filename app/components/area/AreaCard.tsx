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
      className="cursor-pointer flex flex-col rounded-lg overflow-hidden shadow-lg dark:bg-CardDark w-[50vh] h-[35vh] lg:w-[23rem] lg:h-[20rem] space-x-5"
    >
      <div className="relative w-full h-3/4 transition-transform transform hover:scale-105 duration-300">
        <Image
          src={image as string}
          alt={areaName}
          className="object-cover w-full h-full "
          layout="fill"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 dark:text-white"></div>
      </div>
      <div className="flex items-center justify-center bg-white dark:bg-CardDark p-3">
        <h3 className="text-md sm:text-2xl font-semibold text-gray-800 dark:text-white">{areaName}</h3>
      </div>
    </div>
  );
};

export default AreaCard;
