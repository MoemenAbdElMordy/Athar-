import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, Menu } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AdminTopBar({ title, onMenuClick }: { title: string, onMenuClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg md:hidden"
        >
          <Menu size={24} className="text-[#1F3C5B]" />
        </button>
        <h1 className="text-xl font-bold text-[#1F3C5B]">{title}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center bg-[#EAF2FB] px-3 py-2 rounded-xl border border-slate-200 w-64">
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-full text-[#1F3C5B]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors focus:outline-none cursor-pointer">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 mt-2 p-0 rounded-2xl overflow-hidden shadow-xl border-slate-100">
            <div className="p-4 bg-[#1F3C5B] text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Notifications</h3>
                <span className="text-[10px] bg-[#C9A24D] px-2 py-0.5 rounded-full">3 New</span>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {[
                { id: 1, title: "New Place Submission", desc: "User 'Ahmed' submitted a new place: Giza Public Library", time: "5 mins ago", type: "info" },
                { id: 2, title: "Urgent Help Request", desc: "A user requires wheelchair assistance at Cairo Station", time: "12 mins ago", type: "urgent" },
                { id: 3, title: "Report Flagged", desc: "Incorrect accessibility info reported for City Mall", time: "1 hour ago", type: "warning" },
              ].map((notif) => (
                <DropdownMenuItem key={notif.id} className="p-4 focus:bg-slate-50 border-b border-slate-50 last:border-0 cursor-pointer">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold ${notif.type === 'urgent' ? 'text-red-500' : 'text-[#1F3C5B]'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{notif.desc}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-3 bg-slate-50 text-center">
              <button 
                onClick={() => navigate('/admin/notifications')}
                className="text-xs font-bold text-[#1F3C5B] hover:underline cursor-pointer w-full text-center"
              >
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-1 hover:bg-slate-100 rounded-full pr-4 transition-colors">
            <Avatar className="h-9 w-9 border-2 border-[#EAF2FB]">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-[#1F3C5B] leading-none">Admin User</p>
              <p className="text-xs text-slate-500 mt-1">Super Admin</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
