'use client'
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface AllGuideCardProps {
  imageSrc: StaticImageData;
  title: string;
  description: string;
  path: string;
}

const AllGuideCard: React.FC<AllGuideCardProps> = ({ imageSrc, title, description, path }) => {
  return (
    <div className="bg-white dark:bg-CardDark shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-600 mt-2 dark:text-gray-400">{description}</p>
        <Link href={path}>
        </Link>
      </div>
    </div>
  );
};

export default AllGuideCard;
