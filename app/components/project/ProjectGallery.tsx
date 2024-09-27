'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TitleText } from '@/app/styles/CustomTexts';

interface Props {
  images: {
    inImages: string[];
    outImages: string[];
  };
}

const ProjectGallery = ({ images }: Props) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [overlayImageType, setOverlayImageType] = useState<'in' | 'out'>('out');
  const [currentImages, setCurrentImages] = useState<string[]>(images.outImages);

  useEffect(() => {
    setCurrentImages(overlayImageType === 'in' ? images.inImages : images.outImages);
    setCurrentImageIndex(0);
  }, [overlayImageType, images.inImages, images.outImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, currentImages]);

  const handleOpenOverlay = (index: number, imageType: 'in' | 'out') => {
    setOverlayImageType(imageType);
    setCurrentImages(imageType === 'in' ? images.inImages : images.outImages);
    setCurrentImageIndex(index);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseOverlay();
    }
  };

  return (
    <div className="relative container py-10">
      <TitleText title="Outer & Inner View" textStyles="justify-start" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Outer Images */}
        {images.outImages.slice(0, 6).map((src, index) => (
          <div
            key={`outer-${index}`}
            className={`relative ${
              index % 6 === 0
                ? 'col-span-2 sm:col-span-1 lg:col-span-2 row-span-3 h-48 sm:h-64 lg:h-80'
                : index % 3 === 0
                ? 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 h-48 sm:h-64 lg:h-80'
                : 'col-span-1 sm:col-span-1 h-48 sm:h-64 lg:h-80'
            } overflow-hidden rounded-lg shadow-md cursor-pointer`}
            onClick={() => handleOpenOverlay(index, 'out')}
          >
            <Image
              src={src}
              alt={`Outer Gallery Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          </div>
        ))}

        {/* Inner Images */}
        {images.inImages.length > 0 && images.inImages.slice(0, 6).map((src, index) => (
          <div
            key={`inner-${index}`}
            className={`relative ${
              index % 6 === 0
                ? 'col-span-2 sm:col-span-1 lg:col-span-2 row-span-3 h-48 sm:h-64 lg:h-80'
                : index % 2 === 0
                ? 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-1 h-48 sm:h-64 lg:h-80'
                : 'col-span-1 sm:col-span-1 h-48 sm:h-64 lg:h-80'
            } overflow-hidden rounded-lg shadow-md cursor-pointer`}
            onClick={() => handleOpenOverlay(index, 'in')}
          >
            <Image
              src={src}
              alt={`Inner Gallery Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          </div>
        ))}
      </div>

      {isOverlayOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={handleOverlayClick}
          >
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full h-full max-w-lg max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={handlePrevImage}
                  className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft />
                </button>

                <motion.div
                  key={currentImages[currentImageIndex]}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentImages[currentImageIndex]}
                    alt={`Slider Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    unoptimized
                  />
                </motion.div>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectGallery;
