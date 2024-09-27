'use client';

import Container from '../container/Container';

interface HeroContainerProps {
  title: string;
  description: string;
  className?: string;
}

const HeroContainer: React.FC<HeroContainerProps> = ({ title, description, className = '' }) => {
  return (
    <Container>
      <div className={`relative w-full h-[20vh] max-h-[300px] text-black flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 mt-5 ${className}`}>
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center dark:text-white">
          {title}
        </h2>
        <p className="text-sm md:text-base lg:text-md xl:text-md text-center font-semibold text-gray-900 mt-2 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Container>
  );
};

export default HeroContainer;
