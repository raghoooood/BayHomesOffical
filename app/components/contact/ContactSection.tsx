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
    <div className="bg-gray-300 p-3 rounded-full shadow-lg">
      <Icon className="w-6 h-6 text-black-500 dark:text-white" />
    </div>
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-100 font-bold hover:text-orange-500 hover:underline"
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
        <div className="relative px-5 sm:px-20 mt-5 bg-gray-100 dark:bg-gray-500 w-full  h-full">
          <div className="p-4 md:p-6 lg:p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8 lg:mb-16">
              {/* Left Section */}
              <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold dark:text-white uppercase">
                  Bay Homes Real Estate
                </h1>
                <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 text-center lg:text-left dark:text-gray-100">
                  Your journey to finding the perfect home starts with us.
                </p>

                {/* Contact info for larger screens */}
                <div className="hidden lg:grid pt-7 gap-4">
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
                <div className="w-full max-w-md">
                  <h1 className="text-2xl md:text-3xl lg:text-2xl text-gray-800 font-bold pl-5 dark:text-white text-center lg:text-left">
                    Contact Bay Homes Real Estate
                  </h1>
                  <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 pb-4 pl-5 dark:text-white text-center lg:text-left">
                    Let us guide you home!
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Contact info for mobile screens */}
              <div className="pt-7 grid gap-4 lg:hidden">
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
