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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import { 
  MapPin, 
  Users, 
  HelpCircle, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Star,
  UserCheck,
  Activity,
  CreditCard,
  Banknote,
  FileText,
  Flag,
  Accessibility,
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { api } from "../../utils/server-api";
import { toast } from "sonner";

const PIE_COLORS = ["#f59e0b", "#14b8a6", "#3b82f6", "#22c55e", "#ef4444"];
const RATING_COLORS = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];

function toTimeAgo(value?: string) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dash, setDash] = useState<any>(null);
  const [pendingVolunteerRequests, setPendingVolunteerRequests] = useState<any[]>([]);

  const loadDashboard = async (params?: { refresh?: boolean; showLoader?: boolean }) => {
    const showLoader = params?.showLoader ?? false;
    try {
      if (showLoader) setLoading(true);
      const data = await api.dashboard.getFull({ refresh: params?.refresh });
      setDash(data);
    } catch (err) {
      console.error("Dashboard full load failed, falling back to summary", err);
      try {
        const counts = await api.dashboard.getSummary({ refresh: params?.refresh });
        setDash({ counts });
      } catch {
        toast.error("Failed to load dashboard data");
      }
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const loadAccounts = async () => {
    try {
      const accounts = await api.accounts.getAll();
      setPendingVolunteerRequests(Array.isArray(accounts.pending_volunteer_requests) ? accounts.pending_volunteer_requests : []);
    } catch {
      console.error("Failed to load accounts");
    }
  };

  const handleApproveVolunteer = async (id: number) => {
    try {
      await api.accounts.approveVolunteer(id);
      await Promise.all([
        loadAccounts(),
        loadDashboard({ refresh: true }),
      ]);
      toast.success("Volunteer request approved");
    } catch {
      toast.error("Failed to approve volunteer request");
    }
  };

  const handleRejectVolunteer = async (id: number) => {
    try {
      await api.accounts.rejectVolunteer(id);
      await Promise.all([
        loadAccounts(),
        loadDashboard({ refresh: true }),
      ]);
      toast.success("Volunteer request rejected");
    } catch {
      toast.error("Failed to reject volunteer request");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadDashboard({ showLoader: true });
    loadAccounts();
  }, []);

  const c = dash?.counts || {};
  const rev = dash?.revenue || {};
  const reviews = dash?.reviews || {};
  const weekly: any[] = Array.isArray(dash?.weekly_activity) ? dash.weekly_activity : [];
  const monthly: any[] = Array.isArray(dash?.monthly_trends) ? dash.monthly_trends : [];
  const statusBreakdown: any[] = Array.isArray(dash?.help_request_status_breakdown) ? dash.help_request_status_breakdown : [];
  const assistanceTypes: any[] = Array.isArray(dash?.assistance_types) ? dash.assistance_types : [];
  const topVols: any[] = Array.isArray(dash?.top_volunteers) ? dash.top_volunteers : [];
  const recentCompleted: any[] = Array.isArray(dash?.recent_completed) ? dash.recent_completed : [];
  const ratingDist = reviews?.distribution || {};

  const tutSummary = dash?.tutorials_summary || {};
  const repSummary = dash?.reports_summary || {};
  const subSummary = dash?.submissions_summary || {};
  const accOverview = dash?.accessibility_overview || {};
  const recentReports: any[] = Array.isArray(dash?.recent_reports) ? dash.recent_reports : [];
  const recentTutorials: any[] = Array.isArray(dash?.recent_tutorials) ? dash.recent_tutorials : [];

  const kpis = [
    { title: "Total Users", value: c.total_users ?? "...", icon: Users, color: "bg-blue-500" },
    { title: "Active Volunteers", value: c.total_volunteers ?? "...", icon: UserCheck, color: "bg-teal-500" },
    { title: "Pending Volunteers", value: c.pending_volunteers ?? "...", icon: Clock, color: "bg-orange-500" },
    { title: "Total Places", value: c.locations ?? "...", icon: MapPin, color: "bg-indigo-500" },
    { title: "Help Requests", value: c.total_help_requests ?? "...", icon: HelpCircle, color: "bg-purple-500" },
    { title: "Paid Requests", value: c.paid_help_requests ?? "...", icon: CreditCard, color: "bg-emerald-500" },
    { title: "Completed", value: c.completed_help_requests ?? "...", icon: CheckCircle2, color: "bg-green-500" },
    { title: "Open Flags", value: c.open_flags ?? "...", icon: AlertTriangle, color: "bg-red-500" },
    { title: "Pending Submissions", value: c.pending_place_submissions ?? "...", icon: Activity, color: "bg-amber-500" },
  ];

  const ratingChartData = [5, 4, 3, 2, 1].map((r, i) => ({
    name: `${r}★`,
    count: ratingDist[r] || 0,
    fill: RATING_COLORS[i],
  }));

  if (loading) {
    return (
      <AdminLayout title="Dashboard Overview">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 border-4 border-[#1F3C5B] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* KPI Cards - 2 rows of 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div key={kpi.title} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 60}ms` }}>
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${kpi.color} text-white`}>
                      <kpi.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">{kpi.title}</p>
                      <h3 className="text-xl font-bold text-[#1F3C5B]">{typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><DollarSign size={18} /></div>
                <span className="text-xs font-medium text-slate-500">Gross Revenue</span>
              </div>
              <p className="text-2xl font-bold text-emerald-700">{rev.gross_total ?? 0} <span className="text-sm font-normal">EGP</span></p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600"><TrendingUp size={18} /></div>
                <span className="text-xs font-medium text-slate-500">Platform Fees ({rev.fee_percentage ?? 30}%)</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{rev.platform_fees ?? 0} <span className="text-sm font-normal">EGP</span></p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-600"><Banknote size={18} /></div>
                <span className="text-xs font-medium text-slate-500">Cash Payments</span>
              </div>
              <p className="text-lg font-bold text-[#1F3C5B]">{rev.by_method?.cash?.amount ?? 0} EGP</p>
              <p className="text-xs text-slate-400">{rev.by_method?.cash?.count ?? 0} transactions</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-violet-100 text-violet-600"><CreditCard size={18} /></div>
                <span className="text-xs font-medium text-slate-500">Card Payments</span>
              </div>
              <p className="text-lg font-bold text-[#1F3C5B]">{rev.by_method?.card?.amount ?? 0} EGP</p>
              <p className="text-xs text-slate-400">{rev.by_method?.card?.count ?? 0} transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1: Weekly Activity + Request Status Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm overflow-hidden lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Weekly Activity</CardTitle>
              <TrendingUp className="text-teal-500" size={20} />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full min-w-0">
                {isMounted && weekly.length > 0 && (
                  <ResponsiveContainer width="99%" height={300}>
                    <BarChart data={weekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="requests" name="New Requests" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={18} />
                      <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={18} />
                      <Bar dataKey="places" name="New Places" fill="#C9A24D" radius={[4, 4, 0, 0]} barSize={18} />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full min-w-0">
                {isMounted && statusBreakdown.length > 0 && (
                  <ResponsiveContainer width="99%" height={300}>
                    <PieChart>
                      <Pie data={statusBreakdown} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} label={({ status, count }) => `${status} (${count})`}>
                        {statusBreakdown.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2: Monthly Trends + Rating Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm overflow-hidden lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Monthly Trends (6 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full min-w-0">
                {isMounted && monthly.length > 0 && (
                  <ResponsiveContainer width="99%" height={300}>
                    <LineChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="requests" name="Requests" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="new_users" name="New Users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="new_volunteers" name="New Volunteers" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Volunteer Ratings</CardTitle>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-lg">{reviews.average_rating ?? "-"}</span>
                  <span className="text-xs text-slate-400">/ 5</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">{reviews.total ?? 0} total reviews</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ratingChartData.map((item) => {
                  const maxCount = Math.max(...ratingChartData.map(d => d.count), 1);
                  return (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8 text-slate-600">{item.name}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(item.count / maxCount) * 100}%`, backgroundColor: item.fill }} />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right text-slate-700">{item.count}</span>
                    </div>
                  );
                })}
              </div>

              {assistanceTypes.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-[#1F3C5B] mb-2">Assistance Types</p>
                  <div className="space-y-1.5">
                    {assistanceTypes.map((t: any) => (
                      <div key={t.type} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 capitalize">{t.type?.replace(/_/g, " ")}</span>
                        <Badge variant="secondary" className="bg-slate-100">{t.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Content & Moderation Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tutorials */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-orange-100 text-orange-600"><FileText size={18} /></div>
                <span className="text-sm font-semibold text-[#1F3C5B]">Tutorials</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-lg font-bold text-[#1F3C5B]">{tutSummary.total ?? 0}</p><p className="text-[10px] text-slate-400">Total</p></div>
                <div><p className="text-lg font-bold text-emerald-700">{tutSummary.published ?? 0}</p><p className="text-[10px] text-slate-400">Published</p></div>
                <div><p className="text-lg font-bold text-amber-600">{tutSummary.draft ?? 0}</p><p className="text-[10px] text-slate-400">Drafts</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-red-100 text-red-600"><Flag size={18} /></div>
                <span className="text-sm font-semibold text-[#1F3C5B]">Reports / Flags</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div><p className="text-lg font-bold text-orange-600">{repSummary.open ?? 0}</p><p className="text-[10px] text-slate-400">Open</p></div>
                <div><p className="text-lg font-bold text-blue-600">{repSummary.need_info ?? 0}</p><p className="text-[10px] text-slate-400">Info</p></div>
                <div><p className="text-lg font-bold text-emerald-700">{repSummary.resolved ?? 0}</p><p className="text-[10px] text-slate-400">Resolved</p></div>
                <div><p className="text-lg font-bold text-slate-500">{repSummary.dismissed ?? 0}</p><p className="text-[10px] text-slate-400">Dismissed</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-600"><ClipboardList size={18} /></div>
                <span className="text-sm font-semibold text-[#1F3C5B]">Place Submissions</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-lg font-bold text-orange-600">{subSummary.pending ?? 0}</p><p className="text-[10px] text-slate-400">Pending</p></div>
                <div><p className="text-lg font-bold text-emerald-700">{subSummary.approved ?? 0}</p><p className="text-[10px] text-slate-400">Approved</p></div>
                <div><p className="text-lg font-bold text-red-600">{subSummary.rejected ?? 0}</p><p className="text-[10px] text-slate-400">Rejected</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-600"><Accessibility size={18} /></div>
                <span className="text-sm font-semibold text-[#1F3C5B]">Accessibility</span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Verified Reports</span><span className="font-bold text-[#1F3C5B]">{accOverview.verified_reports ?? 0}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Wheelchair</span><span className="font-bold text-[#1F3C5B]">{accOverview.wheelchair_accessible ?? 0}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Ramp</span><span className="font-bold text-[#1F3C5B]">{accOverview.ramp_available ?? 0}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Avg Rating</span><span className="font-bold text-amber-600">{accOverview.average_place_rating ?? '-'}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports + Recent Tutorials */}
        {(recentReports.length > 0 || recentTutorials.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentReports.length > 0 && (
              <Card className="border-none shadow-sm">
                <CardHeader><CardTitle className="text-lg font-bold text-[#1F3C5B]">Recent Reports</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentReports.map((r: any) => (
                      <div key={r.id} className="rounded-lg bg-slate-50 p-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#1F3C5B] truncate">{r.reason}</p>
                          <p className="text-xs text-slate-500">by {r.flagger || 'Unknown'} · target: {r.target}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className={
                            r.status === 'open' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            r.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                          }>{r.status}</Badge>
                          <span className="text-xs text-slate-400">{toTimeAgo(r.created_at)}</span>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => navigate('/admin/reports')} className="w-full py-2 text-sm font-semibold text-[#1F3C5B] hover:bg-[#EAF2FB] rounded-lg transition-colors">
                      View All Reports
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {recentTutorials.length > 0 && (
              <Card className="border-none shadow-sm">
                <CardHeader><CardTitle className="text-lg font-bold text-[#1F3C5B]">Recent Tutorials</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentTutorials.map((t: any) => (
                      <div key={t.id} className="rounded-lg bg-slate-50 p-3 flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#1F3C5B] truncate">{t.title}</p>
                          <p className="text-xs text-slate-500">{t.category || 'Uncategorized'}</p>
                        </div>
                        <Badge className={t.is_published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}>
                          {t.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    ))}
                    <button onClick={() => navigate('/admin/tutorials')} className="w-full py-2 text-sm font-semibold text-[#1F3C5B] hover:bg-[#EAF2FB] rounded-lg transition-colors">
                      View All Tutorials
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Top Volunteers + Volunteer Requests + Recent Completed */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Top Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topVols.length > 0 ? topVols.map((v: any, idx: number) => (
                  <div key={v.id} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1F3C5B] truncate">{v.name}</p>
                      <p className="text-xs text-slate-400">{v.completed_requests} completed &middot; {v.total_earnings} EGP earned</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">{v.avg_rating || "-"}</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500">No volunteer data yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Volunteer Registration Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingVolunteerRequests.length > 0 ? pendingVolunteerRequests.slice(0, 6).map((account) => (
                  <div key={account.id} className="rounded-lg border border-slate-100 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#1F3C5B]">{account.full_name || account.name || `Volunteer #${account.id}`}</p>
                        <p className="text-xs text-slate-500">{account.email || "No email"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 text-xs" onClick={() => handleApproveVolunteer(account.id)}>Accept</Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-7 text-xs" onClick={() => handleRejectVolunteer(account.id)}>Refuse</Button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500">No pending volunteer requests.</p>
                )}
                {pendingVolunteerRequests.length > 6 && (
                  <button onClick={() => navigate('/admin/accounts')} className="w-full py-2 text-sm font-semibold text-[#1F3C5B] hover:bg-[#EAF2FB] rounded-lg transition-colors">
                    View All ({pendingVolunteerRequests.length})
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#1F3C5B]">Recently Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCompleted.length > 0 ? recentCompleted.map((r: any) => (
                  <div key={r.id} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#1F3C5B] capitalize">{r.assistance_type?.replace(/_/g, " ")}</span>
                      <Badge variant="outline" className={r.payment_method === 'cash' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-violet-50 text-violet-700 border-violet-200'}>
                        {r.payment_method}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">{r.requester} → {r.volunteer || "N/A"}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-400">{toTimeAgo(r.completed_at)}</span>
                      <span className="text-xs font-semibold text-emerald-600">{r.service_fee} EGP</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500">No completed requests yet.</p>
                )}
                <button onClick={() => navigate('/admin/requests')} className="w-full py-2 text-sm font-semibold text-[#1F3C5B] hover:bg-[#EAF2FB] rounded-lg transition-colors">
                  View All Requests
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
