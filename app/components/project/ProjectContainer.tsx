'use client';

import React, { useState, useEffect } from "react";
import Container from "../container/Container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import Breadcrumb from "../Breadcrumb";
import FilterAndViewToggle from "../filters/FilterAndViewToggle";
import GridProject from "./GridProject";
import { displayTitle, applyFilters, sortProperties } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
  filters?: { [key: string]: string }[];
}

interface Props {
  _id: string;
  images: {
    outImages: string[];
    backgroundImage: string;
  };
  projectName?: string;
  rooms?: {
    min: number;
    max: number;
  };
  area: {
    areaName: string;
  };
  description?: string;
  developer?: {
    developerName: string;
  };
  size: string;
  startPrice: number;
  location: string;
}

const ITEMS_PER_PAGE = 6;

const ProjectContainer: React.FC<{ initialProperties: Props[] }> = ({ initialProperties }) => {
  const [filteredProperties, setFilteredProperties] = useState<Props[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [view, setView] = useState<'list' | 'grid' | null>(null);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const title = displayTitle(searchParams, pathname);

  useEffect(() => {
    const storedView = localStorage.getItem('project-view');
    if (storedView === 'list' || storedView === 'grid') {
      setView(storedView);
    } else {
      setView('grid'); // Default view
    }
  }, []);

  useEffect(() => {
    // Handle filtering and sorting
    const filtered = applyFilters(initialProperties, searchParams);
    const sorted = sortProperties(filtered, sortOption);
    setFilteredProperties(sorted);

    // Update total pages
    setTotalPages(Math.ceil(sorted.length / ITEMS_PER_PAGE));
  }, [searchParams, sortOption, initialProperties]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (view) {
      localStorage.setItem('project-view', view);
    }
  }, [view]);

  const getPaginatedProperties = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const generateBreadcrumbItems = (query: URLSearchParams) => {
    const items: BreadcrumbItem[] = [
      {
        label: title,
        path: '/all-projects',
      },
    ];

    return items;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setBreadcrumbItems(generateBreadcrumbItems(urlParams));
  }, [window.location.search]);

  const handleBreadcrumbClick = (url: string) => {
    router.push(url);
    setBreadcrumbItems(generateBreadcrumbItems(new URLSearchParams(url.split('?')[1])));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // Render nothing until the view is determined
  if (view === null) {
    return null;
  }

  return (
    <Container>
      <div className="pt-12 lg:pt-5 md:pt-12 sm:mt-0 mt-6">
        <Breadcrumb items={breadcrumbItems} onBreadcrumbClick={handleBreadcrumbClick} />
        <h1 className="text-2xl font-semibold mb-6">{title}</h1>
        <FilterAndViewToggle onSortChange={setSortOption} onViewChange={setView} currentView={view} />
        
        {/* Improved list and grid view layout */}
        <div className={`grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-${view === 'list' ? '1' : '3'} gap-8`}>
          {getPaginatedProperties().map((project) => (
            <div key={project._id} className="relative flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full">
              {view === 'grid' ? (
                <GridProject {...project} />
              ) : (
                <ProjectCard {...project}  />
              )}
            </div>
          ))}
        </div>
        
        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-orange-500 hover:text-white rounded disabled:opacity-50 transition-colors"
          >
            Back
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-orange-500 hover:text-white rounded disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProjectContainer;
