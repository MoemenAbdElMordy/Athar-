import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { Toaster } from "../ui/sonner";

export function AdminLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#EAF2FB]">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div className={`
        fixed md:sticky top-0 h-screen z-50 transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar title={title} onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
