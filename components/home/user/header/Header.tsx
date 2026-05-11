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
import { NavigationItem } from '@/lib/home';
import { useAppSelector } from '@/appstore/hooks/hooks';
import { selectIsAuthenticated, selectUser } from '@/appstore/slices/sessionSlice';

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const navigationItems: NavigationItem[] = [
    { label: 'আমাদের সম্পর্কে', href: '/about', icon: BlockOutlined },
    { label: 'ক্যাটাগরি', href: '/categories', icon: AppstoreOutlined },
    { label: 'প্রোডাক্ট', href: '/products', icon: AppstoreOutlined },
    { label: 'যোগাযোগ', href: '/contact', icon: BookOutlined },
  ];

  return (
    <>
      <header
        className="w-full sticky top-0 z-50 py-3 px-6"
        style={{
          background: 'linear-gradient(135deg, #2d1b4e 0%, #1a1a3e 40%, #1e2a5e 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 bg-white/5 rounded-2xl px-5 border border-white/10 backdrop-blur-sm">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/assets/FB.png" alt="logo" width={80} height={32} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-black/30 rounded-xl px-2 py-1.5 mx-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap
                      ${isActive
                        ? 'nav-link-cta text-white'
                        : 'text-white hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <LoginRegisterBtn auth={auth} from="navbar" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-white text-xl p-2"
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* ================= DRAWER ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="fixed top-0 left-0 w-[80%] max-w-sm h-full z-50 flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #2d1b4e 0%, #1a1a3e 50%, #1e2a5e 100%)',
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image src="/assets/FB.png" alt="logo" width={90} height={28} />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/15 transition"
                >
                  <CloseOutlined />
                </button>
              </div>

              {/* User Section */}
              <div className="p-5 flex items-center gap-3 border-b border-white/10 bg-white/5">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-purple-500/20 border border-purple-400/30">
                  <UserOutlined className="text-lg text-purple-300" />
                </div>
                {auth ? (
                  <div>
                    <p className="font-medium text-white text-[15px]">{user?.name ?? user?.email}</p>
                    <p className="text-xs text-purple-300 mt-0.5">{user?.role}</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-white text-[15px]">Guest User</p>
                    <p className="text-xs text-purple-300 mt-0.5">Login to continue</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative
                        ${isActive
                          ? 'nav-link-cta-drawer text-white'
                          : 'border border-transparent hover:bg-white/5'
                        }`}
                    >
                      <Icon
                        className={`text-base transition-transform group-hover:scale-110 ${
                          isActive ? 'text-purple-300' : 'text-white/40'
                        }`}
                      />
                      <span
                        className={`text-[15px] font-medium ${
                          isActive ? 'text-white' : 'text-white/65'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Footer Buttons */}
              <div className="p-4 border-t border-white/10 bg-white/5">
                <LoginRegisterBtn auth={auth} from="drawer" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}