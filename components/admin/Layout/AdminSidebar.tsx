// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronDown, ChevronRight, Circle } from "lucide-react";
// import { useAppSelector } from "@/appstore/hooks/hooks";
// import { AdminNAV_ITEMS } from "@/lib/admin/contants";
// import { Tooltip as AntTooltip } from "antd";
// import Image from "next/image";

// function Tooltip({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <AntTooltip title={label} placement="right" mouseEnterDelay={0.2}>
//       <span className="inline-flex w-full">{children}</span>
//     </AntTooltip>
//   );
// }

// export default function Sidebar() {
//   const pathname = usePathname();
//   const collapsed = useAppSelector((state) => state.sidebar.collapsed);

//   const defaultOpen =
//     AdminNAV_ITEMS.find((item) =>
//       item.children?.some((child) => pathname.startsWith(child.href)),
//     )?.label ?? null;

//   const [openItem, setOpenItem] = useState<string | null>(defaultOpen);

//   const toggleItem = (label: string) => {
//     setOpenItem((prev) => (prev === label ? null : label));
//   };

//   return (
//     <>
//       <style>{`
//         .sidebar-scroll::-webkit-scrollbar { width: 4px; }
//         .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
//         .sidebar-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 999px; transition: background 0.2s; }
//         .sidebar-scroll:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
//         .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//       `}</style>

//       <aside
//         // className={`flex h-screen flex-col border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out overflow-hidden ${collapsed ? "w-14" : "w-56"} sticky top-0 shrink-0`}

//           className={`
//     fixed md:sticky
//     top-0 left-0
//     z-[999]
//     h-screen
//     shrink-0
//     overflow-hidden
//     border-r border-slate-200
//     bg-white
//     transition-all duration-300 ease-in-out

//     /* Mobile */
//     ${
//       collapsed
//         ? "-translate-x-full"
//         : "translate-x-0"
//     }

//     w-screen

//     /* Desktop */
//     md:translate-x-0
//     ${
//       collapsed
//         ? "md:w-14"
//         : "md:w-56"
//     }
//   `}
//       >
//         {/* Logo */}
//         <div className="flex !h-14 items-center justify-center border-b border-slate-100  shrink-0">
//           <figure>
//             <Image
//               src="/favicon.ico"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="ml-1"
//             />
//           </figure>
//         </div>

//         {/* Nav */}
//         <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
//           {/* MENU label */}
//           <div
//             className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? "max-h-0 opacity-0 mb-0" : "max-h-8 opacity-100 mb-2"}`}
//           >
//             <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//               Menu
//             </p>
//           </div>

//           <ul className="space-y-0.5">
//             {AdminNAV_ITEMS.map((item) => {
//               const isOpen = !collapsed && openItem === item.label;
//               const hasChildren = !!item.children?.length;
//               const isActive = hasChildren
//                 ? item.children!.some((c) => pathname.startsWith(c.href))
//                 : pathname === item.href;

//               const itemClass = `group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
//                 isActive
//                   ? "bg-sky-50 text-sky-600"
//                   : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//               }`;

//               const iconClass = `h-4 w-4 shrink-0 transition-colors ${
//                 isActive
//                   ? "text-sky-500"
//                   : "text-slate-400 group-hover:text-slate-600"
//               }`;

//               const badge = item.badge !== undefined && (
//                 <span className="flex w-4 h-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
//                   {item.badge}
//                 </span>
//               );

//               return (
//                 <li key={item.label}>
//                   {/* Leaf item */}
//                   {!hasChildren && item.href ? (
//                     collapsed ? (
//                       <Tooltip label={item.label}>
//                         <Link href={item.href} className={itemClass}>
//                           <item.icon className={iconClass} />
//                         </Link>
//                       </Tooltip>
//                     ) : (
//                       <Link href={item.href} className={itemClass}>
//                         <item.icon className={iconClass} />
//                         <span className="flex-1 truncate">{item.label}</span>
//                         {badge}
//                       </Link>
//                     )
//                   ) : /* Parent item */
//                   collapsed ? (
//                     <Tooltip label={item.label}>
//                       <button className={itemClass}>
//                         <item.icon className={iconClass} />
//                       </button>
//                     </Tooltip>
//                   ) : (
//                     <button
//                       onClick={() => toggleItem(item.label)}
//                       className={itemClass}
//                     >
//                       <item.icon className={iconClass} />
//                       <span className="flex-1 text-left truncate">
//                         {item.label}
//                       </span>
//                       {badge}
//                       {isOpen ? (
//                         <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
//                       ) : (
//                         <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
//                       )}
//                     </button>
//                   )}

//                   {/* Children */}
//                   {hasChildren && !collapsed && (
//                     <div
//                       className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
//                     >
//                       <ul className="mt-0.5 ml-3 space-y-0.5 border-l border-slate-200 pl-3">
//                         {item.children!.map((child) => {
//                           const childActive = pathname === child.href;
//                           return (
//                             <li key={child.label}>
//                               <Link
//                                 href={child.href}
//                                 className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
//                                   childActive
//                                     ? "text-sky-600"
//                                     : "text-slate-500 hover:text-slate-800"
//                                 }`}
//                               >
//                                 <Circle
//                                   className={`h-1.5 w-1.5 shrink-0 fill-current ${childActive ? "text-sky-500" : "text-slate-300"}`}
//                                 />
//                                 {child.label}
//                               </Link>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Circle, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/appstore/hooks/hooks";
import { setSidebar } from "@/appstore/slices/sidebarSlice";
import { AdminNAV_ITEMS } from "@/lib/admin/contants";
import { Tooltip as AntTooltip } from "antd";
import Image from "next/image";

// function Tooltip({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <AntTooltip title={label} placement="right" mouseEnterDelay={0.2}>
//       <span className="inline-flex w-full">{children}</span>
//     </AntTooltip>
//   );
// }

