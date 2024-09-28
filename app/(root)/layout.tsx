import React from "react";
import Navbar2 from "../components/Navbar2/Navbar2";
import Footer from "../components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar2 />

      <section className="flex flex-1 flex-col py-2 pb-6 sm:pb-8  px-6 sm:px-4 lg:px-10 dark:bg-bgDark">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </section>

      <Footer />
    </main>
  );
};

export default Layout;
