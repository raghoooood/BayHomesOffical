'use client';

import React from 'react';
import ContactForm from '@/app/components/forms/ContactForm';
import Image from 'next/image';
import bg from '@/assets/images/bg3.jpg';

const ContactProject: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={bg}
          alt="Background image"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center w-full h-full p-6 lg:p-8 rounded-xl bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
          {/* Text Section */}
          <div className="flex flex-col items-center lg:items-start justify-center lg:pr-8 mb-4 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-gray-100 font-bold text-center lg:text-left">
              Speak with our Real Estate Specialists Today
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 md:mt-4 lg:mt-5 text-center lg:text-left">
              Get in touch for tailored guidance from our expert team. We’re committed to assisting you through each phase of your journey.
            </p>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md">
              <h2 className="text-2xl md:text-3xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold text-center lg:text-left pl-0 lg:pl-5">
                Real Estate Inquiry Form
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 md:mt-3 lg:mt-4 text-center lg:text-left pb-4">
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
