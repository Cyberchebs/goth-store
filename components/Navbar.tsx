"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Logo from "../public/logo.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconClass = `w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-gray-800'}`;

  return (
    <div className='px-5'>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-gray-200 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 w-full">

            
            <div className="flex items-center space-x-9">
              <Link href="/nextpage?gender=male" className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-800 hover:text-black'
              }`}>
                MEN
              </Link>
              <Link href="/nextpage?gender=female" className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-800 hover:text-black'
              }`}>
                WOMEN
              </Link>
            </div>

            
            <div className="absolute left-1/2 transform -translate-x-1/2">
               <Image
                src={Logo}
                alt="Goth Heaven Logo"
                width={250}
                height={100}
                className={`transition-opacity duration-300 ${
                  isScrolled ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            
            <div className="flex items-center space-x-6">
              
              <button className="transition-colors duration-300">
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

            
              <Link href="/cart" className="relative transition-colors duration-300">
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none min-w-[18px] min-h-[18px] px-0.5">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
