'use client';

import React, { useState } from 'react';
import { Menu, X, Phone, User2, LayoutDashboard, Package, Layers, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationItem {
  label: string;
  href: string;
  icon: any;
}

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'আমাদের সম্পর্কে', href: 'services', icon: Layers },
    { label: 'ক্যাটাগরি', href: 'categories', icon: Package },
    { label: 'প্রোডাক্ট', href: 'products', icon: Package },
    { label: 'যোগাযোগ', href: 'contract', icon: BookOpen },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/FB.png" alt="logo" width={60} height={60} />
            <span className="text-white font-bold text-lg hidden sm:block">
              Freelancer BD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white relative group font-medium"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">

            <Link
              href="/dashboard"
              className="px-4 py-2 bg-black/80 hover:bg-black text-white rounded-lg text-sm transition"
            >
              📊 ড্যাশবোর্ড
            </Link>

            <a
              href="tel:+8801777458099"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 text-sm transition"
            >
              <Phone size={16} />
              Call
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <User2 className="text-white" />
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* LEFT DRAWER */}
      {/* ========================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-ternary z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X />
                </button>
              </div>

              {/* USER SECTION */}
              <div className="p-5 flex items-center gap-3 border-b bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                  P
                </div>
                <div>
                  <p className="font-semibold">Peyal Hasan</p>
                  <p className="text-sm text-gray-500">User</p>
                </div>
              </div>

              {/* NAVIGATION */}
              <div className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition group"
                    >
                      <Icon className="text-blue-600 group-hover:scale-110 transition" />
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* FOOTER ACTIONS */}
              <div className="p-4 border-t space-y-3">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-black text-white rounded-lg"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                <a
                  href="tel:+8801777458099"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-orange-500 text-white rounded-lg"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}