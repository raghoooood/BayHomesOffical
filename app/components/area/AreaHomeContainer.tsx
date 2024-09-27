'use client';

import React, { useState, useEffect } from "react";
import AreaHome from './AreaHome';
import { AreaCardData } from '@/utils/areaCardData';
import Heading from '../Heading';
import Breadcrumb from '../Breadcrumb';
import FilterPurpose from '../filters/FilterPurpose';
import { fadeIn } from "@/app/styles/animations";
import { motion } from 'framer-motion';

interface AreaProps {
  areas: AreaCardData[];
}


const AreaHomeContainer: React.FC<AreaProps> = ({ areas }) => {

  const [propertyPurpose, setPropertyPurpose] = useState<string>(''); // Default to "buy"


  return (
    <motion.div
    variants={fadeIn("top", "tween", 0.2, 1)}
    initial="hidden"
    whileInView="show"  className="p-2">
        <Heading title='Popular Properties in Dubai Communities' start/>
      {/* Grid for AreaCard Components */}
      {/* <FilterPurpose
          propertyPurpose={''}
          setPropertyPurpose={''}
        />     */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center ">
        {areas.map((card) => (
          <div key={card._id}>
            <AreaHome
              _id={card._id}
              areaName={card.areaName}
            />
          </div>
        ))}
      </div>
      

    </motion.div>
  );
};

export default AreaHomeContainer;
