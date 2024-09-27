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

  return <p className={style}>{selectedCurrency} {formattedPrice}</p>;
};

export default PriceConverter;
