"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import PropCard from "@/app/components/property/PropCard";
import Container from "../container/Container";
import Button from "../buttons/Button";
import Heading from "../Heading";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FilterClassification from "../filters/FilterClassification";

interface Props {
  _id: string;
  images: {
    backgroundImage: string;
  };
  title: string;
  price: number;
  propertyType:string;
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
  classification: string;
  status: string;
}

interface LatestPropProps {
  initialProperties: Props[];
  title?: string;
}

const SaleGuidContent: React.FC<LatestPropProps> = ({ initialProperties}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(3);
  const [propertyClassification, setPropertyClassification] = useState('residential');
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
      propertyClassification ? property.classification?.toLowerCase() === propertyClassification 
      && property.status==='active': true
    ),
    [initialProperties, propertyClassification]
  );

  const propertiesToShow = useMemo(
    () => filteredProperties.slice(currentIndex, currentIndex + pageSize),
    [filteredProperties, currentIndex, pageSize]
  );

  const propertyCounts = useMemo(() => {
    return initialProperties.reduce((acc, property) => {
      const classification = property.classification.toLowerCase();
      if (!acc[classification]) {
        acc[classification] = 0;
      }
      acc[classification]++;
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
      <Heading title='Properties for sale in Dubai' start />      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <FilterClassification
          propertyClassification={propertyClassification}
          setPropertyClassification={setPropertyClassification} 
          propertyCounts={propertyCounts}        />
        <div className="hidden md:flex ml-4 mb-5">
          <Button label="More Properties" onClick={() => router.push(`/all-property?purpose=sale`)} />
        </div>
      </div>
      <div className="relative flex overflow-x-auto w-full py-4">
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
    <div key={property._id} className="flex-shrink-0 w-[100%] sm:w-[460px] md:w-[360px] lg:w-[400px] xl:w-[400px]">
              <PropCard
                _id={property._id}
                images={property.images}
                title={property.title}
                price={property.price}
                propertyType={property.propertyType}
                location={property.location}
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
      <div className="flex flex-col items-center mt-5 space-y-4">
        <div className="md:hidden w-full flex justify-center">
          <Button label="More Properties" onClick={() => router.push(`/all-property?purpose=sale`)} />
        </div>
      </div>
    </Container>
  );
};

export default SaleGuidContent;
