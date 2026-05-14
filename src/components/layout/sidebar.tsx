"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dna,
  Microscope,
  Activity,
  FileText,
} from "lucide-react";

const items = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Variants", href: "/variants", icon: Dna },
  { label: "Coverage", href: "/coverage", icon: Microscope },
  { label: "QC", href: "/qc", icon: Activity },
  { label: "Reports", href: "/reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="flex h-full flex-col px-4 py-6">
        <div className="px-2">
          <div className="text-base font-semibold tracking-tight text-slate-900">
            Detagen Somatic Dashboard
          </div>
          <div className="text-xs text-slate-500">
            Clinical interface
          </div>
        </div>

        <nav className="mt-8 space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-blue-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {active ? (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600" />
                ) : null}

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                    active
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="px-2 text-xs text-slate-400">v1.0</div>
      </div>
    </aside>
  );
}