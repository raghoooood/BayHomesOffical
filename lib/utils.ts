import  sanitizeHtml  from 'sanitize-html';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { useCurrency } from '@/app/components/hooks/useCurrency';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface UrlQueryParams {
  params: string;
  key: string;
  value?: string | null;
}

export const formUrlQuery = ({ params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true})
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true})
}

export const applyFilters = (properties: any[], searchParams: URLSearchParams): any[] => {
  const areaFilters = searchParams.get('area')?.split(',') || [];
  const purposeFilter = searchParams.get('purpose');
  const propertyTypeFilter = searchParams.get('propertyType');
  const projectNameFilter = searchParams.get('projectName');
  const featureFilter = searchParams.get('feature');  // Get the feature filter from searchParams
  const featuredFilter = searchParams.get('featured');
  let filteredProperties = [...properties];

  // Filter by purpose
  if (purposeFilter) {
    filteredProperties = filteredProperties.filter(property =>
      property.purpose === purposeFilter
    );
  }

  // Filter by property type
  if (propertyTypeFilter) {
    filteredProperties = filteredProperties.filter(property =>
      property.propertyType === propertyTypeFilter
    );
  }

  // Filter by project
  if (projectNameFilter) {
    filteredProperties = filteredProperties.filter(property =>
      property.projectName === projectNameFilter
    );
  }
  if (featuredFilter) {
    filteredProperties = filteredProperties.filter(property =>
      property.featured === (featuredFilter === 'true') // Compare correctly with the boolean value
    );
  }
  // Filter by area
  if (areaFilters.length > 0) {
    filteredProperties = filteredProperties.filter(property =>
      areaFilters.includes(property.area?.areaName || '')
    );
  }

  // Filter by feature (allowing partial matching)
  if (featureFilter) {
    const featureFilterLower = featureFilter.toLowerCase(); // Convert filter to lowercase for case-insensitive comparison
    filteredProperties = filteredProperties.filter(property =>
      property.features && 
      property.features.some((feature: string) =>
        feature.toLowerCase().includes(featureFilterLower)
      )
    );
  }

  return filteredProperties;
};

export const sortProperties = (properties: any[], sortOption: string): any[] => {
  let sortedProperties = [...properties];

  if (sortOption.includes('price')) {
    sortedProperties.sort((a, b) => {
      const priceA = a.price ?? 0; // Default to 0 if price is undefined
      const priceB = b.price ?? 0; // Default to 0 if price is undefined
      return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
    });
  } /* else if (sortOption.includes('date')) {
    sortedProperties.sort((a, b) => {
      const dateA = new Date(a.date ?? '').getTime(); // Default to 0 if date is undefined or invalid
      const dateB = new Date(b.date ?? '').getTime(); // Default to 0 if date is undefined or invalid
      return sortOption === 'date-asc' ? dateA - dateB : dateB - dateA;
    });
  } */

  return sortedProperties;
};




