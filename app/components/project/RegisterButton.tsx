'use client';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ContactForm from '../forms/ContactForm';
import Image from 'next/image';
import samah from '@/assets/images/samah.png';
import Button from '../buttons/Button';

const RegisterButton = () => {
    const [showFilterOverlay, setShowFilterOverlay] = useState(false);

    const toggleFilterOverlay = () => {
        setShowFilterOverlay(!showFilterOverlay);
    };

    return (
        <div>
            <Button label="Register Your Interest Now" onClick={toggleFilterOverlay} />

            {showFilterOverlay && (
                <div className="fixed inset-0 flex h-full items-center justify-center p-4 mt-16 sm:mt-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                    {/* Modal Container */}
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 lg:max-w-4xl lg:p-8">
                        {/* Close Button */}
                        <button
                            onClick={toggleFilterOverlay}
                            className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <MdClose size={24} />
                        </button>

                        {/* Modal Grid Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Text Section */}
                            <div className="flex flex-col justify-center items-center lg:pr-6">
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center lg:text-left">
                                    The best deals are our expertise – register now.
                                </h1>
                                <p className="text-gray-600 mb-2 text-center lg:text-left">Samah Faek</p>
                                <p className="text-gray-600 mb-2 text-center lg:text-left">Chief Executive Officer</p>
                                <p className="text-gray-600 text-center lg:text-left">+971 50 376 9694</p>

                                {/* Samah's Image */}
                                <div className="mb-4">
                                    <Image
                                        src={samah}
                                        alt="Samah Faek"
                                        width={100}  // Smaller on mobile
                                        height={100} // Smaller on mobile
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="flex flex-col lg:items-end">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterButton;
