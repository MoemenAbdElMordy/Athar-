import React, { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Bell, 
  Search, 
  Filter, 
  MapPin, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Check,
  Trash2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu";
import { toast } from "sonner@2.0.3";

type NotificationType = 'place' | 'request' | 'report' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high';
}

const initialNotifications: Notification[] = [
  { 
    id: 1, 
    type: 'place', 
    title: "New Place Submission", 
    description: "User 'Ahmed' submitted a new place: Giza Public Library for review.", 
    time: "5 mins ago", 
    status: 'unread',
    priority: 'medium'
  },
  { 
    id: 2, 
    type: 'request', 
    title: "Urgent Help Request", 
    description: "A user requires wheelchair assistance at Cairo Station, Platform 3.", 
    time: "12 mins ago", 
    status: 'unread',
    priority: 'high'
  },
  { 
    id: 3, 
    type: 'report', 
    title: "Report Flagged", 
    description: "Incorrect accessibility info reported for City Mall food court.", 
    time: "1 hour ago", 
    status: 'unread',
    priority: 'medium'
  },
  { 
    id: 4, 
    type: 'system', 
    title: "System Update", 
    description: "Database maintenance completed successfully. All services are operational.", 
    time: "3 hours ago", 
    status: 'read',
    priority: 'low'
  },
  { 
    id: 5, 
    type: 'place', 
    title: "New Place Submission", 
    description: "User 'Sara' added 'Nile View Cafe' to the community map.", 
    time: "5 hours ago", 
    status: 'read',
    priority: 'medium'
  },
  { 
    id: 6, 
    type: 'request', 
    title: "Help Request", 
    description: "Information requested about ramp availability at Al-Azhar Park.", 
    time: "Yesterday", 
    status: 'read',
    priority: 'low'
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, status: 'read' as const } : n));
    toast.success("Notification marked as read");
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' as const })));
    toast.success("All notifications marked as read");
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'all' || n.type === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'place': return <MapPin size={18} className="text-blue-500" />;
      case 'request': return <HelpCircle size={18} className="text-purple-500" />;
      case 'report': return <AlertTriangle size={18} className="text-red-500" />;
      default: return <Bell size={18} className="text-slate-500" />;
    }
  };

  return (
    <AdminLayout title="Notifications Center">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search all alerts..." 
                className="pl-10 rounded-xl bg-white border-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-slate-200 flex items-center gap-2 bg-white">
                  <Filter size={16} />
                  <span>{filter === 'all' ? 'All Types' : filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => setFilter('all')}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('place')}>Places</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('request')}>Help Requests</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('report')}>Reports</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('system')}>System Alerts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button 
            variant="ghost" 
            className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>

        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={`border-none shadow-sm transition-all hover:shadow-md ${notif.status === 'unread' ? 'bg-[#EAF2FB]/30 border-l-4 border-l-[#1F3C5B]' : 'bg-white'}`}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-white shadow-sm border border-slate-100`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold text-[#1F3C5B] ${notif.status === 'unread' ? 'text-base' : 'text-sm'}`}>
                            {notif.title}
                          </h3>
                          {notif.status === 'unread' && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full" />
                          )}
                          <Badge variant="outline" className={`text-[10px] py-0 px-2 rounded-full uppercase tracking-wider ${
                            notif.priority === 'high' ? 'text-red-600 border-red-100 bg-red-50' :
                            notif.priority === 'medium' ? 'text-orange-600 border-orange-100 bg-orange-50' :
                            'text-slate-500 border-slate-100 bg-slate-50'
                          }`}>
                            {notif.priority}
                          </Badge>
                        </div>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {notif.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {notif.description}
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        {notif.status === 'unread' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-xs font-bold text-blue-600 hover:bg-blue-50"
                            onClick={() => markAsRead(notif.id)}
                          >
                            <Check size={14} className="mr-1" /> Mark as read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs font-bold text-slate-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => deleteNotification(notif.id)}
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact User</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Permanently</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="p-4 bg-slate-50 rounded-full w-fit mx-auto mb-4">
                <Bell size={40} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-[#1F3C5B]">No notifications found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                We couldn't find any alerts matching your search or filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-xl"
                onClick={() => {setFilter('all'); setSearchQuery('');}}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
