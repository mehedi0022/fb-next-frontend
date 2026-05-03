"use client";

import { COURSE_INFO, NAV_ITEMS, SELLER_INFO } from "@/lib/home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        group
        w-full sm:w-[190px] lg:w-[210px]
        sm:sticky sm:top-[100px]
        sm:h-[calc(100vh-100px)]
        flex flex-col flex-shrink-0
        overflow-y-visible sm:overflow-y-auto

        bg-[#d8d8d4]
        border-r border-[#bfc3c9]

        [scrollbar-width:none]
        hover:[scrollbar-width:thin]

        [&::-webkit-scrollbar]:w-0
        hover:[&::-webkit-scrollbar]:w-[3px]

        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-transparent
        hover:[&::-webkit-scrollbar-thumb]:bg-[#8b95a7]

        [&::-webkit-scrollbar-thumb]:rounded-full
      "
    >
      {/* ── Customer Portal ── */}
      <div
        className="
          p-4 pt-4 px-[14px] pb-[14px]
          bg-white
          mt-2 mx-2
          rounded-xl
          border border-[#d6d9df]
          shadow-sm
        "
      >
        <h3
          className="
            text-[12px]
            font-bold
            tracking-[0.08em]
            uppercase
            text-[#1f3c88]
            mb-2
          "
        >
          Customer Portal
        </h3>

        <ul className="flex flex-col gap-[4px]">
          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Seller code:</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {SELLER_INFO.sellerCode}
            </span>
          </li>

          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Email:</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {SELLER_INFO.email}
            </span>
          </li>

          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Phone:</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {SELLER_INFO.phone}
            </span>
          </li>

          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Domain:</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {SELLER_INFO.domain}
            </span>
          </li>
        </ul>
      </div>

      {/* ── Course Portal ── */}
      <div
        className="
          p-4 pt-4 px-[14px] pb-[14px]
          bg-white
          mt-2 mx-2
          rounded-xl
          border border-[#d6d9df]
          shadow-sm
        "
      >
        <h3
          className="
            text-[12px]
            font-bold
            tracking-[0.08em]
            uppercase
            text-[#1f3c88]
            mb-2
          "
        >
          Course Portal
        </h3>

        <ul className="flex flex-col gap-[4px]">
          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Course Name :</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {COURSE_INFO.courseName}
            </span>
          </li>

          <li className="text-[11px] leading-[1.5] text-[#6b7280]">
            <span className="text-[#7b8190] font-medium">Batch No :</span>{" "}
            <span className="text-[#111827] font-semibold break-all">
              {COURSE_INFO.batchNo}
            </span>
          </li>

          {[
            ["Teacher Name", COURSE_INFO.teacherName],
            ["Teacher WhatsApp", COURSE_INFO.teacherWhatsApp],
            ["Batch WhatsApp Group", COURSE_INFO.batchWhatsAppGroup],
            ["Total Class will show", COURSE_INFO.totalClassWillShow],
            ["Google Meet Link", COURSE_INFO.googleMeetLink],
            ["Course Completed Status", COURSE_INFO.courseCompletedStatus],
          ].map(([label, value]) => (
            <li
              key={label as string}
              className="text-[11px] leading-[1.5] text-[#6b7280]"
            >
              <span className="text-[#7b8190] font-medium">
                {label as string} :
              </span>{" "}
              <span className="text-[#111827] font-semibold break-all">
                {(value as string | null) ?? "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-wrap sm:flex-col flex-1 p-2 gap-1 mt-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block
                px-4
                py-3
                rounded-xl
                text-[14px]
                font-semibold
                transition-all
                duration-200
                border

                ${
                  isActive
                    ? `
                      bg-gradient-to-r from-[#1f3c88] to-[#2f5fd0]
                      text-white
                      border-[#1f3c88]
                      shadow-md
                    `
                    : `
                      bg-white/70
                      text-[#374151]
                      border-transparent
                      hover:bg-white
                      hover:border-[#c7ced9]
                      hover:text-[#1f3c88]
                    `
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}