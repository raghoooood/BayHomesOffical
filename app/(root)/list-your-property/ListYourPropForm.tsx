"use client";
import React, { useState, useEffect } from 'react';
// import { fetchCountryCodes } from '@/app/utils/';
import Button from '../../components/buttons/Button';
import { useRouter } from "next/navigation";
import { submitForm } from '@/lib/actions/submitForm.action';

const ListYourPropForm: React.FC = () => {
    const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    preferredLanguage: 'English',
    propertyAddress: '',
    propertyType: '',
    propertyPurpose: '',
    bedroom: '',
    message: '',
  });

  const [countries, setCountries] = useState<{ code: string, name: string, dialCode: string }[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await submitForm(formData);

    if (response.success) {
      setSuccessMessage(response.message);
      setErrorMessage('');
      //router.push('/');
    } else {
      setErrorMessage(response.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-5 text-center">List Your Property</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
      <div className="mt-1 flex">
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="p-2 block w-1/3 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{`${country.name} (${country.dialCode})`}</option>
          ))}
        </select>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-2 block w-2/3 border border-gray-300 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <div>
      <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700">Preferred Language</label>
      <select
        name="preferredLanguage"
        id="preferredLanguage"
        value={formData.preferredLanguage}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="English">English</option>
        <option value="Arabic">Arabic</option>
      </select>
    </div>
    <div>
      <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">Property Address</label>
      <input
        type="text"
        name="propertyAddress"
        id="propertyAddress"
        value={formData.propertyAddress}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label>
      <select
        name="propertyType"
        id="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select...</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
        <option value="office">Office</option>
      </select>
    </div>
    <div>
      <label htmlFor="propertyPurpose" className="block text-sm font-medium text-gray-700">Property Purpose</label>
      <select
        name="propertyPurpose"
        id="propertyPurpose"
        value={formData.propertyPurpose}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select...</option>
        <option value="sale">For Sale</option>
        <option value="holiday">For Holiday Homes</option>
        <option value="rent">For Rent</option>
      </select>
    </div>
    <div>
      <label htmlFor="bedroom" className="block text-sm font-medium text-gray-700">Bedroom</label>
      <select
        name="bedroom"
        id="bedroom"
        value={formData.bedroom}
        onChange={handleChange}
        required
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select...</option>
        <option value="1">1 Bedroom</option>
        <option value="2">2 Bedrooms</option>
        <option value="3">3 Bedrooms</option>
        <option value="4">4 Bedrooms</option>
        <option value="5">5 Bedrooms and above</option>
      </select>
    </div>
    <div className="sm:col-span-2">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
      <textarea
        name="message"
        id="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div className="sm:col-span-2 text-center">
      <Button label="Submit" onClick={handleSubmit} />
    </div>
    <p className="sm:col-span-2 text-sm text-center text-gray-600 mt-4">
      By clicking Submit, you agree to our <a href="/terms" className="text-orange-500">Terms & Conditions</a> and <a href="/privacy" className="text-orange-500">Privacy Policy</a>.
    </p>
  </div>
  {successMessage && <p className="text-green-600">{successMessage}</p>}
  {errorMessage && <p className="text-red-600">{errorMessage}</p>}
</form>

    </div>
  );
};

export default ListYourPropForm;
