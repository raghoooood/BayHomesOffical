"use client";

import React, { useState, useRef } from "react";
import PropCard from "./PropCard";
import Container from "../container/Container";
import { FaChevronLeft, FaChevronRight, FaLongArrowAltRight } from "react-icons/fa";
import ButtonProp from "../buttons/ButtonProp";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  _id: string;
  images: {
    backgroundImage: string;
  };
  title: string;
  price: number;
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
  featured: boolean;
  projectName: string;
}

interface LuxuryPropProps {
  initialProperties: Props[];
}

const LuxuryProp: React.FC<LuxuryPropProps> = ({ initialProperties }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    const { current } = scrollRef;
    if (current) {
      const scrollWidth = current.children[currentIndex].clientWidth;
      const newIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(initialProperties.length - 1, currentIndex + 1);

      setCurrentIndex(newIndex);
      current.scrollTo({
        left: newIndex * scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <div className="bg-[#F9F9F9] ">
        <div className="flex flex-col lg:flex-row p-4 md:p-3 lg:p-3 m-4 lg:justify-between lg:items-center mb-8 lg:mb-16 ">
          <div className="flex flex-col items-center lg:items-start lg:w-1/3 mb-4 lg:mb-0 px-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800">
              Discover Our Finest Selection
            </h1>
            <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 text-center lg:text-left">
              Explore our signature collection of unparalleled luxury properties.
            </p>
            <div className="pt-7 flex items-center">
              <ButtonProp
                label="Discover"
                onClick={() => router.push(`/all-property?featured=true`)}
                icon={FaLongArrowAltRight}
                small
              />
            </div>
          </div>
          <div className="relative lg:w-2/3">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-4 scrollbar-hidden"
            >
              {initialProperties
                .filter(
                  (property) =>
                    /* property.projectName?.includes("180") ||
                    property.projectName?.includes("BLVD") */
                    property.featured === true
                )
                .map((property) => (
                  <div
                    className="flex-shrink-0 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-full"
                    key={property._id}
                  >
                    <PropCard
                      _id={property._id}
                      images={property.images}
                      title={property.title}
                      price={property.price}
                      location={property.location}
                      numOfrooms={property.numOfrooms}
                      numOfbathrooms={property.numOfbathrooms}
                      size={property.size}
                      area={property.area}
                    />
                  </div>
                ))}
            </div>
            <>
              <div className="absolute inset-y-1/2 left-0 flex items-center space-x-2 pl-2 lg:pl-4">
                <FaChevronLeft
                  className="text-gray-800 text-2xl cursor-pointer bg-white rounded-full p-2 hover:text-orange-500"
                  onClick={() => scroll("left")}
                />
              </div>
              <div className="absolute inset-y-1/2 right-0 flex items-center space-x-2 pr-2 lg:pr-4">
                <FaChevronRight
                  className="text-gray-800 text-2xl cursor-pointer bg-white rounded-full p-2 hover:text-orange-500"
                  onClick={() => scroll("right")}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LuxuryProp;
