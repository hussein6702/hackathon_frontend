"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#000000] w-full font-medium">
      {/* Desktop Navbar */}
      <ul className="hidden lg:flex items-center justify-center space-x-8">
        <li className="relative group">
          <Link href="/admin" className="relative text-lg">
            Admin
            <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full group-hover:left-0" />
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
