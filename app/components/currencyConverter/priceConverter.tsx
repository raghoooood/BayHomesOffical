'use client';

import { useCurrency } from '@/app/components/hooks/useCurrency';
import { convertCurrency } from '@/lib/utils';

type PriceConverterProps = {
  price: number ;
  style?: string;
  
};

const PriceConverter: React.FC<PriceConverterProps> = ({ price , style }) => {
  const { selectedCurrency } = useCurrency();
  
  const exchangeRates = {
    AED: 1.00,    // Base AED
    USD: 0.27, // AED to USD
    EUR: 0.24, // AED to EUR
    GBP: 0.20, // AED to GBP
  };

  const convertedPrice = convertCurrency(price, 'AED', selectedCurrency, exchangeRates);
  
   const formattedPrice = convertedPrice.toLocaleString(undefined, {
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });

  return <p className={style}>{selectedCurrency} {formattedPrice}</p>;
};

export default PriceConverter;