type NavChild = { label: string; href: string };

function Tooltip({
  label,
  href,
  items,
  children,
}: {
  label: string;
  href?: string; // leaf item link
  items?: NavChild[]; // parent item children
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hasItems = !!items?.length;

  const tooltipContent = hasItems ? (
    // Parent item → show group label + all child links
    <div className="py-0.5 min-w-[150px]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1 pb-1.5 mb-1 border-b border-white/10">
        {label}
      </p>
      {items!.map((child) => {
        const isActive = pathname === child.href;
        return (
          <Link
            key={child.href}
            href={child.href}
            className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
              isActive
                ? "bg-white/15 text-sky-400"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Circle
              className={`h-1.5 w-1.5 shrink-0 fill-current ${
                isActive ? "text-sky-400" : "text-slate-500"
              }`}
            />
            {child.label}
          </Link>
        );
      })}
    </div>
  ) : href ? (
    // Leaf item → single clickable link
    <Link
      href={href}
      className={`block px-2 py-1 rounded-md text-xs font-medium transition-colors ${
        pathname === href ? "text-sky-400" : "text-slate-200 hover:text-white"
      }`}
    >
      {label}
    </Link>
  ) : (
    // Fallback → plain label
    <span className="px-1 text-xs">{label}</span>
  );

  return (
    <AntTooltip
      title={tooltipContent}
      placement="right"
      mouseEnterDelay={0.2}
      overlayInnerStyle={{
        padding: "6px",
        borderRadius: "8px",
        minWidth: hasItems ? 160 : "auto",
      }}
    >
      <span className="inline-flex w-full">{children}</span>
    </AntTooltip>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    // Handle crossing the breakpoint
    const handler = (e: MediaQueryListEvent) => {
      dispatch(setSidebar(e.matches));
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [dispatch]);

  const defaultOpen =
    AdminNAV_ITEMS.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href)),
    )?.label ?? null;

  const [openItem, setOpenItem] = useState<string | null>(defaultOpen);

  const toggleItem = (label: string) => {
    setOpenItem((prev) => (prev === label ? null : label));
  };

  // Closes sidebar on mobile
  const closeMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      dispatch(setSidebar(true));
    }
  };

  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 999px; transition: background 0.2s; }
        .sidebar-scroll:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* ── Backdrop (mobile only) ───────────────────────────────────────────── */}
      {!collapsed && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar panel ────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          z-[999]
          flex flex-col
          h-screen
          shrink-0
          overflow-hidden
          border-r border-slate-200
          bg-white
          transition-all duration-300 ease-in-out

          /* Mobile: slide in/out, 60 vw wide */
          ${collapsed ? "-translate-x-full" : "translate-x-0"}
          w-[60vw]

          /* Desktop: never translate, icon or full width */
          md:translate-x-0
          ${collapsed ? "md:w-14" : "md:w-56"}
        `}
      >
        {/* Logo + mobile close button */}
        <div className="flex h-14 items-center justify-between md:justify-center border-b border-slate-100 px-3 shrink-0">
          <figure>
            <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
          </figure>

          {/* Close button — hidden on desktop */}
          <button
            onClick={closeMobile}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          {/* MENU label */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              collapsed ? "max-h-0 opacity-0 mb-0" : "max-h-8 opacity-100 mb-2"
            }`}
          >
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Menu
            </p>
          </div>

          <ul className="space-y-0.5">
            {AdminNAV_ITEMS.map((item) => {
              const isOpen = !collapsed && openItem === item.label;
              const hasChildren = !!item.children?.length;
              const isActive = hasChildren
                ? item.children!.some((c) => pathname.startsWith(c.href))
                : pathname === item.href;

              const itemClass = `group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`;

              const iconClass = `h-4 w-4 shrink-0 transition-colors ${
                isActive
                  ? "text-sky-500"
                  : "text-slate-400 group-hover:text-slate-600"
              }`;

              const badge = item.badge !== undefined && (
                <span className="flex w-4 h-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              );

              return (
                <li key={item.label}>
                  {/* Leaf item */}
                  {!hasChildren && item.href ? (
                    collapsed ? (
                      <Tooltip label={item.label} href={item.href}>
                        <Link href={item.href} className={itemClass}>
                          <item.icon className={iconClass} />
                        </Link>
                      </Tooltip>
                    ) : (
                      <Link
                        href={item.href}
                        className={itemClass}
                        onClick={closeMobile} // close drawer on nav on mobile
                      >
                        <item.icon className={iconClass} />
                        <span className="flex-1 truncate">{item.label}</span>
                        {badge}
                      </Link>
                    )
                  ) : collapsed ? (
                    <Tooltip label={item.label} items={item.children}>
                      <button className={itemClass}>
                        <item.icon className={iconClass} />
                      </button>
                    </Tooltip>
                  ) : (
                    <button
                      onClick={() => toggleItem(item.label)}
                      className={itemClass}
                    >
                      <item.icon className={iconClass} />
                      <span className="flex-1 text-left truncate">
                        {item.label}
                      </span>
                      {badge}
                      {isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </button>
                  )}

                  {/* Children */}
                  {hasChildren && !collapsed && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="mt-0.5 ml-3 space-y-0.5 border-l border-slate-200 pl-3">
                        {item.children!.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                                  childActive
                                    ? "text-sky-600"
                                    : "text-slate-500 hover:text-slate-800"
                                }`}
                                onClick={closeMobile} // close drawer on nav on mobile
                              >
                                <Circle
                                  className={`h-1.5 w-1.5 shrink-0 fill-current ${
                                    childActive
                                      ? "text-sky-500"
                                      : "text-slate-300"
                                  }`}
                                />
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
