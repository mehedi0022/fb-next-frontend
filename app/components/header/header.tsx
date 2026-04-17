'use client';

import React, { useState } from 'react';
import { 
  MenuOutlined, 
  CloseOutlined, 
  BlockOutlined, 
  AppstoreOutlined, 
  BookOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import LoginRegisterBtn from './LoginRegisterBtn';
import { NavigationItem } from '@/lib';

const testData = {
  name: 'Peyal Hasan',
  url: 'https://avatars.githubusercontent.com/u/155246181?v=4'
};

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = false;

  const navigationItems: NavigationItem[] = [
    { label: 'আমাদের সম্পর্কে', href: '/about', icon: BlockOutlined },
    { label: 'ক্যাটাগরি', href: '/categories', icon: AppstoreOutlined },
    { label: 'প্রোডাক্ট', href: '/products', icon: AppstoreOutlined },
    { label: 'যোগাযোগ', href: '/contact', icon: BookOutlined },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/FB.png" alt="logo" width={100} height={30} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-4">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-lg font-medium transition-all ${
                    isActive 
                      ? 'text-white border-b-2 border-secondary pb-1' 
                      : 'text-white hover:text-ternary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right (Desktop only) */}
          <LoginRegisterBtn auth={auth} from="navbar" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white text-xl"
          >
            <MenuOutlined />
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
                <button onClick={() => setIsMenuOpen(false)} className="text-lg">
                  <CloseOutlined />
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
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                    <UserOutlined className="text-2xl text-gray-400" />
                  </div>
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
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition group ${
                        isActive 
                          ? 'bg-blue-100 border-l-4 border-blue-600' 
                          : 'hover:bg-blue-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className={`group-hover:scale-110 transition text-lg ${
                        isActive ? 'text-blue-700' : 'text-blue-600'
                      }`} />
                      <span className={`font-medium ${
                        isActive ? 'text-blue-800' : 'text-gray-700'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* FOOTER ACTIONS (Mobile) */}
              <div className="p-4 border-t">
                <LoginRegisterBtn auth={auth} from="drawer" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}