// components/blog/BlogHome.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import Container from '../container/Container';
import Heading from '../Heading';
import Button from '../buttons/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BlogCard from './BlogCard';
import { fadeIn } from '@/app/styles/animations';
import { motion } from 'framer-motion';

interface Props {
  posts: Post[];
  title?: string;
}

const BlogHome: React.FC<Props> = ({ posts, title = 'Latest Blog Posts' }) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageSize, setPageSize] = useState(3);

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
      const scrollWidth = scrollRef.current.scrollWidth / posts.length;
      scrollRef.current.scrollTo({
        left: currentIndex * scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, posts.length, pageSize]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - pageSize, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + pageSize, posts.length - pageSize));
  };

  const showPrev = currentIndex > 0;
  const showNext = currentIndex < posts.length - pageSize;

  const handleClick = () => {
    router.push('/blog');
  };

  return (
    <Container>
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show" >

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <Heading title={title} start />
        <div className="hidden md:flex ml-4 mb-auto">
          <Button label="More Posts" onClick={handleClick} />
        </div>
      </div>

      {/* Large devices grid */}
      <div className="hidden md:grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {/* Small devices scrolling */}
      <div className="relative flex overflow-x-auto p-6 md:hidden items-center justify-center">
        {showPrev && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
            aria-label="Previous post"
          >
            <FaChevronLeft size={14} />
          </button>
        )}
        <div ref={scrollRef} className="flex-shrink-0 w-[100%] sm:w-[390px] md:w-[380px] lg:w-[300px] xl:w-[330px]">
          {posts.slice(currentIndex, currentIndex + pageSize).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
        {showNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
            aria-label="Next post"
          >
            <FaChevronRight size={14} />
          </button>
        )}
      </div>

      <div className="md:hidden flex justify-center mt-5 px-6">
        <Button label="More Posts" onClick={handleClick} />
      </div>
        </motion.div>
    </Container>
  );
};

export default BlogHome;
