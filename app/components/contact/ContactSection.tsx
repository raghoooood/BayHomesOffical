'use client';

import React from 'react';
import Container from "../container/Container";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from '@/app/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/styles/animations';

const ContactSection: React.FC = () => {
  return (
    <Container>
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
      >
        <div className="relative px-10 sm:px-28 mt-5 bg-gray-100 dark:bg-gray-500 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-full ">
          <div className="p-4 md:p-6 lg:p-8 rounded-lg ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
              <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold dark:text-white uppercase">
                  Bay Homes Real Estate
                </h1>
                <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 lg:text-left dark:text-gray-100 ">
                Your journey to finding the perfect home starts with us. Whether you're exploring Dubai's luxury property market or seeking your next investment, our dedicated team is just a call away.                </p>

                <div className="hidden lg:grid lg:pt-7 lg:gap-4 lg:grid-cols-1 lg:w-full">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaWhatsapp className="text-green-500 w-6 h-6" />
                    </div>
                    <a
                      href="https://wa.me/971509555757"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      WhatsApp: +971509555757
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaPhone className="text-black-500 w-6 h-6" />
                    </div>
                    <a
                      href="tel:+97143931996"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      Phone: +97143931996
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaEnvelope className="text-black-500 w-6 h-6" />
                    </div>
                    <a
                      href="mailto:admin@bayhomesae.com"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      Email: admin@bayhomesae.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end">
                <div className="w-full max-w-md">
                  <h1 className="text-2xl md:text-3xl lg:text-2xl text-gray-800 font-bold pl-5 dark:text-white">
                    Contact Bay Homes Real Estate
                  </h1>
                  <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 lg:text-left pb-4 sm:pl-5 dark:text-white">
                    Let us guide you home!
                  </p>
                  <ContactForm />
                </div>

                <div className="pt-7 grid grid-cols-1 gap-4 mt-8 lg:hidden">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaWhatsapp className="text-green-500 w-6 h-6" />
                    </div>
                    <a
                      href="https://wa.me/00971509555757"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      WhatsApp: +971509555757
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaPhone className="text-black-500 w-6 h-6" />
                    </div>
                    <a
                      href="tel:+97143931996"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      Phone: +97143931996
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                      <FaEnvelope className="text-black-500 w-6 h-6" />
                    </div>
                    <a
                      href="mailto:admin@bayhomesae.com"
                      className="text-gray-600 dark:text-gray-100 hover:text-orange-500 hover:underline"
                    >
                      Email: admin@bayhomesae.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ContactSection;
