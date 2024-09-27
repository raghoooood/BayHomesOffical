'use client';
import React, { useState } from 'react';
import ButtonProp from '@/app/components/buttons/ButtonProp';
import { MdClose } from 'react-icons/md';
import ContactForm from '../forms/ContactForm';

const RegisterButton = () => {
    const [showFilterOverlay, setShowFilterOverlay] = useState(false);

    const toggleFilterOverlay = () => {
        setShowFilterOverlay(!showFilterOverlay);
    };

    return (
        <div>
            {/* Register Interest Button */}
            <ButtonProp label="Register Interest" onClick={toggleFilterOverlay} />

            {/* Filter Overlay for Small Devices */}
            {showFilterOverlay && (
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 sm:p-8">
                        {/* Close Button */}
                        <button
                            onClick={toggleFilterOverlay}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <MdClose size={24} />
                        </button>

                        {/* Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Text Section */}
                            <div className="flex flex-col justify-center lg:pr-6">
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    The best deals are our expertise – register now.
                                </h1>
                                <p className="text-gray-600 mb-2">Samah Faek</p>
                                <p className="text-gray-600 mb-2">Chief Executive Officer</p>
                                <p className="text-gray-600">+971 50 376 9694</p>
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
