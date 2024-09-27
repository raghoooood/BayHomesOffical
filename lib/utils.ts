import  sanitizeHtml  from 'sanitize-html';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import PriceConverter from '@/app/components/currencyConverter/priceConverter';
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
export const getConvertedPrice = (price: number, selectedCurrency: string ) => {
  const exchangeRates = {
    AED: 3.67,
    EUR: 0.85,
    GBP: 0.75,
    USD: 1.00,
  };

  const convertedPrice = convertCurrency(price, 'AED', selectedCurrency, exchangeRates);

  const formattedPrice = convertedPrice.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${selectedCurrency} ${formattedPrice}`;
};


// lib/displayTitleUtil.ts
 export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

 export const displayTitle = (searchParams: URLSearchParams) => {
  const filters = {
    purpose: searchParams.get('purpose'),
    area: searchParams.get('area'),
    propertyType: searchParams.get('propertyType'),
    priceMin: searchParams.get('priceMin'),
    priceMax: searchParams.get('priceMax'),
    bedsMin: searchParams.get('bedsMin'),
    bedsMax: searchParams.get('bedsMax'),
    projectName: searchParams.get('projectName'),
    name: searchParams.get('name') || 'See all properties',
  };

  if (!Object.values(filters).some(Boolean)) return 'All projects in Dubai';

  let title = '';
  const source = searchParams.get('source') || 'search';
  const {selectedCurrency } = useCurrency();

  // Handle price conversion
 // In the displayTitle function
  const priceMin = filters.priceMin ? getConvertedPrice(Number(filters.priceMin) , selectedCurrency ) : null;
 const priceMax = filters.priceMax ? getConvertedPrice(Number(filters.priceMax) , selectedCurrency) : null;

  if (source === 'nav') {
    title += `${
      filters.name !== filters.projectName
        ?`${capitalizeFirstLetter(filters.name)} in Dubai `
        : `Off plan properties for sale in Dubai developed by ${capitalizeFirstLetter(filters.name)}`
    } ` 
  } else {
    if (filters.projectName) {
      title += `Off plan properties for ${filters.purpose ? capitalizeFirstLetter(filters.purpose) : 'Sale'} in Dubai `;
    } else {
      title += `${filters.propertyType ? `${capitalizeFirstLetter(filters.propertyType)}s` : 'Properties'} ${
        filters.purpose ? `for ${capitalizeFirstLetter(filters.purpose)}` : 'for Sale'
      } in ${filters.area ? capitalizeFirstLetter(filters.area) : 'Dubai'} `;
    }
   


    // Include the formatted price in the title
    if (priceMin && priceMax) {
      title += `between  ${priceMin} and ${priceMax} `;
    } else if (priceMin) {
      title += `above ${priceMin} `;
    } else if (priceMax) {
      title += `below ${priceMax} `;
    } 

    // Handle bedroom filters
    const bedsMinNumber = parseInt(filters.bedsMin || '', 10);
    const bedsMaxNumber = parseInt(filters.bedsMax || '', 10);
    if (!isNaN(bedsMinNumber) && !isNaN(bedsMaxNumber)) {
      title += `with ${bedsMinNumber === bedsMaxNumber ? `${bedsMinNumber} bedroom${bedsMinNumber > 1 ? 's' : ''}` : `${bedsMinNumber} to ${bedsMaxNumber} bedrooms`} `;
    } else if (!isNaN(bedsMinNumber)) {
      title += `with more than ${bedsMinNumber} bedroom${bedsMinNumber > 1 ? 's' : ''} `;
    } else if (!isNaN(bedsMaxNumber)) {
      title += `with less than ${bedsMaxNumber} bedrooms `;
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