export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, exchangeRates: { [key: string]: number }): number {
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  
  if (!fromRate || !toRate) return amount; // If exchange rates are missing, return the original amount
  
  return (amount / fromRate) * toRate;
}
export const getConvertedPrice = (price: number, selectedCurrency?: string, reverseConversion?: boolean) => {
  const exchangeRates = {
    AED: 1.00,    // Base AED
    USD: 0.27, // AED to USD
    EUR: 0.24, // AED to EUR
    GBP: 0.20, // AED to GBP
  };

  // Default to AED if no currency is provided
  selectedCurrency = selectedCurrency || 'AED'; 

  let convertedPrice: number;

  if (reverseConversion) {
    // Convert from the selected currency to AED
    convertedPrice = convertCurrency(price, selectedCurrency, 'AED', exchangeRates);
  } else {
    // Convert from AED to the selected currency
    convertedPrice = convertCurrency(price, 'AED', selectedCurrency, exchangeRates);
  }

  // Format the price with no decimal points
  const formattedPrice = convertedPrice.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${selectedCurrency} ${formattedPrice}`;
};



// lib/displayTitleUtil.ts
 export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

 import { useRouter } from 'next/router'; // if you're using Next.js


export const displayTitle = (searchParams: URLSearchParams, pathname?: string) => {
  const filters = {
    purpose: searchParams.get('purpose'),
    area: searchParams.get('area'),
    propertyType: searchParams.get('propertyType'),
    priceMin: searchParams.get('priceMin'),
    priceMax: searchParams.get('priceMax'),
    bedsMin: searchParams.get('bedsMin'),
    bedsMax: searchParams.get('bedsMax'),
    projectName: searchParams.get('projectName'),
    featured: searchParams.get('featured'),
    name: searchParams.get('name') || 'See all properties',
  };
  
  // Special case for projects page
  if (pathname === '/projects' ) {
    return 'Off plan projects in Dubai';
  }
  // If there are no filters, return "All properties in Dubai"
  const noFiltersApplied =
  !filters.purpose &&
  !filters.area &&
  !filters.propertyType &&
  !filters.priceMin &&
  !filters.priceMax &&
  !filters.bedsMin &&
  !filters.bedsMax &&
  !filters.projectName &&
  !filters.featured;

  if (noFiltersApplied) {
    return 'All properties in Dubai';
  }



  let title = '';
  const source = searchParams.get('source') || 'search';
  const { selectedCurrency } = useCurrency();

  // Handle price conversion
  const priceMin = filters.priceMin ? getConvertedPrice(Number(filters.priceMin), selectedCurrency) : null;
  const priceMax = filters.priceMax ? getConvertedPrice(Number(filters.priceMax), selectedCurrency) : null;

  // Construct the title based on the source and filters
  if (source === 'nav') {
    title = filters.name !== filters.projectName 
      ? `${capitalizeFirstLetter(filters.name)} in Dubai` 
      : `${capitalizeFirstLetter(filters.name)}`;
  } else {
    if (filters.projectName) {
      title = `Properties ${filters.purpose ? `for ${capitalizeFirstLetter(filters.purpose)}` : ''} in ${filters.projectName}`;
    } else if (filters.featured) {
      title = 'Luxury Properties in Dubai';
    } else {
      title = `${filters.propertyType ? `${capitalizeFirstLetter(filters.propertyType)}s` : 'Properties'} for ${
        filters.purpose ? capitalizeFirstLetter(filters.purpose) : 'Sale'
      } in ${filters.area ? capitalizeFirstLetter(filters.area) : 'Dubai'}`;
    }

    // Include price range if available
    if (priceMin && priceMax) {
      title += ` between ${priceMin} and ${priceMax}`;
    } else if (priceMin) {
      title += ` above ${priceMin}`;
    } else if (priceMax) {
      title += ` below ${priceMax}`;
    }

    // Include bedroom filters if available
    const bedsMin = parseInt(filters.bedsMin || '', 10);
    const bedsMax = parseInt(filters.bedsMax || '', 10);
    if (!isNaN(bedsMin) && !isNaN(bedsMax)) {
      title += ` with ${bedsMin === bedsMax ? `${bedsMin} bedroom${bedsMin > 1 ? 's' : ''}` : `${bedsMin} to ${bedsMax} bedrooms`}`;
    } else if (!isNaN(bedsMin)) {
      title += ` with more than ${bedsMin} bedroom${bedsMin > 1 ? 's' : ''}`;
    } else if (!isNaN(bedsMax)) {
      title += ` with less than ${bedsMax} bedrooms`;
    }
  }

  return title.trim();
};



export const sanitizeHtmlContent = (html: string): string => {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'a', 'b', 'i', 'u', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      // Add other attributes as needed
    },
    allowedIframeHostnames: [], // Add specific hostnames if you allow iframes
    allowedStyles: {
      '*': {
        // Allow specific styles if needed
        'color': [],
        'font-size': [],
        'text-align': []
      }
    },
  });
};


