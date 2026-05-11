"use client";

import { useState, useRef, useEffect } from "react";
import {
  DashboardOutlined,
  LoginOutlined,
  WhatsAppOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Profile from "./Profile";
import { useRole } from "@/appstore/hooks/hooks";

type Props = {
  auth: boolean;
  from?: "navbar" | "drawer";
};

const LoginRegisterBtn = ({ auth, from = "navbar" }: Props) => {
  const isDrawer = from === "drawer";
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { role, isLoading } = useRole();

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  if (isLoading) return <div>Loading.......</div>;

  return (
    <div
      className={`
        ${isDrawer ? "flex flex-col w-full" : "hidden lg:flex items-center"}
        gap-4 relative
      `}
    >
      {/* AUTH */}
      {auth ? (
        <Link
          href={
            role === "admin" || role === "super_admin" ? "/admin" : "/dashboard"
          }
          className="btn-primary bg-black/80 text-white flex items-center gap-2 w-full justify-center py-2 px-4 rounded"
        >
          <DashboardOutlined />
          ড্যাশবোর্ড
        </Link>
      ) : (
        <div
          className={`flex ${isDrawer ? "flex-col w-full" : "flex-row"} gap-3`}
        >
          <Link
            href="/register"
            className="btn-primary w-full flex items-center gap-2 py-2 px-4 rounded "
          >
            <UserAddOutlined /> রেজিস্ট্রেশন
          </Link>

          <Link
            href="/login"
            className="btn-primary w-full flex items-center gap-2 py-2 px-4 rounded "
          >
            <LoginOutlined /> লগইন
          </Link>
        </div>
      )}

      {/* WHATSAPP */}
      <a
        href="https://wa.me/8801777458099?text=Hello%20I%20want%20to%20order"
        target="_blank"
        className="btn-whatsapp text-xl font-semibold "
      >
        <WhatsAppOutlined />
        WhatsApp
      </a>

      {/* USER + PROFILE DROPDOWN (Only for Desktop Navbar) */}
      {!isDrawer && auth && (
        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <UserOutlined className="text-white text-xl" />
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="absolute right-0 top-full pt-2">
            <Profile open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterBtn;
