"use client"

interface Props {
    children: React.ReactNode;
    className?: string;
  }
  
  const BlogContainer = ({ children, className }: Props) => {
    return (
      <div className={`max-w-screen-lg mx-auto ${className}`}>{children}</div>
    );
  };
  
  export default BlogContainer;
  