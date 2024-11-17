"use client"

import { useRef, ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ScrollContainerProps {
  children: ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth scrollbar-hide space-x-4"
      >
        {children}
      </div>
      {(Array.isArray(children) && children.length > 3) && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default ScrollContainer;
