"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Discover", icon: "🔍" },
  { href: "/dashboard/agents", label: "Library", icon: "📚" },
  { href: "/dashboard/deployments", label: "Threads", icon: "💬" },
  { href: "/dashboard/agents", label: "Agents", icon: "🤖" },
  { href: "/dashboard/deployments", label: "Settings", icon: "⚙️" },
];

// Items for sidebar (all 5)
const sidebarItems = [
  { href: "/dashboard", label: "Discover", icon: "🔍" },
  { href: "/dashboard/agents", label: "Library", icon: "📚" },
  { href: "/dashboard/deployments", label: "Threads", icon: "💬" },
  { href: "/dashboard/agents", label: "Agents", icon: "🤖" },
  { href: "/dashboard/deployments", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-jarvis-base text-jarvis-text">
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-jarvis-surface border-r border-jarvis-border z-40 hidden lg:flex lg:flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-jarvis-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white tracking-tight">J.A.R.V.I.S.</span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          {sidebarItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-jarvis-neon/10 text-jarvis-neon border-l-2 border-jarvis-neon rounded-l-none"
                    : "text-jarvis-muted hover:text-jarvis-text hover:bg-white/[0.03]"
                }`}
              >
                <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* System status at bottom */}
        <div className="px-5 py-4 border-t border-jarvis-border">
          <div className="flex items-center gap-2 text-xs text-jarvis-muted">
            <span className="status-dot status-dot--active" />
            <span>System Online</span>
          </div>
        </div>
      </aside>

      {/* ── Top Bar (mobile only, minimal) ── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-jarvis-surface border-b border-jarvis-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-base font-semibold text-white tracking-tight">J.A.R.V.I.S.</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-jarvis-neon/20 flex items-center justify-center text-[10px] text-jarvis-neon font-medium">
            M
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <main className="min-h-screen lg:ml-64 pb-16 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </main>

      {/* ── Bottom Nav (mobile only, 5 tabs) ── */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-jarvis-surface border-t border-jarvis-border z-50 flex lg:hidden">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] transition-all ${
                active ? "text-jarvis-neon" : "text-jarvis-muted hover:text-jarvis-text"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
