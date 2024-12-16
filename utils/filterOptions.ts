// utils/filterOptions.ts

const filterOptions = {
  purpose: [
    { value: '', label: 'Buy Or Rent' },
    { value: 'sale', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
  ],
  propertyType: [
    { value: '', label: 'Type' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'office', label: 'Office' },
    { value: 'shop', label: 'Shop' },
    { value: 'studio', label: 'Studio' },
  ],
  priceRange: [
    { value: '', label: 'Price Range' },
    { value: '0', label: '0' },
    { value: '600', label: '600' },
    { value: '2500', label: '2500' },
    { value: '4000', label: '4000' },
    { value: '5000', label: '5000' },
    { value: '250000', label: '250,000' },
    { value: '300000', label: '300,000' },
    { value: '350000', label: '350,000' },
    { value: '400000+', label: '400,000+' },
  ],
  bedsRange: [
    { value: '', label: 'Beds Range' },
    { value: '0', label: 'Studio' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ],
};

export default filterOptions;
