'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TestimonialCard from '@/app/components/testimonial/TestimonialCard';
import { testimonials } from '@/utils/testimonialsData';
import Container from '../container/Container';
import Button from '../buttons/Button';
import Heading from '../Heading';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/styles/animations';

const TestimonialContainer: React.FC = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPageSize(1);
      } else if (window.innerWidth < 768) {
        setPageSize(2);
      } else {
        setPageSize(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / testimonials.length;
      scrollRef.current.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, testimonials.length, pageSize]);



  const showPrev = currentIndex > 0;
  const showNext = currentIndex < testimonials.length - pageSize;

  const handleClick = () => {
    router.push('/testimonials');
  };

  return (
    <Container>
       <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show" >

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <Heading title="What our customers are saying?" start />
        <div className="hidden md:flex ml-4 mb-auto">
          <Button label="More Comments" onClick={handleClick} />
        </div>
      </div>

      {/* Large devices grid */}
      <div
        className="relative flex overflow-hidden mt-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={scrollRef}
          className="flex gap-5"
          animate={{ x: isHovered ? 0 : '-100%' }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              ease: 'linear', 
              duration: 30 
            } 
          }}
         
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div key={index} className="flex-shrink-0 w-[100%] sm:w-[390px] md:w-[380px] lg:w-[300px] xl:w-[330px]">
              <TestimonialCard
                name={t.name}
                date={t.date}
                rating={t.rating}
                testimonialTitle={t.testimonialTitle}
                testimonial={t.testimonial}
              />
            </div>
          ))}
        </motion.div>
       
      </div>

      <div className="md:hidden flex justify-center mt-5 px-6">
        <Button label="More Comments" onClick={handleClick} />
      </div>
        </motion.div>
    </Container>
  );
};

export default TestimonialContainer;
