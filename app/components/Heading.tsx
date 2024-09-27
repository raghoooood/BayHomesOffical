'use client'
import React from 'react'

interface HeadingProps {
    title?: string;
    subtitle?: string;
    center?: boolean;
    start?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title, subtitle, center, start
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className={`text-2xl font-bold px-1 py-5 dark:text-white
        ${start ? 'text-start' : 'text-center'}
        `}>
            {title}
        </div>
        <div className='font-light text-gray-500 mt-2 text-xs dark:text-white'>
            {subtitle}
        </div>
    </div>
  )
}

export default Heading