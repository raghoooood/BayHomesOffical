'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerData from '@/utils/footerData';
import footerBg from '@/assets/images/footer.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from "framer-motion";
import { footerVariants } from '../styles/animations';

// Import your project fetching function
import { getProjectNames } from '@/lib/actions/project.action';

const Footer: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]); // Set an empty array by default

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { projects } = await getProjectNames();  // Fetch project names from backend
        setProjects(projects || []); // Ensure it's an array
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Map over footerData and dynamically insert the "Projects" section
  const footerItems = footerData.map(item => {
    if (item.title === 'off plan') {
      return {
        ...item,
        options: [
          ...item.options,
          ...projects.map(project => ({
            name: project.projectName,
            path: `/projects/${encodeURIComponent(project.projectName)}`
          })),
        ],
      };
    }
    return item;
  });

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
        fill
        priority={false}
        style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(1px)' }}
        className="w-full h-screen"
      />
      <div className="relative z-10 p-6 sm:p-10 text-white">
        {/* Row 1 */}
        <div className="py-[20px] sm:py-[40px] px-2">
          {/* Menu */}
          <div className="flex flex-col sm:flex-row justify-start sm:justify-start w-full">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full">
              {footerItems.map((item) => (
                <li key={item.title} className="group text-left text-xs sm:text-sm">
                  <h1 className="py-1 uppercase font-semibold">{item.title}</h1>
                  <ul className="mt-1 space-y-1 text-xs sm:text-sm">
                    {item.options.map((option, index) => (
                      <li key={index}>
                        <Link href={option.path} className="block hover:text-orange-500">
                          {option.name}
                        </Link>
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
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
