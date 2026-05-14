import type { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}