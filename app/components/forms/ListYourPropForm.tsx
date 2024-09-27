"use client";
import React, { useState } from 'react';
import Button from '../buttons/Button';
import { useRouter } from "next/navigation";
import { submitForm } from '@/lib/actions/submitForm.action';

const ListYourPropForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'AE',
    preferredLanguage: 'English',
    propertyAddress: '',
    propertyType: '',
    propertyPurpose: '',
    bedroom: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Define the type for form field keys
  type FormFields = keyof typeof formData;

  const requiredFields: FormFields[] = [
    'name',
    'email',
    'phone',
    'propertyAddress',
    'propertyType',
    'propertyPurpose',
    'bedroom'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Only allow numbers in the phone field
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return; // If the value is not a number, do not update the state
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all required fields are filled
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }
    }

    // Validate the phone number to ensure it is exactly 9 digits
    if (!/^\d{9}$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    // Validate the email format
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Submit the form data
    const response = await submitForm(formData);

    if (response.success) {
      setSuccessMessage(response.message);
      setErrorMessage('');
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'AE',
        preferredLanguage: 'English',
        propertyAddress: '',
        propertyType: '',
        propertyPurpose: '',
        bedroom: '',
        message: '',
      });
    } else {
      setErrorMessage(response.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 bg-white dark:bg-bgDark rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-white">Phone</label>
            <div className="mt-1 flex flex-col md:flex-row">
              <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                <div className="flex items-center p-2 bg-gray-100 border-r border-gray-300 rounded-l-md">
                  <span className="text-gray-600">+971</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-2 block w-full dark:bg-cardText dark:text-white border-0 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 dark:text-white">Preferred Language</label>
            <select
              name="preferredLanguage"
              id="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          <div>
            <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 dark:text-white">Property Address</label>
            <input
              type="text"
              name="propertyAddress"
              id="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 dark:text-white">Property Type</label>
            <select
              name="propertyType"
              id="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select...</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <label htmlFor="propertyPurpose" className="block text-sm font-medium text-gray-700 dark:text-white">Property Purpose</label>
            <select
              name="propertyPurpose"
              id="propertyPurpose"
              value={formData.propertyPurpose}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select...</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedroom" className="block text-sm font-medium text-gray-700 dark:text-white">Bedroom</label>
            <select
              name="bedroom"
              id="bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-600 mt-4">{successMessage}</div>}
        <div className="text-center">
        <Button label="Submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default ListYourPropForm;
