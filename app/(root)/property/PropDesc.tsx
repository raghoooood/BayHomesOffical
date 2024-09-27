'use client'
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface PropertyDescrProps {
  description: string;
}

const PropertyDesc: React.FC<PropertyDescrProps> = ({ description }) => {
  const [sanitizedDescription, setSanitizedDescription] = useState('');

  useEffect(() => {
    // Sanitize the description content to avoid XSS attacks on the client side
    if (typeof window !== 'undefined' && description) {
      setSanitizedDescription(DOMPurify.sanitize(description));
    }
  }, [description]);

  return (
    <div className="space-y-4">
      <div
        className="font-normal text-black leading-6 dark:text-white"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
};

export default PropertyDesc;
