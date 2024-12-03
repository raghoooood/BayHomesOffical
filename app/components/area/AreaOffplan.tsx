"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "../container/Container";
import Button from "../buttons/Button";
import Heading from "../Heading";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FilterPurpose from "../filters/FilterPurpose";
import { fadeIn } from "@/app/styles/animations";
import { motion } from "framer-motion";
import PropCard from "@/app/components/property/PropCard";

interface Props {
  _id: string;
  images: {
    backgroundImage: string;
  };
  title: string;
  price: number;
  propertyType: string;
  numOfbathrooms: number;
  location: {
    city: string;
    state: string;
    street: string;
  };
  numOfrooms: number;
  area: {
    areaName: string;
  };
  size: string;
  purpose: string;
}

interface AreaOffplanProps {
  initialProperties: Props[];
  title?: string;
}

const AreaOffplan: React.FC<AreaOffplanProps> = ({ initialProperties, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(3);
  const [propertyPurpose, setPropertyPurpose] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPageSize(1);
      } else if (window.innerWidth < 768) {
        setPageSize(2);
      } else {
        setPageSize(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hasSaleProperties = initialProperties.some(property => property.purpose?.toLowerCase() === 'sale');
    if (!propertyPurpose) {
      setPropertyPurpose(hasSaleProperties ? 'sale' : 'rent');
    }
  }, [initialProperties, propertyPurpose]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / initialProperties.length;
      scrollRef.current.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, initialProperties.length, pageSize]);

  const filteredProperties = useMemo(
    () => initialProperties.filter(property =>
      propertyPurpose ? property.purpose?.toLowerCase() === propertyPurpose : true
      
    ),
    [initialProperties, propertyPurpose]
  );

  const propertiesToShow = useMemo(
    () => filteredProperties.slice(currentIndex, currentIndex + pageSize),
    [filteredProperties, currentIndex, pageSize]
  );

  const propertyCounts = useMemo(() => {
    return initialProperties.reduce((acc, property) => {
      const purpose = property.purpose.toLowerCase();
      if (!acc[purpose]) {
        acc[purpose] = 0;
      }
      acc[purpose]++;
      return acc;
    }, {} as { [key: string]: number });
  }, [initialProperties]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + pageSize, filteredProperties.length - pageSize));
  };

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < filteredProperties.length - pageSize;

  return (
    <Container>
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
      >
        <Heading title={title ? `Properties for ${propertyPurpose} in ${title}` : "All Properties"} start />
        
        {/* Align filter and button to the left */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-4">
          <FilterPurpose
            propertyPurpose={propertyPurpose}
            setPropertyPurpose={setPropertyPurpose}
            propertyCounts={propertyCounts }
          />
          
          {/* Button aligned to the left */}
          <div className="hidden md:flex ml-4 mb-5">
            <Button label="More Properties" onClick={() => router.push('/all-property')} />
          </div>
        </div>
  
        {/* Align property cards to the left */}
        <div className="relative flex overflow-x-auto w-full py-4 items-start">
          {showPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            >
              <FiChevronLeft size={24} />
            </button>
          )}
  
          <div ref={scrollRef} className="flex space-x-4 md:space-x-6 justify-start w-full">
            {propertiesToShow.map((property) => (
              <div key={property._id} className="flex-shrink-0 w-full sm:w-[42vw] md:w-[28vw] lg:w-[20vw]">
                 <PropCard
                  _id={property._id}
                  images={property.images}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  propertyType={property.propertyType}
                  numOfrooms={property.numOfrooms}
                  numOfbathrooms={property.numOfbathrooms}
                  size={property.size}
                  area={property.area}
                />
              </div>
            ))}
          </div>
  
          {showNext && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            >
              <FiChevronRight size={24} />
            </button>
          )}
        </div>
  
        {/* Additional button for mobile view */}
        <div className="flex flex-col items-center mt-5 space-y-4">
          <div className="md:hidden w-full flex justify-center">
            <Button label="More Properties" onClick={() => router.push('/all-property')} />
          </div>
        </div>
      </motion.div>
    </Container>
  );
  
};

export default AreaOffplan;
