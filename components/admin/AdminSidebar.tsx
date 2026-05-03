"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/appstore/hooks/hooks";
import { toggleSidebar } from "@/appstore/slices/sidebarSlice";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";
import { LayoutDashboard, Users, ShoppingCart } from "lucide-react";

/* ---------------- MENU CONFIG ---------------- */
export const menu = [
  {
    group: "MENU",
    items: [
      {
        label: "Dashboards",
        icon: LayoutDashboard,
        path: "/admin",
        badge: 1,
      },
      {
        label: "Students",
        icon: Users,
        children: [{ label: "Student List", path: "/admin/students/list" }],
      },
      {
        label: "Orders",
        icon: ShoppingCart,
        children: [{ label: "Order List", path: "/admin/orders/list" }],
      },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */
export default function Sidebar() {
  const collapsed = useAppSelector((s) => s.sidebar.collapsed);
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      className={`h-screen bg-white border-r flex flex-col transition-all duration-300 overflow-visible relative
  ${collapsed ? "w-[70px]" : "w-[230px]"}`}
    >
      {/* 🔷 HEADER */}
      <div className="h-14 flex items-center justify-between px-3 border-b shrink-0">
        {!collapsed && (
          <span className="font-bold text-blue-600">FreelancerBD</span>
        )}

        <button onClick={() => dispatch(toggleSidebar())}>
          <Menu size={18} />
        </button>
      </div>

      {/* 🔷 MENU */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-4">
        {menu.map((group) => (
          <div key={group.group}>
            {/* GROUP TITLE */}
            {!collapsed && (
              <p className="text-[10px] font-semibold text-gray-400 px-2 mb-2">
                {group.group}
              </p>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isOpen = open === item.label;

              const isActive =
                pathname === item.path ||
                item.children?.some((c) => pathname === c.path);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* 🔹 MAIN ITEM */}
                  <div
                    onClick={() => {
                      if (item.children) {
                        setOpen(isOpen ? null : item.label);
                      } else if (item.path) {
                        router.push(item.path);
                      }
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {!collapsed && <span>{item.label}</span>}
                    </div>

                    {!collapsed && item.children && (
                      <ChevronRight
                        size={16}
                        className={`transition ${isOpen ? "rotate-90" : ""}`}
                      />
                    )}
                  </div>

                  {/* 🔽 EXPANDED MODE */}
                  {!collapsed && isOpen && item.children && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const active = pathname === child.path;

                        return (
                          <div
                            key={child.path}
                            onClick={() => router.push(child.path)}
                            className={`text-sm px-3 py-2 rounded-md cursor-pointer transition
                            ${
                              active
                                ? "text-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            • {child.label}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 🔥 COLLAPSED HOVER MENU (FIXED) */}
                  {collapsed && hovered === item.label && item.children && (
                    <>
                      {/* invisible hover bridge */}
                      <div className="absolute left-full top-0 w-3 h-full" />

                      <div className="absolute left-[100%] top-0 ml-2 min-w-[220px] bg-white border rounded-xl shadow-xl z-[9999]">
                        <div className="px-3 py-2 font-semibold border-b">
                          {item.label}
                        </div>

                        {item.children.map((child) => (
                          <div
                            key={child.path}
                            onClick={() => router.push(child.path)}
                            className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
