'use client';

import { useState } from "react";
import {
  LayoutDashboard,
  LogIn,
  MessageCircleMore,
  User2,
  UserPlus
} from "lucide-react";
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
          className="btn-primary bg-black/80 text-white flex items-center gap-2 w-full justify-center"
        >
          <LayoutDashboard />
          Dashboard
        </Link>
      ) : (
        <div className={`flex ${isDrawer ? "flex-col w-full" : "flex-row"} gap-3`}>
          <Link href="/auth/register" className="btn-primary w-full flex items-center gap-2">
            <UserPlus /> Register
          </Link>

          <Link href="/auth/login" className="btn-primary w-full flex items-center gap-2">
            <LogIn /> Login
          </Link>
        </div>
      )}

      {/* WHATSAPP */}
      <a
        href="https://wa.me/8801777458099?text=Hello%20I%20want%20to%20order"
        target="_blank"
        className="btn-primary flex items-center gap-2 w-full"
      >
        <MessageCircleMore />
        WhatsApp
      </a>

      {/* USER + PROFILE DROPDOWN */}
      {!isDrawer && auth && (
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30">
            <User2 className="text-white" />
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="absolute right-0 top-10">
            <Profile open={open}  />
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginRegisterBtn;