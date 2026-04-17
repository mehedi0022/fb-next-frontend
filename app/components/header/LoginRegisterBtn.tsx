'use client';

import { useState } from "react";
import {
  DashboardOutlined,
  LoginOutlined,
  WhatsAppOutlined,
  UserOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import Link from "next/link";
import Profile from "./Profie";

type Props = {
  auth: boolean;
  from?: "navbar" | "drawer";
};

const LoginRegisterBtn = ({ auth, from = "navbar" }: Props) => {
  const isDrawer = from === "drawer";
  const [open, setOpen] = useState(false);

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
          href="/dashboard"
          className="btn-primary bg-black/80 text-white flex items-center gap-2 w-full justify-center py-2 px-4 rounded"
        >
          <DashboardOutlined />
          Dashboard
        </Link>
      ) : (
        <div className={`flex ${isDrawer ? "flex-col w-full" : "flex-row"} gap-3`}>
          <Link href="/register" className="btn-primary w-full flex items-center gap-2 py-2 px-4 rounded border">
            <UserAddOutlined /> Register
          </Link>

          <Link href="/auth/login" className="btn-primary w-full flex items-center gap-2 py-2 px-4 rounded border">
            <LoginOutlined /> Login
          </Link>
        </div>
      )}

      {/* WHATSAPP */}
      <a
        href="https://wa.me/8801777458099?text=Hello%20I%20want%20to%20order"
        target="_blank"
        className="btn-primary text-xl font-semibold"
      >
        <WhatsAppOutlined />
        WhatsApp
      </a>

      {/* USER + PROFILE DROPDOWN (Only for Desktop Navbar) */}
      {!isDrawer && auth && (
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
            <UserOutlined className="text-white text-xl" />
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="absolute right-0 top-full pt-2">
            <Profile open={open} />
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginRegisterBtn;