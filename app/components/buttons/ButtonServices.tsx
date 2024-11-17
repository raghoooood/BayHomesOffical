'use client'
import React from 'react'
import { IconType } from 'react-icons';

interface SerButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: IconType;
}

const ButtonServices: React.FC<SerButtonProps> = ({
    label,
    onClick,
    disabled,
    icon: Icon
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        sm:flex-shrink-0 flex
        text-sm 
        font-bold
        items-center
        justify-between
        text-sm
        font-bold
        text-center
        py-2
        px-3
        rounded-full
        border
        border-gray-600
        transition-all
        duration-300
        cursor-pointer
        mt-4
        bg-white
        text-black
        hover:bg-orange-500
        hover:text-white
        hover:border-orange-500
      `}
    >
        {label}
        {Icon && (
            <Icon 
              size={21}
              className='relative ml-2 flex md:hidden sm:hidden lg:inline'
            />
        )}
    </button>
  )
}




export default ButtonServices;
