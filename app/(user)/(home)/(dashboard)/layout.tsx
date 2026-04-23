import { DashboardHeader, Sidebar } from "@/lib/home";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="app-shell">
          <Sidebar />
          <div className="main-area">
            <DashboardHeader />
            <main className="main-content">{children}</main>
          </div>
        </div>
  );
}