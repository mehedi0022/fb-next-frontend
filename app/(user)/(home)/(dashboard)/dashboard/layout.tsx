import RoleProtectedRoute from "@/appstore/provider/RoleProtectedRoute";
import { DashboardHeader, Sidebar } from "@/lib/home";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedRoute allowRoles={["seller"]}>
      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="min-w-0 space-y-5">
              <DashboardHeader />
              <main className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}
