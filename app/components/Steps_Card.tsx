'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../styles/animations';

export interface StepCardProps {
  step_number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Steps_Card: React.FC<StepCardProps> = ({ step_number, title, description, icon }) => {
  return (
    <motion.div
    variants={fadeIn('right', 'spring')}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}

    className="relative flex flex-col items-start bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 h-58  dark:bg-CardDark">
      {/* Circle with Icon */}
      <div className="absolute -top-6 left-6 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      {/* Card Content */}
      <div className="pt-8 ">
        <div className="font-light text-xs mb-2">{step_number}</div>
        <h3 className="text-md font-bold mb-2">{title}</h3>
        <p className="text-gray-700 text-sm dark:text-blueCardSubTitle">{description}</p>
      </div>
    </motion.div>
  );
};

export default Steps_Card;
