'use client';

import React, { useState } from 'react';
import { Menu, X, Package, Layers, BookOpen, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import LoginResisterBtn from './LoginResiterBtn';

interface NavigationItem {
  label: string;
  href: string;
  icon: any;
}

const testData = {
  name: 'Peyal Hasan',
  url: 'https://avatars.githubusercontent.com/u/155246181?v=4'
};

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = false;

  const navigationItems: NavigationItem[] = [
    { label: 'আমাদের সম্পর্কে', href: '/services', icon: Layers },
    { label: 'ক্যাটাগরি', href: '/categories', icon: Package },
    { label: 'প্রোডাক্ট', href: '/products', icon: Package },
    { label: 'যোগাযোগ', href: '/contact', icon: BookOpen },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/FB.png" alt="logo" width={120} height={40} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-lg font-medium hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right (Desktop only) */}
          <LoginResisterBtn auth={auth} from="navbar" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
              className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col"
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
                {auth ? (
                  <Image
                    className="rounded-full border-2 border-secondary"
                    src={testData.url}
                    width={60}
                    height={60}
                    alt={testData.name}
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}

                {auth && (
                  <div>
                    <p className="font-semibold">{testData.name}</p>
                    <p className="text-sm text-gray-500">User</p>
                  </div>
                )}
              </div>

              {/* NAVIGATION */}
              <div className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="text-blue-600 group-hover:scale-110 transition" />
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* FOOTER ACTIONS (Mobile) */}
              <div className="p-4 border-t">
                <LoginResisterBtn auth={auth} from="drawer" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}