"use client";

import React from 'react';
import { FaUserCircle, FaQuoteRight, FaStar } from 'react-icons/fa';

interface TestimonialCardProps {
  name: string;
  date: string;
  testimonialTitle: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, date, testimonialTitle, testimonial, rating }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 flex flex-col text-gray-800 dark:text-white"> 
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <FaUserCircle className="text-gray-500 dark:text-gray-400 text-4xl mr-3" /> 
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p> 
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-yellow-500 ${index < rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                />
              ))}
            </div>
          </div>
        </div>
        <FaQuoteRight className="text-gray-300 dark:text-gray-500 text-2xl" /> {/* Quote icon color adjustment */}
      </div>
      <div className="flex items-center mt-2">
        <h2 className="text-gray-700 dark:text-gray-300 mt-4 font-bold text-lg">{testimonialTitle}</h2> {/* Title color adjustment */}
      </div>
      <p className="text-gray-700 dark:text-gray-200 mt-4">{testimonial}</p> {/* Testimonial text color adjustment */}
    </div>
  );
};

export default TestimonialCard;
