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
    className={`font-normal text-[18px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-secondary-white ${textStyles}`}
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
    className={`mt-[8px] font-bold text-[32px] sm:text-[48px] md:text-[56px] lg:text-[70px] xl:text-[86px] text-gray-900 dark:text-white ${textStyles}`}
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
    className={`mt-[8px] font-bold text-[44px] sm:text-[48px] md:text-[32px] lg:text-[46px] xl:text-[85px]  ${textStyles}`}
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
    className={`mt-[8px] font-semibold text-[24px] sm:text-[25px] md:text-[26px] lg:text-[22px] xl:text-[24px]  ${textStyles}`}
    transition={{ duration: 0.03 ,  delay: 0.015 }} // Faster transition
  >
    {title}
  </motion.h3>
));
