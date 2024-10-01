'use client';
import React from 'react';
import { fadeIn, slideIn } from '../styles/animations';
import { motion } from "framer-motion"; 

interface Step {
  number: number;
  title: string;
  description: string;
}

interface RoadmapProps {
  steps: Step[];
}

const Roadmap: React.FC<RoadmapProps> = ({ steps }) => {
  return (
    <motion.div
      variants={fadeIn("top", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show" 
      className="relative py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 rounded-lg"
    >
      {/* Container */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-6 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-1 bg-orange-500"></div>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} items-center`}
            >
              {/* Circle for the step number */}
              <div className="absolute left-4 md:left-8 lg:left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center z-10">
                <div className="relative bg-orange-500 text-white w-full h-full flex items-center justify-center rounded-full font-bold text-lg shadow-md">
                  {step.number}
                  {/* Background pattern for extra flair */}
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-full"></div>
                </div>
              </div>
              
              {/* Card content */}
              <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                initial="hidden"
                whileInView="show"
                className="w-full lg:w-1/2 flex justify-end lg:px-10 mb-6 lg:mb-0 px-6"
              >
                <div className="w-full max-w-sm">
                  <div className={`rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white ml-4' : 'bg-white dark:bg-gray-800 dark:text-white text-gray-800 ml-4 md:mr-4'}`}>
                    <h3 className="text-base lg:text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm lg:text-base leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Roadmap;
