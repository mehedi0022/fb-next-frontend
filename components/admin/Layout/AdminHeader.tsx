"use client";

import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  MoonOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/appstore/hooks/hooks";
import { toggleSidebar } from "@/appstore/slices/sidebarSlice";
import { useLogoutMutation } from "@/appstore/api/authApi";
import { clearSession } from "@/appstore/slices/sessionSlice";
import { baseApi } from "@/appstore/api/baseApi";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);
  const [darkMode, setDarkMode] = useState(false);
  const [logout] = useLogoutMutation();
  // const {user, status} = useAuth();
  // console.log("AdminHeader", {user, status});

  const handleLogout = async () => {
    try {
      // Call logout API
      await logout().unwrap();

      // Clear Redux state first
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if API fails, clear local state and cookies
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
    } finally {
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
      toast.success("Logged out successfully");
    }
  };

  const userDropdownItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: <span className="text-sm">Profile</span>,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span className="text-sm">Logout</span>,
      danger: true,
      onClick: () => handleLogout(),
    },
  ];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="!bg-white !px-4 border-b border-gray-100 sticky top-0 z-50 !h-14 !leading-[56px]">
      <div className="flex items-center justify-between h-full">
        {/* ── Left ── */}
        <div className="flex items-center gap-2">
          {/* Sidebar toggle */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="
              flex items-center justify-center w-8 h-8 rounded-md
              text-gray-500 hover:bg-gray-100 hover:text-gray-800
              transition-colors duration-150
            "
          >
            {collapsed ? (
              <MenuUnfoldOutlined className="text-base" />
            ) : (
              <MenuFoldOutlined className="text-base" />
            )}
          </button>

          {/* Breadcrumb (optional) */}
          <span className="hidden sm:block text-sm text-gray-400 select-none">
            / Admin
          </span>
        </div>

        {/* ── Right ── */}
        <div className="flex items-center gap-1">
          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="
              flex items-center justify-center w-8 h-8 rounded-md
              text-gray-500 hover:bg-gray-100 hover:text-gray-800
              transition-colors duration-150
            "
          >
            <FullscreenOutlined className="text-base" />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode((p) => !p)}
            className="
              flex items-center justify-center w-8 h-8 rounded-md
              text-gray-500 hover:bg-gray-100 hover:text-gray-800
              transition-colors duration-150
            "
          >
            {darkMode ? (
              <SunOutlined className="text-base text-yellow-500" />
            ) : (
              <MoonOutlined className="text-base" />
            )}
          </button>

          {/* Notifications */}
          <Dropdown
            placement="bottomRight"
            arrow
            popupRender={() => (
              <div className="w-72 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="font-semibold text-sm text-gray-800">
                    Notifications
                  </span>
                  <span className="text-xs text-blue-500 cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                </div>

                {/* Items */}
                {[
                  {
                    title: "New seller registered",
                    time: "2 min ago",
                    dot: "bg-blue-500",
                  },
                  {
                    title: "Order #1023 completed",
                    time: "15 min ago",
                    dot: "bg-green-500",
                  },
                  {
                    title: "Payment received",
                    time: "1 hr ago",
                    dot: "bg-yellow-500",
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`}
                    />
                    <div>
                      <p className="text-sm text-gray-700">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <span className="text-xs text-blue-500 cursor-pointer hover:underline">
                    View all notifications
                  </span>
                </div>
              </div>
            )}
          >
            <button
              className="
              relative flex items-center justify-center w-8 h-8 rounded-md
              text-gray-500 hover:bg-gray-100 hover:text-gray-800
              transition-colors duration-150
            "
            >
              <BellOutlined className="text-base" />
              <span
                className="
                absolute top-1 right-1 w-2 h-2
                bg-red-500 rounded-full ring-2 ring-white
              "
              />
            </button>
          </Dropdown>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-1" />

          {/* User avatar + dropdown */}
          <Dropdown
            menu={{ items: userDropdownItems }}
            placement="bottomRight"
            arrow
          >
            <button
              className="
              flex items-center gap-2 pl-1 pr-2 py-1
              rounded-md hover:bg-gray-100 transition-colors duration-150
            "
            >
              <Avatar
                size={28}
                icon={<UserOutlined />}
                className="!bg-blue-500 shrink-0"
              />
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-xs font-semibold text-gray-700">
                  Admin
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  Super Admin
                </span>
              </div>
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
