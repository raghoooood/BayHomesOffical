'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for dynamic routing
import footerData from '@/utils/footerData';
import footerBg from '@/assets/images/footerBG.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { footerVariants } from '../styles/animations';

const Footer: React.FC = () => {
  const router = useRouter();

   const handleLinkClick = (path: string, filters?: { [key: string]: string }) => {
    if (filters) {
      const queryString = new URLSearchParams(filters).toString();
      router.push(`${path}?${queryString}`);
    } else {
      router.push(path);
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className="relative"
    >
      <Image
        src={footerBg}
        alt="Footer background"
        layout="fill"
        className="w-full h-screen object-cover object-center"
        priority={false} // Remove priority if the image is not above the fold
      />
      <div className="relative z-10 p-6 sm:p-10 text-white">
        {/* Row 1 */}
        <div className="py-[20px] sm:py-[40px] px-2">
          {/* Menu */}
          <div className="flex flex-col sm:flex-row justify-start sm:justify-start w-full">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full">
              {footerData.map((item) => (
                <li key={item.title} className="group text-left text-xs sm:text-sm">
                  <span className="py-1 uppercase font-semibold">{item.title}</span>
                  <ul className="mt-1 space-y-1 text-xs sm:text-sm">
                    {item.options.map((option, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleLinkClick(option.path, option.filters)}
                          className="block hover:text-orange-500"
                        >
                          {option.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="py-4 px-4 border-t-2 border-[#EDEFF2] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start gap-3 mb-2 sm:mb-0">
            <Link href="https://www.facebook.com/Alsayyahgroup/" target="_blank">
              <FaFacebookF className="text-blue-600 hover:text-blue-800 text-lg sm:text-xl" />
            </Link>
            <Link href="https://www.instagram.com/alsayyahgroup/" target="_blank">
              <FaInstagram className="text-pink-500 hover:text-pink-700 text-lg sm:text-xl" />
            </Link>
            <Link href="https://www.linkedin.com/company/alsayyahgroup" target="_blank">
              <FaLinkedinIn className="text-blue-700 hover:text-blue-900 text-lg sm:text-xl" />
            </Link>
          </div>

          {/* Centered Content */}
          <div className="flex flex-col items-center text-xs sm:text-sm">
            <Link
              href="https://alsayyah.com/"
              target="_blank"
              className="font-semibold text-center text-bluePText hover:text-orange-500 dark:text-white mb-1"
            >
              &copy; 2024 Al-Sayyah Group. All Rights Reserved.
            </Link>
          </div>

          {/* Terms and Privacy */}
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end text-xs sm:text-sm">
            <Link
              href="#"
              className="font-semibold text-center text-bluePText hover:text-orange-500 dark:text-white"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="font-semibold text-center text-bluePText hover:text-orange-500 dark:text-white"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
