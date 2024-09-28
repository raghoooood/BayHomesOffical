"use client"
import { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  result: {
    price: number;
  };
}

const MortgageCalculator = ({ result }: MortgageCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(result.price);
  const [downPayment, setDownPayment] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(3.75);
  const [loanPeriod, setLoanPeriod] = useState<number>(25);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(result.price);
  }, [result.price]);

  useEffect(() => {
    const calculateMortgage = () => {
      const principal = totalPrice - (totalPrice * (downPayment / 100));
      const monthlyInterestRate = (interestRate / 100) / 12;
      const numberOfPayments = loanPeriod * 12;

      const payment = (principal * monthlyInterestRate) / 
                      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      setMonthlyPayment(parseFloat(payment.toFixed(2)));
    };

    calculateMortgage();
  }, [totalPrice, downPayment, interestRate, loanPeriod]);

  return (
    <div className='p-5 max-w-5xl bg-white rounded-lg shadow-md '>
      <h2 className='text-xl font-bold mb-4 dark:text-black'>Mortgage Calculator</h2>
      <p className='mb-4 dark:text-gray-800'>Calculate and view the monthly mortgage on this Apartment</p>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:flex-wrap mb-6'>
        <div className='lg:flex-1 lg:mr-6'>
          <label className='block text-gray-700'>Total Price (AED)</label>
          <input 
            type='number' 
            value={totalPrice} 
            onChange={(e) => setTotalPrice(Number(e.target.value))} 
            className='w-full p-2 border rounded dark:bg-bgDark'
          />
        </div>

        <div className='lg:flex-1 lg:mr-6'>
          <label className='block text-gray-700'>Down Payment (%)</label>
          <input 
            type='number' 
            value={downPayment} 
            onChange={(e) => setDownPayment(Number(e.target.value))} 
            className='w-full p-2 border rounded dark:bg-bgDark'
          />
        </div>

        <div className='lg:flex-1 lg:mr-6'>
          <label className='block text-gray-700'>Interest Rate (%)</label>
          <input 
            type='number' 
            step='0.01' 
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))} 
            className='w-full p-2 border rounded dark:bg-bgDark'
          />
        </div>

        <div className='lg:flex-1'>
          <label className='block text-gray-700'>Loan Period (Years)</label>
          <input 
            type='number' 
            value={loanPeriod} 
            onChange={(e) => setLoanPeriod(Number(e.target.value))} 
            className='w-full p-2 border rounded dark:bg-bgDark'
          />
        </div>
      </div>

      <div className='lg:flex lg:items-center lg:justify-between mb-6'>
        <div>
          <p className='text-lg font-bold'>Monthly Payments</p>
          <p className='text-xl text-orange-500'>AED {monthlyPayment} /month</p>
        </div>
        {/* <button 
          className='w-full lg:w-auto mt-4 lg:mt-0 bg-orange-500 text-white p-2 rounded hover:bg-gray-600'
        >
          Get a free consultation
        </button> */}
      </div>
    </div>
  );
};

export default MortgageCalculator;

