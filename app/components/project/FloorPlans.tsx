'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Container from '../container/Container';
import Heading from '../Heading';
import { capitalizeFirstLetter } from '@/lib/utils';

// Define the interface for individual floor plans
interface Props {
  floorType: string;
  floorSize: string;
  floorImage: string;
  numOfrooms: number;
}

// Define the interface for the floorPlans array
interface FloorPlansProps {
  floorPlans: Props[] | undefined;
}

const FloorPlans: React.FC<FloorPlansProps> = ({ floorPlans }) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelectedFloor(index);
  };

  // Check if floorPlans is undefined or empty
  if (!floorPlans || floorPlans.length === 0) {
    return <div>No floor plans available.</div>;
  }

  return (
    <Container>
      <div className="container mx-auto py-10">
        <Heading title="Floor Plans" start />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Floor List */}
          <div className="flex flex-col space-y-4">
            {floorPlans.map((floor, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 border-b-2 px-10 w-60 ${
                  selectedFloor === index ? 'border-orange-500' : ''
                }`}
                onClick={() => handleClick(index)}
              >
                 <h3 className={`text-2xl font-light ${selectedFloor === index ? 'text-orange-500' : 'text-gray-800'}`}>
                 {floor.numOfrooms} {floor.numOfrooms === 1 ? 'Bedroom' : 'Bedrooms'} {capitalizeFirstLetter(floor.floorType)}s
                </h3>
                <p className="text-gray-500 text-sm">{floor.floorSize} sqft</p>
              </div>
            ))}
          </div>

          {/* Right Side: Selected Floor Image */}
          <div className="relative">
            <Image
              src={floorPlans[selectedFloor].floorImage}
              alt={`Floor Plan - ${floorPlans[selectedFloor].floorType}`}
              className="w-full h-32 rounded-lg shadow-lg"
              width={500}
              height={300}
              layout="responsive" 
              unoptimized
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FloorPlans;
