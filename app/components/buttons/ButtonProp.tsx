'use client'
import React from 'react'
import { IconType } from 'react-icons';

interface PropButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    navoutline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const ButtonProp: React.FC<PropButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    navoutline,
    small,
    icon: Icon
}) => {
    const baseClasses = `
        hidden md:flex sm:flex items-center justify-between rounded-full transition-all
        duration-300 cursor-pointer border mr-3 p-3 lg:p-3 md:p-2 sm:p-2 sm:text-md text-sm
        ${outline ? 'bg-transparent text-black dark:text-white' : 'bg-orange-500 text-white'}
        ${navoutline ? 'bg-transparent border-gray-500' : 'bg-gradient-to-r from-orange-400 to-orange-600 border-orange-500'}
        ${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-2'}
        hover:bg-orange-500 hover:text-white hover:border-orange-500
    `;

    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={baseClasses}
        >
            {label}
            {Icon && <Icon size={21} className='ml-2 md:hidden sm:hidden lg:inline' />}
        </button>
    );
};

export default ButtonProp;
