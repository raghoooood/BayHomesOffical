'use client';

import Link from 'next/link';
import { FiHome } from 'react-icons/fi'; // Importing home icon
import { HiChevronRight } from 'react-icons/hi'; // Importing chevron right icon

interface BreadcrumbItem {
  label: string;
  path?: string;
  filters?: { [key: string]: string }[]; // Allows an array of filter objects
  style?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBreadcrumbClick?: (url: string, index: number) => void; // New handler to pass the generated URL back to parent
  styles?: string;
}

const Breadcrumb = ({ items, onBreadcrumbClick, styles }: BreadcrumbProps) => {
  const generatePathWithFilters = (path: string, filters?: { [key: string]: string }[]) => {
    if (!filters || filters.length === 0) return path;

    const params = new URLSearchParams();
    filters.forEach(filter => {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    });

    return `${path}?${params.toString()}`;
  };

  const handleClick = (path: string, index: number, filters?: { [key: string]: string }[]) => {
    const url = generatePathWithFilters(path, filters);
    if (onBreadcrumbClick) {
      onBreadcrumbClick(url, index); // Call the handler with the generated URL
    }
  };

  // Control the number of breadcrumbs to show based on screen size
  const maxItemsOnSmallScreen = 2; // Show only the first and last items on small screens

  return (
    <nav className={`${styles} text-black dark:text-gray-300 text-xs mb-4 mt-2`} aria-label="breadcrumb">
      <ol className="list-none p-0 inline-flex items-center flex-wrap">
        {/* Always show the Home link with an icon */}
        <li className="flex items-center">
          <Link href="/" className="text-black dark:text-gray-300 hover:underline text-sm md:text-base flex items-center">
            <FiHome className="mr-1" /> {/* Home icon */}
            Home
          </Link>
          {items.length > 0 && <HiChevronRight className="mx-2 text-gray-500 dark:text-gray-400" />} {/* Chevron separator */}
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // Conditionally hide intermediate breadcrumbs on small screens
          if (index !== 0 && index !== items.length - 1 && items.length > maxItemsOnSmallScreen) {
            if (index === 1) {
              // Add ellipsis to indicate hidden breadcrumbs on small screens
              return (
                <li key={index} className="flex items-center text-gray-500">
                  ...
                  <HiChevronRight className="mx-2 text-gray-500 dark:text-gray-400" />
                </li>
              );
            }
            return null; // Hide intermediate items
          }

          // Display first and last breadcrumbs, and all items for larger screens
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-orange-500 font-semibold text-sm md:text-base">{item.label}</span>
              ) : (
                <>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      if (onBreadcrumbClick) {
                        e.preventDefault();
                        if (item.path) {
                          handleClick(item.path, index, item.filters);
                        }
                      }
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:underline text-sm md:text-base"
                  >
                    {item.label}
                  </a>
                  <HiChevronRight className="mx-2 text-gray-500 dark:text-gray-400" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
