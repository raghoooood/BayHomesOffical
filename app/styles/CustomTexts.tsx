'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '@/app/styles/animations';

// Optimized TypingText (standard, responsive)
type TypingTextProps = {
  title: string;
  textStyles?: string;
};

export const TypingText = memo(({ title, textStyles }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    initial="hidden"
    animate="show"
    className={`font-normal text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span
        key={index}
        variants={textVariant2}
        transition={{ duration: 0.02, delay: index * 0.015 }} // Faster transition
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
));

// Optimized TitleText (standard, responsive)
interface TitleTextProps {
  title: string;
  textStyles?: string;
}

export const TitleText = memo(({ title, textStyles = '' }: TitleTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold text-[30px] sm:text-[40px] md:text-[50px] lg:text-[64px] xl:text-[72px] text-gray-900 dark:text-white ${textStyles}`}
    transition={{ duration: 0.06 }} // Speed up title appearance
  >
    {title}
  </motion.h2>
));

// Optimized LargeTypingText (responsive)
export const LargeTypingText = memo(({ title, textStyles = '' }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    initial="hidden"
    animate="show"
    className={`mt-[8px] font-bold text-[36px] sm:text-[40px] md:text-[44px] lg:text-[50px] xl:text-[64px] drop-shadow-2xl  ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span
        key={index}
        variants={textVariant2}
        transition={{ duration: 0.02, delay: index * 0.01 }} // Faster typing effect
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
));

// Optimized SmallTitleText (responsive)
export const SmallTitleText = memo(({ title, textStyles = '' }: TitleTextProps) => (
  <motion.h3
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-semibold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]  ${textStyles}`}
    transition={{ duration: 0.03, delay: 0.015 }} // Faster transition
  >
    {title}
  </motion.h3>
));
