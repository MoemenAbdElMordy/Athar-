import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  MapPin, 
  Users, 
  HelpCircle, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { api } from "../../utils/server-api";

const initialKpiData = [
  { title: "Total Places", value: "...", icon: MapPin, color: "bg-blue-500", change: "+12%" },
  { title: "Pending Reviews", value: "42", icon: Clock, color: "bg-orange-500", change: "-5%" },
  { title: "Active Volunteers", value: "156", icon: Users, color: "bg-teal-500", change: "+8%" },
  { title: "Open Requests", value: "...", icon: HelpCircle, color: "bg-purple-500", change: "+3" },
  { title: "Reports", value: "12", icon: AlertTriangle, color: "bg-red-500", change: "Stable" },
];

const chartData = [
  { name: "Mon", requests: 12, places: 4 },
  { name: "Tue", requests: 19, places: 7 },
  { name: "Wed", requests: 15, places: 5 },
  { name: "Thu", requests: 22, places: 9 },
  { name: "Fri", requests: 30, places: 12 },
  { name: "Sat", requests: 25, places: 15 },
  { name: "Sun", requests: 18, places: 8 },
];

const recentActivity = [
  { id: 1, type: "Place Approved", target: "Starbucks Mall of Arabia", user: "John Doe", time: "2 hours ago", status: "Success" },
  { id: 2, type: "New Report", target: "Public Park Giza", user: "Sara Ahmed", time: "4 hours ago", status: "Warning" },
  { id: 3, type: "Request Resolved", target: "Wheelchair Access Hub", user: "Admin", time: "Yesterday", status: "Success" },
  { id: 4, type: "Place Submission", target: "Metro Station Exit 4", user: "Volunteer #23", time: "Yesterday", status: "Info" },
  { id: 5, type: "Data Update", target: "City Library", user: "System", time: "2 days ago", status: "Info" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [kpiData, setKpiData] = useState(initialKpiData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchKpis = async () => {
      try {
        const [places, requests] = await Promise.all([
          api.places.getAll(),
          api.requests.getAll()
        ]);
        
        setKpiData(prev => prev.map(item => {
          if (item.title === "Total Places") return { ...item, value: places.length.toLocaleString() };
          if (item.title === "Open Requests") return { ...item, value: requests.filter((r: any) => r.status === 'Pending').length.toString() };
          return item;
        }));
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };
    
    fetchKpis();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiData.map((kpi, idx) => (
            <div key={kpi.title} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 80}ms` }}>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${kpi.color} text-white`}>
                      <kpi.icon size={20} />
                    </div>
                    <Badge variant="secondary" className={kpi.change.startsWith('+') ? "text-green-600 bg-green-50" : kpi.change === "Stable" ? "text-slate-600 bg-slate-50" : "text-orange-600 bg-orange-50"}>
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                    <h3 className="text-2xl font-bold text-[#1F3C5B]">{kpi.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Help Requests Volume</CardTitle>
              <TrendingUp className="text-teal-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full min-w-0 relative">
                {isMounted && (
                  <ResponsiveContainer width="99%" height={300}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="requests" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorReq)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">New Places per Day</CardTitle>
              <CheckCircle2 className="text-[#C9A24D]" size={20} />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full min-w-0 relative">
                {isMounted && (
                  <ResponsiveContainer width="99%" height={300}>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="places" fill="#1F3C5B" radius={[6, 6, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#1F3C5B]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 font-semibold text-slate-500 text-sm">Action Type</th>
                    <th className="pb-4 font-semibold text-slate-500 text-sm">Target</th>
                    <th className="pb-4 font-semibold text-slate-500 text-sm">User</th>
                    <th className="pb-4 font-semibold text-slate-500 text-sm">Time</th>
                    <th className="pb-4 font-semibold text-slate-500 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 text-sm font-medium text-[#1F3C5B]">{activity.type}</td>
                      <td className="py-4 text-sm text-slate-600">{activity.target}</td>
                      <td className="py-4 text-sm text-slate-600">{activity.user}</td>
                      <td className="py-4 text-sm text-slate-400">{activity.time}</td>
                      <td className="py-4">
                        <Badge variant="outline" className={
                          activity.status === "Success" ? "text-green-600 bg-green-50 border-green-200" :
                          activity.status === "Warning" ? "text-orange-600 bg-orange-50 border-orange-200" :
                          "text-blue-600 bg-blue-50 border-blue-200"
                        }>
                          {activity.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => navigate('/admin/notifications')}
              className="w-full mt-6 py-2 text-sm font-semibold text-[#1F3C5B] hover:bg-[#EAF2FB] rounded-lg transition-colors cursor-pointer"
            >
              View All Activity
            </button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
