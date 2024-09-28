'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaRegUser } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import Button from '../buttons/Button';
import { contactForm } from '@/lib/actions/contactForm.action';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'Invalid phone number, please enter numbers only')
    .required('Phone number is required'),
  message: yup.string().required('Message is required'),
});

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>({ resolver: yupResolver(schema) });
  const [submitting, setSubmitting] = useState(false);


  /*  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      setSubmitting(true);
      console.log(data);
      toast.success('Form submitted successfully!');
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }; */
  const onSubmit: SubmitHandler<IFormInputs> = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await contactForm(data);

      if (response.success) {
      console.log(response.message);
      reset();
       
      } else {
       console.log(response.message);
       
      }
       
    } catch (error) {
      console.error(error);
      toast.error('Failed to send the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
 
 
  return (
    <div id="contact" className="relative p-4 mb-4 z-20">
      <div className="sm:flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col flex-1">
                <label className="relative">
                  <input
                    {...register('firstName')}
                    name="firstName"
                    placeholder="First Name"
                    className="flex justify-between items-center rounded-xl py-3 px-6 shadow-md w-full h-12 capitalize dark:bg-gray-600"
                  />
                  <FaRegUser className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2" />
                </label>
                {errors.firstName && (
                  <span className="text-red-500 text-xs text-center mt-1">required</span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <label className="relative">
                  <input
                    {...register('lastName')}
                    name="lastName"
                    placeholder="Last Name"
                    className="flex justify-between items-center rounded-xl py-3 px-6 shadow-md w-full h-12 capitalize dark:bg-gray-600"
                  />
                  <FaRegUser className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2" />
                </label>
                {errors.lastName && (
                  <span className="text-red-500 text-xs mt-1 text-center">required</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col flex-1">
                <label className="relative">
                  <input
                    {...register('email')}
                    name="email"
                    placeholder="Email Address"
                    className="flex justify-between items-center rounded-xl py-3 px-6 shadow-md w-full h-12 capitalize dark:bg-gray-600"
                  />
                  <MdOutlineEmail className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2" />
                </label>
                {errors.email && (
                  <span className="text-red-500 text-xs text-center">required</span>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <label className="relative">
                  <input
                    {...register('phoneNumber')}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="flex justify-between items-center rounded-xl py-3 px-6 shadow-md w-full h-12 capitalize dark:bg-gray-600"
                  />
                  <IoCallOutline className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2" />
                </label>
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs text-center">required</span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="relative">
                <textarea
                  {...register('message')}
                  name="message"
                  placeholder="Your Message"
                  className="flex justify-between items-center rounded-xl py-3 px-6 shadow-md w-full h-24 resize-none dark:bg-gray-600"
                />
                <FaRegMessage className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2" />
              </label>
              {errors.message && (
                <span className="text-red-500 text-xs text-center">required</span>
              )}
            </div>

            <Button label="Submit"  onClick={()=>submitting}/> 
                 
           
            
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
