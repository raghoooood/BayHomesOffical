"use client"
import React from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface PropimageModelProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const PropimageModel: React.FC<PropimageModelProps> = ({ images, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white p-5 rounded-lg max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-red-500"
        >
          <FaTimes size={24} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-48">
              <Image
                src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${img}`}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropimageModel;
