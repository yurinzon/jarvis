"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "◉" },
  { href: "/dashboard/agents", label: "Agents", icon: "◆" },
  { href: "/dashboard/deployments", label: "Deployments", icon: "▣" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-jarvis-base text-jarvis-text">
      {/* NavBar */}
      <nav className="fixed top-0 left-0 right-0 h-12 bg-jarvis-surface border-b border-jarvis-border z-50 flex items-center px-4">
        <button
          className="lg:hidden mr-3 text-jarvis-muted hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-jarvis-neon font-bold text-lg">J.A.R.V.I.S.</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-jarvis-muted">
            <span className="status-dot status-dot--active" />
            System Online
          </span>
          <div className="w-7 h-7 rounded-full bg-jarvis-neon/20 flex items-center justify-center text-xs text-jarvis-neon font-medium">
            Y
          </div>
        </div>
      </nav>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-12 left-0 bottom-0 w-14 bg-jarvis-surface border-r border-jarvis-border z-40 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                  isActive
                    ? "bg-jarvis-neon/20 text-jarvis-neon"
                    : "text-jarvis-muted hover:text-white hover:bg-jarvis-card"
                }`}
                title={item.label}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-12 pl-14 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
