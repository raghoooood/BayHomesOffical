'use client';

import React from 'react';
import ContactForm from '@/app/components/forms/ContactForm';
import Image from 'next/image';
import bg from '@/assets/images/bg3.jpg';

const ContactProject: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Background image"
          fill
          className="object-cover  rounded-xl shadow-lg"
        />
      </div>

      {/* White Overlay */}
      <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-50 z-1  rounded-xl shadow-lg"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center w-full h-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-6 sm:mb-8 lg:mb-16">
          {/* Text Section */}
          <div className="flex flex-col items-center lg:items-start justify-center lg:pr-8 mb-4 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-gray-50 font-bold text-center lg:text-left">
              Speak with our Real Estate Specialists Today
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center lg:text-left">
              Get in touch for tailored guidance from our expert team. We’re committed to assisting you through each phase of your journey.
            </p>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm sm:max-w-md">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold text-center lg:text-left pl-0 lg:pl-5">
                Real Estate Inquiry Form
              </h2>
              <p className="text-gray-600 dark:text-gray-300 px-2 sm:px-5 mt-2 sm:mt-3 md:mt-4 text-center lg:text-left pb-4">
                As the complexity of buildings increases, our expertise can help navigate your options.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactProject;
