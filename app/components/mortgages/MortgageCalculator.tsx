"use client";
import { getConvertedPrice } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useCurrency } from "../hooks/useCurrency";

interface MortgageCalculatorProps {
  result: {
    price: number; // This should be in AED initially
  };
}

const MortgageCalculator = ({ result }: MortgageCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(result.price);
  const [downPayment, setDownPayment] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(3.75);
  const [loanPeriod, setLoanPeriod] = useState<number>(25);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const { selectedCurrency } = useCurrency();

  // State for the converted price
  const [convertedTotalPrice, setConvertedTotalPrice] = useState<string>(
    getConvertedPrice(result.price, selectedCurrency)
  );

  // Update total price when result changes
  useEffect(() => {
    setTotalPrice(result.price);
    setConvertedTotalPrice(getConvertedPrice(result.price, selectedCurrency));
  }, [result.price, selectedCurrency]);

  useEffect(() => {
    const calculateMortgage = () => {
      const principal = totalPrice - totalPrice * (downPayment / 100);
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanPeriod * 12;

      const payment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      setMonthlyPayment(parseFloat(payment.toFixed(2)));
    };

    calculateMortgage();
  }, [totalPrice, downPayment, interestRate, loanPeriod]);

  // Update converted price whenever totalPrice or selectedCurrency changes
  useEffect(() => {
    if (totalPrice) {
      const convertedPrice = getConvertedPrice(totalPrice, selectedCurrency);
      setConvertedTotalPrice(convertedPrice);
    }
  }, [totalPrice, selectedCurrency]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInAED = Number(e.target.value.replace(/[^0-9.-]+/g, "")); // Get the value in AED without currency symbols
    setTotalPrice(valueInAED);
  };

  return (
    <div className="p-5 max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Mortgage Calculator
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Calculate and view the monthly mortgage on this Apartment
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:flex-wrap mb-6">
        <div className="lg:flex-1 lg:mr-6">
          <label className="block text-gray-700 dark:text-gray-400">
            Total Price ({selectedCurrency})
          </label>
          <input
            type="text" // Change to text to allow for formatted input
            value={convertedTotalPrice} // Show the converted price
            onChange={handlePriceChange} // Handle input change to update AED value
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="lg:flex-1 lg:mr-6">
          <label className="block text-gray-700 dark:text-gray-400">
            Down Payment (%)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="lg:flex-1 lg:mr-6">
          <label className="block text-gray-700 dark:text-gray-400">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="lg:flex-1">
          <label className="block text-gray-700 dark:text-gray-400">
            Loan Period (Years)
          </label>
          <input
            type="number"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(Number(e.target.value))}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="lg:flex lg:items-center lg:justify-between mb-6">
        <div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Monthly Payments
          </p>
          <p className="text-xl text-orange-500">
            {selectedCurrency} {monthlyPayment} /month
          </p>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
