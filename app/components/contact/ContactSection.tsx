'use client';

import React from 'react';
import Container from "../container/Container";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from '@/app/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/styles/animations';

const ContactSection: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  // Reusable contact item
  const ContactItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <div className="flex items-center space-x-4">
      <div className="bg-gray-500 p-4 rounded-full shadow-md">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-100 font-semibold hover:text-orange-500 hover:underline transition duration-300"
      >
        {label}
      </a>
    </div>
  );

  return (
    <Container>
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
      >
        {/* Use max-w-full to ensure no horizontal overflow */}
        <div className="relative px-5 sm:px-10 md:px-16 mt-10 bg-gray-50 dark:bg-gray-800 w-full h-full">
          <div className="p-6 md:p-8 lg:p-12 rounded-lg max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              
              {/* Left Section */}
              <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white font-extrabold uppercase">
                  Bay Homes Real Estate
                </h1>
                <p className="text-gray-600 mt-4 text-center lg:text-left dark:text-gray-300">
                  Your journey to finding the perfect home starts with us.
                </p>

                {/* Contact info for larger screens */}
                <div className="hidden lg:flex flex-col space-y-6 mt-8">
                  <ContactItem
                    href={`https://wa.me/${whatsappNumber}`}
                    icon={FaWhatsapp}
                    label={`WhatsApp: ${whatsappNumber}`}
                  />
                  <ContactItem
                    href={`tel:${phoneNumber}`}
                    icon={FaPhone}
                    label={`Phone: ${phoneNumber}`}
                  />
                  <ContactItem
                    href={`mailto:${emailAddress}`}
                    icon={FaEnvelope}
                    label={`Email: ${emailAddress}`}
                  />
                </div>
              </div>

              {/* Right Section - Contact Form */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 lg:p-8">
                  <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-semibold text-center lg:text-left">
                    Contact Bay Homes Real Estate
                  </h2>
                  <p className="text-gray-600 mt-2 md:mt-3 text-center lg:text-left dark:text-gray-300">
                    Let us guide you home!
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Contact info for mobile screens */}
              <div className="flex flex-col space-y-6 mt-8 lg:hidden">
                <ContactItem
                  href={`https://wa.me/${whatsappNumber}`}
                  icon={FaWhatsapp}
                  label={`WhatsApp: ${whatsappNumber}`}
                />
                <ContactItem
                  href={`tel:${phoneNumber}`}
                  icon={FaPhone}
                  label={`Phone: ${phoneNumber}`}
                />
                <ContactItem
                  href={`mailto:${emailAddress}`}
                  icon={FaEnvelope}
                  label={`Email: ${emailAddress}`}
                />
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ContactSection;
