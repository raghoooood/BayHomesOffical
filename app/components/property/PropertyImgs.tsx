'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight, FaImages } from 'react-icons/fa';
import Loader from '@/app/components/Loader'; // Adjust path as needed

const PropertyImgs = ({ propImages }: { propImages: string[] }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [iconPos, setIconPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const allImages = propImages;
  const totalImages = allImages.length;
  const visibleImages = allImages.slice(0, 3); // First 3 images
  const overlayImages = allImages.slice(3); // Rest of the images

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
  }, [currentImageIndex, totalImages]);

  const handleOpenOverlay = () => {
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? overlayImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === overlayImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });

    const iconX = e.clientX - left;
    const iconY = e.clientY - top;
    setIconPos({ x: iconX, y: iconY });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleImageClick = (index: number) => {
    setMainImageIndex(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const touchStartY = e.touches[0].clientY;

    overlayRef.current!.addEventListener('touchmove', (ev) => {
      const touchEndX = ev.touches[0].clientX;
      const touchEndY = ev.touches[0].clientY;

      if (touchEndX < touchStartX) {
        handleNextImage();
      }

      if (touchEndX > touchStartX) {
        handlePrevImage();
      }

      overlayRef.current!.removeEventListener('touchmove', null!);
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mb-5">
        <div
          className="relative w-full md:w-2/3 h-80 md:h-[50vw] flex items-center justify-center overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <Loader /> {/* Loader component */}
            </div>
          )}

          <Image
            src={allImages[mainImageIndex]}
            alt="Property Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            priority
            onLoadingComplete={handleImageLoad}
            placeholder="blur"
            blurDataURL="/path/to/low-quality.jpg" // Replace with actual low-quality image path
          />

          {isZooming && (
            <>
              <HiMagnifyingGlassPlus
                className="absolute text-white text-3xl"
                style={{
                  left: `${iconPos.x}px`,
                  top: `${iconPos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-25"
                style={{
                  backgroundImage: `url(${allImages[mainImageIndex]})`,
                  backgroundSize: '200%',
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
            </>
          )}

          {totalImages > 3 && (
            <button
              onClick={handleOpenOverlay}
              className="absolute bottom-4 right-4 bg-transparent border-2 border-white text-white py-2 px-4 rounded-md flex items-center space-x-2"
            >
              <FaImages className="text-xl" />
              <span>Show {totalImages - 3} More Image{totalImages - 3 !== 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-5 md:w-1/3">
          {visibleImages.map((img: string, index: number) => (
            <div
              key={index}
              className="relative w-full h-48 md:h-1/2 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={img}
                alt={`Additional Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {isOverlayOpen && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center overflow-auto"
    onClick={handleCloseOverlay}
    ref={overlayRef}
    onTouchStart={handleTouchStart} // Enable touch scrolling
  >
    <div className="relative w-full h-full max-w-4xl md:max-h-[90vh] bg-white rounded-lg overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents the overlay from closing
            handlePrevImage();
          }}
          className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
        >
          <FaArrowLeft />
        </button>

        {/* Main Image Container */}
        <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
          <Image
            src={overlayImages[currentImageIndex]}
            alt={`Slider Image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="contain" // Changed to object-contain for proper scaling
            className="rounded-lg"
            loading="lazy"
          />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents the overlay from closing
            handleNextImage();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PropertyImgs;
