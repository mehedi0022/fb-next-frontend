import RoleProtectedRoute from "@/appstore/provider/RoleProtectedRoute";
import {  DashboardHeader, Sidebar } from "@/lib/home";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <RoleProtectedRoute allowRoles={["seller"]}>
    <div className="max-w-6xl mx-auto  flex flex-col md:flex-row">
        <Sidebar />
        <div className="main-area">
          <DashboardHeader />
          <main className="main-content bg-white/30 m-4 rounded-lg">
            {children}
          </main>
        </div>

    </div>
      </RoleProtectedRoute>
  );
}
