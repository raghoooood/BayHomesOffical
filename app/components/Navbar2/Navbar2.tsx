'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "./Logo";
import ThemeChanger from "@/app/components/themeChanger";
import NavMenu from "./NavMenu";
import ButtonProp from "../buttons/ButtonProp";
import CurrencyDropdown from "../currencyConverter/CurrencyDropdown";

const Navbar2 = () => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const router = useRouter();

  const toggleHeader = () => setHeaderOpen((prev) => !prev);

  return (
    <header className="fixed border-b border-n-6 bg-n-80/90 dark:bg-bgDark backdrop-blur-3xl top-0 left-0 w-full h-16 sm:h-20 shadow-xl flex justify-between items-center z-40 p-4 sm:p-5 transition-all duration-300">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" className="block w-10 sm:w-12">
          <Logo />
        </Link>
      </div>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex ml-6 items-center space-x-4 sm:space-x-6">
        <NavMenu onMenuClick={() => setHeaderOpen(false)} />
        <CurrencyDropdown />
      </nav>

      {/* Desktop Buttons and Theme Changer */}
      <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
        <ButtonProp
          label="List Your Property"
          onClick={() => router.push('/list-your-property')}
          icon={MdArrowOutward}
          outline
          navoutline
        />
        <ThemeChanger />
      </div>

      {/* Mobile Menu & Actions */}
      <div className="md:hidden flex items-center space-x-2">
        <ButtonProp
          label="List Your Property"
          onClick={() => router.push('/list-your-property')}
          icon={MdArrowOutward}
          outline
          navoutline
          small // Make button smaller for mobile
        />
        <CurrencyDropdown />
        <ThemeChanger />

        {/* Hamburger Menu Button */}
        <button onClick={toggleHeader} className="p-2 z-10">
          {headerOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${
          headerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-0 left-0 w-full h-screen bg-white dark:bg-bgDark text-center flex justify-center items-center transition-transform duration-300`}>
        <div className="w-full p-6">
          <NavMenu onMenuClick={() => setHeaderOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Navbar2;
