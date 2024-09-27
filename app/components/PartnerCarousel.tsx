"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeIn } from '../styles/animations';
import {partners} from '@/utils/partnersData'


const PartnerCarousel = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-10 md:py-14">
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show" >

      <div className='container'>

        {/* Flexbox wrapper for heading and carousel */}
        <div className="flex items-center gap-5">
        <div className="flex-1 md:flex-none">
            {/* Heading */}
            <h2 className='font-bold'>PARTNER WITH DUBAI'S LEADING DEVELOPERS</h2>
          </div>

          {/* Carousel section */}
          <div
            className="flex flex-1 overflow-hidden [maskImage:linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex flex-none gap-14 pr-14 -translate-x-1/2"
              initial={{ translateX:"-50%"}}
              animate={{ translateX: "0"}}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] p-3 cursor-pointer"
                  onClick={() => router.push(partner.path)}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-gray-200 transform transition-transform hover:scale-105">
                    <Image
                      src={partner.img}
                      alt={`Partner ${index + 1}`}
                      className="w-full h-full "
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
        </motion.div>
    </section>
  );
};

export default PartnerCarousel;
