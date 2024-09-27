"use client";
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { services } from '@/utils/servicesData';
import Container from '../container/Container';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '@/app/styles/animations';

const ServicesContainer: FC = () => {
  const router = useRouter();

  return (
    <Container>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show" className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn('right', 'spring', index * 0.3, 0.85)} // Adjusted delay and duration
              className="p-5 bg-white dark:bg-gray-600 dark:border-gray-600 rounded-[1.7rem] shadow-lg flex items-center sm:flex-col sm:text-center cursor-pointer md:max-w-[24rem]"
              onClick={() => router.push(service.link)}
            >
              <Image 
                src={service.icon} 
                alt={service.title} 
                width={64} 
                height={64} 
                className="mb-4" 
              />
              <div className="ml-5 sm:ml-0">
                <h5 className="text-md font-bold uppercase tracking-wider mb-2 transition-transform hover:text-orange-500">
                  {service.title}
                </h5>
                <p className="text-gray-600 text-xs dark:text-gray-100">{service.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default ServicesContainer;
