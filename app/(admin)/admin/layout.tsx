import RoleProtectedRoute from "@/appstore/provider/RoleProtectedRoute";
import AdminHeader from "@/components/admin/Layout/AdminHeader";
import AdminSidebar from "@/components/admin/Layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedRoute allowRoles={["super_admin", "admin"]}>
      <div className="!min-h-screen flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <div className="!bg-gray-50 flex flex-col min-w-0 w-full">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}
