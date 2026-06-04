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
      <nav className="fixed top-0 left-0 right-0 h-12 bg-jarvis-surface border-b border-jarvis-border z-50 flex items-center px-3 lg:px-4">
        <button
          className="lg:hidden mr-2 text-jarvis-muted hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-jarvis-neon font-bold text-base lg:text-lg">J.A.R.V.I.S.</span>
        </Link>
        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <span className="flex items-center gap-1.5 text-[10px] lg:text-xs text-jarvis-muted">
            <span className="status-dot status-dot--active" />
            <span className="hidden sm:inline">System Online</span>
          </span>
          <div className="w-8 h-8 min-w-[32px] rounded-full bg-jarvis-neon/20 flex items-center justify-center text-xs text-jarvis-neon font-medium">
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

      {/* Desktop Sidebar — hidden on mobile, always visible on lg+ */}
      <aside
        className={`fixed top-12 left-0 bottom-0 w-14 bg-jarvis-surface border-r border-jarvis-border z-40 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center py-4 gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-lg transition-all ${
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

      {/* Mobile sidebar — wider when open */}
      {sidebarOpen && (
        <aside className="fixed top-12 left-0 bottom-0 w-56 bg-jarvis-surface border-r border-jarvis-border z-40 lg:hidden">
          <div className="flex flex-col py-4 px-3 gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-sm transition-all ${
                    isActive
                      ? "bg-jarvis-neon/20 text-jarvis-neon"
                      : "text-jarvis-muted hover:text-white hover:bg-jarvis-card"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      )}

      {/* Bottom Nav Bar — mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-jarvis-surface border-t border-jarvis-border z-50 flex lg:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] transition-all ${
                isActive
                  ? "text-jarvis-neon"
                  : "text-jarvis-muted hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main content — add bottom padding on mobile for bottom nav */}
      <main className="pt-12 lg:pl-14 min-h-screen pb-16 lg:pb-0">
        <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
