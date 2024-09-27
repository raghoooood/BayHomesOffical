'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AreaCardData } from '@/utils/areaCardData';

const AreaHome: React.FC<AreaCardData> = ({ _id, areaName }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/areas/${areaName}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 overflow-hidden flex items-center justify-center"
    >
      <div className="flex-grow flex py-4">
        <h3 className="text-lg font-semibold text-gray-500 text-md sm:text-lg hover:text-orange-500 hover:underline">
          {areaName}
        </h3>
      </div>
    </div>
  );
};

export default AreaHome;
