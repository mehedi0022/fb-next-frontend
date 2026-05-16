"use client";

import { COURSE_INFO, NAV_ITEMS, SELLER_INFO } from "@/lib/home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-y-auto">
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Customer Portal
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li>
            <span className="font-medium text-slate-500">Seller code:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {SELLER_INFO.sellerCode}
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-500">Email:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {SELLER_INFO.email}
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-500">Phone:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {SELLER_INFO.phone}
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-500">Domain:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {SELLER_INFO.domain}
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Course Portal
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-600">
          <li>
            <span className="font-medium text-slate-500">Course Name:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {COURSE_INFO.courseName}
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-500">Batch:</span>{" "}
            <span className="break-all font-semibold text-slate-800">
              {COURSE_INFO.batchNo}
            </span>
          </li>
          {[
            ["Teacher Name", COURSE_INFO.teacherName],
            ["Teacher WhatsApp", COURSE_INFO.teacherWhatsApp],
            ["Batch WhatsApp Group", COURSE_INFO.batchWhatsAppGroup],
            ["Total Class", COURSE_INFO.totalClassWillShow],
            ["Google Meet Link", COURSE_INFO.googleMeetLink],
            ["Course Completion", COURSE_INFO.courseCompletedStatus],
          ].map(([label, value]) => (
            <li key={label as string}>
              <span className="font-medium text-slate-500">{label as string}:</span>{" "}
              <span className="break-all font-semibold text-slate-800">
                {(value as string | null) ?? "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <nav className="grid grid-cols-1 gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
