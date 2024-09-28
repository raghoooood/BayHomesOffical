'use client'
import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    noutline?: boolean;
    small?: boolean;
    black_text?: boolean;
    icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline, 
    noutline,
    small, 
    black_text,
    icon : Icon
}) => {
  return (
    <button 
    onClick={onClick}
    disabled={disabled}
    className={`
    disabled:opacity-70
    rounded-lg
    hover:bg-orange-600
    hover:border-orange-600
    transition
    w-full
    p-5
    ${outline ? 'bg-transparent' : 'bg-orange-500'}
    ${outline ? 'border-gray-200' : 'border-orange-500'}
    ${outline ? 'text-white' : 'text-black'}
    ${noutline ? 'bg-white' : 'bg-orange-500'}
    ${noutline ? 'border-white' : 'border-orange-500'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'border-[1px]' : 'border-2'}
    ${black_text ? 'text-black' : 'text-white'}
    `}>

        {Icon && (
            <Icon 
            size={21}
            className='
            left-4
            top-3' />
        )}
        {label}
    </button>
  )
}

export default Button