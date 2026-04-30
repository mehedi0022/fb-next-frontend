"use client";

import { COURSE_INFO, NAV_ITEMS, SELLER_INFO } from "@/lib/home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* ── Customer Portal ── */}
      <div className="portal-box">
        <h3 className="portal-title">Customer Portal</h3>
        <ul className="portal-info">
          <li>
            <span className="info-label">Seller code:</span>{" "}
            <span className="info-value">{SELLER_INFO.sellerCode}</span>
          </li>
          <li>
            <span className="info-label">Email:</span>{" "}
            <span className="info-value">{SELLER_INFO.email}</span>
          </li>
          <li>
            <span className="info-label">Phone:</span>{" "}
            <span className="info-value">{SELLER_INFO.phone}</span>
          </li>
          <li>
            <span className="info-label">Domain:</span>{" "}
            <span className="info-value">{SELLER_INFO.domain}</span>
          </li>
        </ul>
      </div>

      {/* ── Course Portal ── */}
      <div className="portal-box">
        <h3 className="portal-title">Course Portal</h3>
        <ul className="portal-info">
          <li>
            <span className="info-label">Course Name :</span>{" "}
            <span className="info-value">{COURSE_INFO.courseName}</span>
          </li>
          <li>
            <span className="info-label">Batch No :</span>{" "}
            <span className="info-value">{COURSE_INFO.batchNo}</span>
          </li>
          {[
            ["Teacher Name", COURSE_INFO.teacherName],
            ["Teacher WhatsApp", COURSE_INFO.teacherWhatsApp],
            ["Batch WhatsApp Group", COURSE_INFO.batchWhatsAppGroup],
            ["Total Class will show", COURSE_INFO.totalClassWillShow],
            ["Google Meet Link", COURSE_INFO.googleMeetLink],
            ["Course Completed Status", COURSE_INFO.courseCompletedStatus],
          ].map(([label, value]) => (
            <li key={label as string}>
              <span className="info-label">{label as string} :</span>{" "}
              <span className="info-value">{(value as string | null) ?? "N/A"}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-wrap flex-1 p-1 sm:flex-col">
        {NAV_ITEMS.map((item) => {
          // Dashboard root: exact match only
          // Other items: startsWith so nested pages also highlight correctly
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}

              className={` block p-3 font-medium bg-white/40  rounded-lg transition-color my-2 nav-item  ${isActive ? " nav-item--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}