"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "../container/Container";
import Button from "../buttons/Button";
import Heading from "../Heading";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FilterClassification from "../filters/FilterClassification";
import { fadeIn } from "@/app/styles/animations";
import { motion } from "framer-motion"; 
import PropCard from "./PropCard";
import GridProject from "../project/GridProject";

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
  classification: string;
}

interface PropsProj {
  _id: string;
  images: {
    backgroundImage: string;
  };
  projectName: string;
  startPrice: number;
  location: string;
  rooms: {
    min: number;
    max: number;
  };
  area?: {
    areaName: string;
  };
  developer: {
    developerName: string;
  }
  size?: string;
  status?: string;
}

interface LatestPropProps {
  initialProperties: Props[];
  intialProjects: PropsProj[];
  title?: string;
}

const LatestProp: React.FC<LatestPropProps> = ({ intialProjects, initialProperties, title = 'Latest Properties' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(3);
  const [propertyClassification, setPropertyClassification] = useState('residential');
  const [status, setStatus] = useState('active');
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPageSize(1); // Small devices
      } else if (window.innerWidth < 1024) {
        setPageSize(2); // Medium devices
      } else {
        setPageSize(3); // Large devices
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / (propertyClassification === 'off plan' ? intialProjects.length : initialProperties.length);
      scrollRef.current.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, initialProperties.length, intialProjects.length, pageSize, propertyClassification]);




  
   const filteredProperties = useMemo(() => {
    if (propertyClassification === 'off plan') {
      return intialProjects; // Show projects if classification is 'off plan'
    }
    return initialProperties.filter(property =>
       status && propertyClassification ? property.classification?.toLowerCase() === propertyClassification 
      : true
    );
  }, [initialProperties, intialProjects, propertyClassification]); 

  const propertiesToShow = useMemo(
    () => filteredProperties.slice(currentIndex, currentIndex + pageSize),
    [filteredProperties, currentIndex, pageSize]
  );

  const propertyCounts = useMemo(() => {
    const counts = initialProperties.reduce((acc, property) => {
      const classification = property.classification.toLowerCase();
      if (!acc[classification]) {
        acc[classification] = 0;
      }
      acc[classification]++;
      return acc;
    }, {} as { [key: string]: number });
  
    if (intialProjects.length > 0) {
      counts['off plan'] = intialProjects.length;
    }
  
    return counts;
  }, [initialProperties, intialProjects, intialProjects]);

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
        <Heading title={title} start />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <FilterClassification
            propertyClassification={propertyClassification}
            setPropertyClassification={setPropertyClassification}
            propertyCounts={propertyCounts}
          />
          <div className="hidden md:flex ml-4 mb-5">
            <Button label="More Properties" onClick={() => router.push('/all-property')} />
          </div>
        </div>

        <div className="relative flex w-full py-4 overflow-x-hidden">
          {showPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            >
              <FiChevronLeft size={24} />
            </button>
          )}
          <div ref={scrollRef} className="flex space-x-4 md:space-x-6 w-full overflow-x-auto">
            {propertiesToShow.map((property) => (
              <div key={property._id} className="flex-shrink-0 w-[100%] sm:w-[390px] md:w-[380px] lg:w-[300px] xl:w-[330px]">
                {propertyClassification === 'off plan' ? (
                  <GridProject
                    _id={(property as PropsProj)._id}
                    images={(property as PropsProj).images}
                    projectName={(property as PropsProj).projectName}
                    startPrice={(property as PropsProj).startPrice}
                    location={(property as PropsProj).location}
                    rooms={(property as PropsProj).rooms}
                    area={(property as PropsProj).area}
                    developer={(property as PropsProj).developer}
                    size={(property as PropsProj).size}
                    
                  />
                ) : (
                  <PropCard
                    _id={(property as Props)._id}
                    images={(property as Props).images}
                    title={(property as Props).title}
                    price={(property as Props).price}
                    location={(property as Props).location}
                    propertyType={(property as Props).propertyType}
                    numOfrooms={(property as Props).numOfrooms}
                    numOfbathrooms={(property as Props).numOfbathrooms}
                    size={(property as Props).size}
                    area={(property as Props).area}
                  />
                )}
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
            <Button label="More Properties" onClick={() => router.push('/all-property')} />
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default LatestProp;
