import { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
}

const Container = ({children} : ContainerProps) => {
  return (
    <div className="
      max-w-[2800px] 
      mx-auto
      py-8
      
    ">
      {children}
    </div>
  );
}

export default Container;
