export interface Testimonial {
    id: number;
    name: string;
    date: string;
    testimonialTitle: string;
    testimonial: string;
    rating: number;
  }
  
  export const testimonials: Testimonial[] = [
    { 
      id: 1,
      name: 'Jane Doe',
      date: 'August 15, 2024', 
      testimonialTitle:'Great',
      testimonial: 'Great service!',
      rating: 5
    },
    { 
      id: 2,
      name: 'John Smith', 
      date: 'August 16, 2024', 
      testimonialTitle:'recommended',
      testimonial: 'I highly recommend them!', 
      rating: 4
    },
    { 
      id: 3,
      name: 'Alice Johnson', 
      date: 'August 17, 2024', 
      testimonialTitle:'professional',
      testimonial: 'Very professional and friendly!', 
      rating: 5
    },
    { 
      id: 4,
      name: 'Bob Brown', 
      date: 'August 18, 2024', 
      testimonialTitle:'efficient',
      testimonial: 'Quick and efficient service!', 
      rating: 4
    },
    // Add more testimonials as needed
  ];
  