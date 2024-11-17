'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import logo from '@/assets/images/logo_bay_homes_black.png';
import logoDarkTheme from '@/assets/images/logo_bay_homes_white.png';

const Logo = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      className="cursor-pointer ml-1 sm:ml-4 mr-2 mt-1"
      src={theme === 'dark' ? logoDarkTheme : logo}
      sizes="(max-width: 768px) 120px, (max-width: 1024px) 120px, 120px"
      priority // Adding priority for LCP optimization
      style={{
        width: 'auto',
        height: 'auto',
        maxWidth: '145px', // Default max width
      }}
    />
  );
};

export default Logo;
