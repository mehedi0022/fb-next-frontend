'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
}

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { label: 'আমাদের সেবা', href: '#' },
    { label: 'ক্যাটাগরি', href: '#' },
    { label: 'প্রোডাক্ট', href: '#' },
    { label: 'প্রশিক্ষণ', href: '#' },
  ];

  const languages: string[] = ['BN', 'EN'];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 font-bold text-xl">KFH</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight">
                Freelancer Bangladesh
              </div>
              <div className="text-blue-100 text-xs">Professional Services</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 ml-12">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white font-medium text-sm hover:text-blue-100 transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Section - Buttons & Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Dashboard Button */}
            <button 
              type="button"
              aria-label="Dashboard"
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>📊</span>
              ড্যাশবোর্ড
            </button>

            {/* Phone Button */}
            <a
              href="tel:+8801777458099"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transform"
            >
              <Phone size={18} />
              +8801777458099
            </a>

            {/* Language Dropdown */}
            <div className="relative group">
              <button
                type="button"
                aria-label="Language selector"
                className="px-3 py-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                MS
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-0 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 font-medium text-sm first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-700 border-t border-blue-500 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-3">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <div className="pt-3 border-t border-blue-500 space-y-2">
              <button 
                type="button"
                className="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg transition-colors"
              >
                📊 ড্যাশবোর্ড
              </button>
              <a
                href="tel:+8801777458099"
                className="w-full px-4 py-2 bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                +8801777458099
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}