"use client";
import React, { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import Container from "../container/Container";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../Breadcrumb";
import FilterAndViewToggle from "../filters/FilterAndViewToggle";
import { applyFilters, sortProperties, displayTitle } from "@/lib/utils";
import SearchAllProp from "../search/SearchAllProp";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/app/styles/animations";

// Lazy-loaded components
const AllPropCard = React.lazy(() => import("@/app/components/property/AllPropCard"));
const PropCard = React.lazy(() => import("./PropCard"));
const Features = React.lazy(() => import("../features/Features"));
const MortgageCalculator = React.lazy(() => import("../mortgages/MortgageCalculator"));

interface BreadcrumbItem {
  label: string;
  path: string;
  filters?: { [key: string]: string }[];
}

interface Props {
  _id: string;
  images: {
    propImages: string[];
    backgroundImage: string;
  };
  title: string;
  price: number;
  description: string;
  numOfbathrooms: number;
  propertyType: string;
  location: {
    city: string;
    state: string;
    street: string;
  };
  numOfrooms: number;
  area: {
    areaName: string;
  };
  size: string;
  project: {
    projectName: string;
    developer: string;
    startPrice: number;
  };
}

const AllProp: React.FC<{ initialProperties: Props[] }> = ({ initialProperties }) => {
  const [properties, setProperties] = useState<Props[]>(initialProperties);
  const [view, setView] = useState<'list' | 'grid'>(() => {
    return localStorage.getItem('view') as 'list' | 'grid' || 'list';
  });
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const title = displayTitle(searchParams);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Filter and sort properties with useMemo
  const filteredAndSortedProperties = useMemo(() => {
    return sortProperties(applyFilters(initialProperties, searchParams), sortOption);
  }, [initialProperties, searchParams, sortOption]);

  useEffect(() => {
    setProperties(filteredAndSortedProperties);
  }, [filteredAndSortedProperties]);

  // Breadcrumb generation with useCallback
  const generateBreadcrumbItems = useCallback((query: URLSearchParams): BreadcrumbItem[] => {
    const purpose = query.get('purpose');
    const propertyType = query.get('propertyType');
    const classification = query.get('classification');
    const projectName = query.get('projectName');
    const featured = query.get('featured');

    const items: BreadcrumbItem[] = purpose
      ? [{ label: `Properties for ${purpose} in Dubai`, path: `/all-property`, filters: [{ purpose: purpose || '' }] }]
      : featured
      ? [{ label: 'All properties in Dubai', path: `/all-property` }]
      : [{ label: 'All properties in Dubai', path: `/all-property` }];

    if (propertyType || classification || featured || projectName) {
      items.push({ label: title, path: '' });
    }

    return items;
  }, [title]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setBreadcrumbItems(generateBreadcrumbItems(urlParams));
  }, [window.location.search, generateBreadcrumbItems]);

  const handleBreadcrumbClick = (url: string) => {
    router.push(url);
    const urlParams = new URLSearchParams(url.split('?')[1]);
    setBreadcrumbItems(generateBreadcrumbItems(urlParams));
  };

  const handleViewChange = (newView: 'list' | 'grid') => {
    if (newView !== view) {
      setView(newView);
      localStorage.setItem('view', newView);
    }
  };

  // Pagination calculations
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = useMemo(() => {
    return properties.slice(indexOfFirstProperty, indexOfLastProperty);
  }, [properties, indexOfFirstProperty, indexOfLastProperty]);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <div className="space-y-14 sm:space-y-2">
        <SearchAllProp />
        <Suspense fallback={<div>Loading features...</div>}>
          <Features />
        </Suspense>
      </div>

      <div className="pt-2 lg:pt-1 md:pt-10 sm:mt-0 mt-6">
        <Breadcrumb items={breadcrumbItems} onBreadcrumbClick={handleBreadcrumbClick} />
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        <FilterAndViewToggle
          onSortChange={setSortOption}
          onViewChange={handleViewChange}
          currentView={view}
        />

        {/* Display "No Properties Found" if there are no properties */}
        {currentProperties.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl font-bold">Oops, No Properties Found!</p>
            <p className="text-gray-500">Try adjusting your search or filters to find more properties :)</p>
          </div>
        ) : (
          <motion.div
            variants={fadeIn("down", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            className={`mt-4 ${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8' : 'flex flex-col space-y-5'}`}
          >
            {currentProperties.map(property => (
              <div key={property._id} className="relative flex flex-col bg-white rounded-lg shadow-md">
                <Suspense fallback={<div>Loading property...</div>}>
                  {view === 'grid' ? <PropCard {...property} /> : <AllPropCard {...property} />}
                </Suspense>
              </div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md bg-gray-200 text-gray-700  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          >
            Back
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md bg-gray-200 text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
          >
            Next
          </button>
        </div>

        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          className="flex justify-center items-center p-10 bg-gray-100 mt-5 -left-50 -right-50 w-full"
        >
          <Suspense fallback={<div>Loading mortgage calculator...</div>}>
            <MortgageCalculator result={{ price: 0 }} />
          </Suspense>
        </motion.div>
      </div>
    </Container>
  );
};

export default AllProp;
