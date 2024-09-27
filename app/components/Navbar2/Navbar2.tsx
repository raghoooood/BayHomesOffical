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
    <header className="fixed border-b border-n-6 bg-n-80/90 dark:bg-bgDark backdrop-blur-3xl top-0 left-0 w-full h-20 shadow-xl flex justify-between items-center z-40 p-5 sm:p-10 transition-all duration-300">
      <div className="flex items-center p-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <nav className="hidden md:flex ml-10 items-center space-x-6">
        <NavMenu onMenuClick={() => setHeaderOpen(false)} />
        <CurrencyDropdown />
      </nav>

      <div className="hidden md:flex items-center space-x-4 p-2">
        <ButtonProp
          label="List Your Property"
          onClick={() => router.push('/list-your-property')}
          icon={MdArrowOutward}
          outline
          navoutline
        />
        <ThemeChanger />
      </div>

      <div className="md:hidden flex items-center space-x-2 p-2">
        <ButtonProp
          label="List Your Property"
          onClick={() => router.push('/list-your-property')}
          icon={MdArrowOutward}
          outline
          navoutline
        />
        <CurrencyDropdown />
        <ThemeChanger />
        <button onClick={toggleHeader} className="p-4 z-10">
          {headerOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>
      </div>
      <div
        className={`${
          headerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-white dark:bg-bgDark text-center transition-transform duration-300`}>
        <div className="w-full px-8">
          <NavMenu onMenuClick={() => setHeaderOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Navbar2;
