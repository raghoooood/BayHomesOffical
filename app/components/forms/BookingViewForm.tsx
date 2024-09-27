"use client";
import React, { useState } from "react";
import Button from "../buttons/Button";
import { submitBookingForm } from "@/lib/actions/submitForm.action";

interface PropertyNameProps {
  propertyName: string;
}

const BookingViewForm = ({ propertyName }: PropertyNameProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE", // Add default country value
    bookingDate: "",
    bookingTime: "",
    preferredLanguage: "English",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await submitBookingForm({ ...formData, propertyName });
    setStatusMessage({
      type: response.success ? "success" : "error",
      message: response.success ? "Booking request sent successfully!" : "Failed to submit booking request.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 sm:px-5 px-1 bg-white dark:bg-bgDark rounded-md">
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {["name", "email", "phone", "bookingDate", "bookingTime"].map((field, index) => (
          <div key={index}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-white capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "email" ? "email" : field.includes("Date") || field.includes("Time") ? field : "text"}
              name={field}
              id={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 dark:text-white">
            Preferred Language
          </label>
          <select
            name="preferredLanguage"
            id="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {["English", "Arabic"].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 block w-full dark:bg-cardText dark:text-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2 text-center">
          {statusMessage.message && (
            <div className={`mt-4 ${statusMessage.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {statusMessage.message}
            </div>
          )}
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default BookingViewForm;
