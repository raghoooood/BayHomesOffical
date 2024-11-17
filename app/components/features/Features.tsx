'use client';

import { useEffect, useRef, useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Container from '../container/Container';
import FeaturesBox from './FeaturesBox';
import { features } from '@/utils/featuresList'; // Import features list

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
    const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleFeatureClick = (label: string) => {
        setSelectedFeature(prev => (prev === label ? null : label));
        router.push(`/all-property?feature=${label}`);
    };

    const scrollContainer = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const updateScrollState = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const canScrollLeft = container.scrollLeft > 0;
            const canScrollRight = container.scrollWidth > container.clientWidth && container.scrollLeft < container.scrollWidth - container.clientWidth;
            setScrollState({ canScrollLeft, canScrollRight });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollState);
            updateScrollState();
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', updateScrollState);
            }
        };
    }, []);

    return (
        <Container>
        <div className="relative flex mt-10 sm:mt-12 md:mt-10 lg:mt-1 my-auto">
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto smooth-scroll scrollbar-hide"
            >
                <div className="flex flex-nowrap space-x-4 p-4">
                    {features.map(({ label, icon }) => (
                        <div
                            key={label}
                            className={`flex-shrink-0 w-22 h-12 sm:h-8 pt-6 sm:pt-0 flex items-center justify-center cursor-pointer transition-transform duration-200
                                ${selectedFeature === label ? 'text-orange-500 transform scale-105' : 'hover:scale-105'}`}
                            onClick={() => handleFeatureClick(label)}
                        >
                            <FeaturesBox label={label} selected={selectedFeature === label} icon={icon} />
                        </div>
                    ))}
                </div>
            </div>
            {scrollState.canScrollLeft && (
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 "
                    onClick={() => scrollContainer('left')}
                >
                    <MdArrowBack size={20} />
                </button>
            )}
            {scrollState.canScrollRight && (
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 mt-5 sm:mt-0"
                    onClick={() => scrollContainer('right')}
                >
                    <MdArrowForward size={20} />
                </button>
            )}
        </div>
    </Container>
    
    );
};

export default Features;
