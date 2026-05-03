import AdminHeader from "@/components/admin/Layout/AdminHeader";
import AdminSidebar from "@/components/admin/Layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="!min-h-screen flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="!bg-gray-50 flex flex-col min-w-0 overflow-hidden w-full">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
