import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MapPin, 
  HelpCircle, 
  BookOpen, 
  AlertTriangle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";
import { useAuth } from "./AuthContext";
import logo from "figma:asset/d2a86183f3650ad510e5554066e364f7473a20fa.png";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Places", path: "/admin/places", icon: MapPin },
  { name: "Help Requests", path: "/admin/requests", icon: HelpCircle },
  { name: "Tutorials", path: "/admin/tutorials", icon: BookOpen },
  { name: "Reports", path: "/admin/reports", icon: AlertTriangle },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside
      style={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-[#1F3C5B] text-white flex flex-col sticky top-0 overflow-hidden shadow-xl z-50 transition-[width] duration-300"
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        {!isCollapsed && (
          <Link to="/" className="font-bold text-2xl tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Athar Logo" className="w-8 h-8 object-contain" />
            ATHAR
          </Link>
        )}
        {isCollapsed && (
          <Link to="/" className="w-8 h-8 bg-[#C9A24D] rounded-lg mx-auto flex items-center justify-center hover:opacity-80 transition-opacity">
            <Globe size={18} className="text-white" />
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors hidden md:block"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {/* Public Website Link */}
        <Link
          to="/"
          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200 group mb-4 border border-white/5"
        >
          <Globe size={22} className="group-hover:text-[#C9A24D] transition-colors" />
          {!isCollapsed && (
            <span className="font-medium whitespace-nowrap">Public Website</span>
          )}
        </Link>
        
        <div className="h-px bg-white/10 my-2 mx-2" />

        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-[#C9A24D] text-white shadow-lg" 
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              <link.icon size={22} className={isActive ? "text-white" : "group-hover:text-white"} />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">{link.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all duration-200 group"
        >
          <LogOut size={22} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
