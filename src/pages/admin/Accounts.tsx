import React, { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { ChevronLeft, ChevronRight, Star, Users, UserCheck, Clock, DollarSign, BarChart3, Award, Loader2, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../utils/server-api";
import { toast } from "sonner";

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");

  const [createForm, setCreateForm] = useState({
    name: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    is_active: true,
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsTab, setAnalyticsTab] = useState<'impact' | 'earnings' | 'performance' | 'reviews'>('impact');
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const openAnalytics = async (account: any) => {
    setAnalyticsOpen(true);
    setAnalyticsLoading(true);
    setAnalyticsData(null);
    setAnalyticsTab('impact');
    try {
      const data = await api.accounts.getVolunteerAnalytics(account.id);
      setAnalyticsData(data);
    } catch {
      toast.error('Failed to load volunteer analytics');
      setAnalyticsOpen(false);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const parseList = (value: unknown): string[] => {
    if (Array.isArray(value)) {
      return value
        .map((item) => String(item).trim())
        .filter(Boolean);
    }

    if (typeof value !== "string") return [];

    const trimmed = value.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => String(item).trim())
            .filter(Boolean);
        }
      } catch {
        // Ignore and fallback to comma separated parsing.
      }
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const openApplication = (application: any) => {
    setSelectedApplication(application);
    setApplicationOpen(true);
  };

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const data = await api.accounts.getAll();
      setPendingRequests(Array.isArray(data.pending_volunteer_requests) ? data.pending_volunteer_requests : []);
      setVolunteers(Array.isArray(data.volunteer_accounts) ? data.volunteer_accounts : []);
      setUsers(Array.isArray(data.user_accounts) ? data.user_accounts : []);
    } catch (error) {
      console.error("Failed to load accounts", error);
      toast.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const allAccounts = useMemo(() => {
    const merged = [...pendingRequests, ...volunteers, ...users];
    return merged
      .filter((item: any) => {
        const q = search.toLowerCase();
        const matchesSearch = !q || (
          String(item?.name || "").toLowerCase().includes(q) ||
          String(item?.full_name || "").toLowerCase().includes(q) ||
          String(item?.email || "").toLowerCase().includes(q) ||
          String(item?.phone || "").toLowerCase().includes(q)
        );
        const matchesRole = roleFilter === "all" ||
          (roleFilter === "pending" && item.role === "volunteer" && !item.role_verified_at) ||
          (roleFilter === "volunteer" && item.role === "volunteer" && item.role_verified_at) ||
          (roleFilter === "user" && item.role === "user");
        return matchesSearch && matchesRole;
      })
      .sort((a: any, b: any) => Number(b.id || 0) - Number(a.id || 0));
  }, [pendingRequests, volunteers, users, search, roleFilter]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(allAccounts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedAccounts = allAccounts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, pendingRequests.length, volunteers.length, users.length]);

  const handleCreate = async () => {
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) {
      toast.error("Name, email and password are required");
      return;
    }

    try {
      await api.accounts.create({
        name: createForm.name.trim(),
        full_name: createForm.full_name.trim() || undefined,
        email: createForm.email.trim(),
        phone: createForm.phone.trim() || undefined,
        password: createForm.password,
        role: createForm.role as "user" | "volunteer",
        is_active: createForm.is_active,
      });

      toast.success("Account created");
      setCreateForm({ name: "", full_name: "", email: "", phone: "", password: "", role: "user", is_active: true });
      await loadAccounts();
    } catch {
      toast.error("Failed to create account");
    }
  };

  const startEdit = (account: any) => {
    setEditingId(account.id);
    setEditForm({
      name: account.name || "",
      full_name: account.full_name || "",
      email: account.email || "",
      phone: account.phone || "",
      role: account.role || "user",
      is_active: account.is_active !== false,
      password: "",
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      await api.accounts.update(editingId, {
        name: editForm.name,
        full_name: editForm.full_name || null,
        email: editForm.email,
        phone: editForm.phone || null,
        role: editForm.role,
        is_active: Boolean(editForm.is_active),
        password: editForm.password || undefined,
      });

      toast.success("Account updated");
      setEditingId(null);
      setEditForm({});
      await loadAccounts();
    } catch {
      toast.error("Failed to update account");
    }
  };

  const deleteAccount = async (id: number) => {
    try {
      await api.accounts.delete(id);
      toast.success("Account deleted");
      await loadAccounts();
    } catch {
      toast.error("Failed to delete account");
    }
  };

  const approveRequest = async (id: number) => {
    try {
      await api.accounts.approveVolunteer(id);
      toast.success("Volunteer request confirmed");
      await loadAccounts();
    } catch {
      toast.error("Failed to confirm request");
    }
  };

  const activatePendingAccount = async (id: number) => {
    try {
      await api.accounts.approveVolunteer(id);
      toast.success("Account status changed to Active");
      await loadAccounts();
    } catch {
      toast.error("Failed to activate account");
    }
  };

  const rejectRequest = async (id: number) => {
    try {
      await api.accounts.rejectVolunteer(id);
      toast.success("Volunteer request refused");
      await loadAccounts();
    } catch {
      toast.error("Failed to refuse request");
    }
  };

  // Computed stats
  const totalEarnings = volunteers.reduce((s: number, v: any) => s + (v.total_earnings || 0), 0);
  const avgVolunteerRating = (() => {
    const rated = volunteers.filter((v: any) => v.avg_rating > 0);
    return rated.length ? (rated.reduce((s: number, v: any) => s + v.avg_rating, 0) / rated.length).toFixed(1) : "-";
  })();

  return (
    <AdminLayout title="Accounts & Volunteer Requests">
      <div className="space-y-6">
        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600"><Users size={18} /></div>
            <div><p className="text-xs text-slate-500">Total Users</p><p className="text-xl font-bold text-[#1F3C5B]">{users.length}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-100 text-teal-600"><UserCheck size={18} /></div>
            <div><p className="text-xs text-slate-500">Volunteers</p><p className="text-xl font-bold text-[#1F3C5B]">{volunteers.length}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600"><Clock size={18} /></div>
            <div><p className="text-xs text-slate-500">Pending</p><p className="text-xl font-bold text-[#1F3C5B]">{pendingRequests.length}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600"><Star size={18} /></div>
            <div><p className="text-xs text-slate-500">Avg Rating</p><p className="text-xl font-bold text-[#1F3C5B]">{avgVolunteerRating}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><DollarSign size={18} /></div>
            <div><p className="text-xs text-slate-500">Vol. Earnings</p><p className="text-xl font-bold text-[#1F3C5B]">{totalEarnings.toFixed(0)} EGP</p></div>
          </CardContent></Card>
        </div>

        {/* Create Account */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1F3C5B]">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Name *" value={createForm.name} onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))} />
              <Input placeholder="Full Name" value={createForm.full_name} onChange={(e) => setCreateForm((prev) => ({ ...prev, full_name: e.target.value }))} />
              <Input placeholder="Email *" value={createForm.email} onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))} />
              <Input placeholder="Phone" value={createForm.phone} onChange={(e) => setCreateForm((prev) => ({ ...prev, phone: e.target.value }))} />
              <Input type="password" placeholder="Password *" value={createForm.password} onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))} />
              <Select value={createForm.role} onValueChange={(value: string) => setCreateForm((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="volunteer">Volunteer (pending)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3">
              <Button className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90" onClick={handleCreate}>Create</Button>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Requests */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1F3C5B]">Volunteer Requests (Confirm / Refuse)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.length > 0 ? pendingRequests.map((req: any) => (
                <div key={req.id} className="rounded-lg border border-slate-100 p-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1F3C5B]">{req.full_name || req.name || `Volunteer #${req.id}`}</p>
                    <p className="text-xs text-slate-500">{req.email || "No email"} &middot; {req.phone || "No phone"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-[#1F3C5B] border-[#1F3C5B]/30 hover:bg-[#EAF2FB]" onClick={() => openApplication(req)}>View Application</Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => approveRequest(req.id)}>Confirm</Button>
                    <Button size="sm" variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50" onClick={() => activatePendingAccount(req.id)}>Activate</Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => rejectRequest(req.id)}>Refuse</Button>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-500">No pending requests.</p>}
            </div>
          </CardContent>
        </Card>

        {/* Accounts Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1F3C5B]">All Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <Input className="flex-1" placeholder="Search by name/email/phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Filter by role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="volunteer">Volunteers</SelectItem>
                  <SelectItem value="pending">Pending Volunteers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">Loading accounts...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-xs font-semibold text-slate-500">Name</th>
                      <th className="pb-3 text-xs font-semibold text-slate-500">Email / Phone</th>
                      <th className="pb-3 text-xs font-semibold text-slate-500">Role</th>
                      <th className="pb-3 text-xs font-semibold text-slate-500">Status</th>
                      <th className="pb-3 text-xs font-semibold text-slate-500">Performance</th>
                      <th className="pb-3 text-xs font-semibold text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pagedAccounts.map((account: any) => {
                      const isEditing = editingId === account.id;
                      const isPendingVolunteer = account.role === "volunteer" && !account.role_verified_at;
                      const isVolunteer = account.role === "volunteer" && !!account.role_verified_at;

                      return (
                        <tr key={account.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 pr-3">
                            {isEditing ? (
                              <div className="space-y-2">
                                <Input value={editForm.name || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, name: e.target.value }))} />
                                <Input placeholder="Full name" value={editForm.full_name || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, full_name: e.target.value }))} />
                              </div>
                            ) : (
                              <span className="font-medium text-[#1F3C5B] text-sm">{account.full_name || account.name || `Account #${account.id}`}</span>
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {isEditing ? (
                              <div className="space-y-2">
                                <Input value={editForm.email || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, email: e.target.value }))} />
                                <Input placeholder="Phone" value={editForm.phone || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, phone: e.target.value }))} />
                                <Input type="password" placeholder="New password (optional)" value={editForm.password || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, password: e.target.value }))} />
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-slate-700">{account.email || "No email"}</p>
                                <p className="text-xs text-slate-500">{account.phone || "No phone"}</p>
                              </div>
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {isEditing ? (
                              <Select value={editForm.role || "user"} onValueChange={(value: string) => setEditForm((prev: any) => ({ ...prev, role: value }))}>
                                <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="volunteer">Volunteer</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge variant="outline" className={account.role === "volunteer" ? "text-emerald-700 border-emerald-200 bg-emerald-50" : "text-blue-700 border-blue-200 bg-blue-50"}>
                                {account.role}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {isPendingVolunteer ? (
                              <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Pending</Badge>
                            ) : (
                              <Badge variant="outline" className={account.is_active ? "text-green-700 border-green-200 bg-green-50" : "text-red-700 border-red-200 bg-red-50"}>
                                {account.is_active ? "Active" : "Inactive"}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {isVolunteer ? (
                              <div className="text-xs space-y-0.5">
                                <p className="text-slate-600"><span className="font-medium">{account.completed_requests || 0}</span> completed</p>
                                {account.avg_rating > 0 && (
                                  <p className="flex items-center gap-0.5 text-amber-600">
                                    <Star size={11} fill="currentColor" /> {account.avg_rating}
                                  </p>
                                )}
                                {account.total_earnings > 0 && (
                                  <p className="text-emerald-600 font-medium">{account.total_earnings} EGP</p>
                                )}
                              </div>
                            ) : account.role === "user" ? (
                              <div className="text-xs text-slate-600">
                                <span className="font-medium">{account.total_requests || 0}</span> requests
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                              {isPendingVolunteer && (
                                <>
                                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-[#1F3C5B] border-[#1F3C5B]/30 hover:bg-[#EAF2FB]" onClick={() => openApplication(account)}>
                                    <Eye size={12} /> View
                                  </Button>
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs" onClick={() => approveRequest(account.id)}>Confirm</Button>
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-7 text-xs" onClick={() => rejectRequest(account.id)}>Refuse</Button>
                                </>
                              )}
                              {isVolunteer && (
                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-[#1F3C5B] border-[#1F3C5B]/30 hover:bg-[#EAF2FB]" onClick={() => openAnalytics(account)}>
                                  <Eye size={12} /> Analytics
                                </Button>
                              )}
                              {isEditing ? (
                                <>
                                  <Button size="sm" className="h-7 text-xs" onClick={saveEdit}>Save</Button>
                                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setEditingId(null); setEditForm({}); }}>Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => startEdit(account)}>Edit</Button>
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-7 text-xs" onClick={() => deleteAccount(account.id)}>Delete</Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {allAccounts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-sm text-slate-500">No accounts found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && allAccounts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium text-slate-700">{Math.min(startIndex + 1, allAccounts.length)}</span> -{' '}
                  <span className="font-medium text-slate-700">{Math.min(endIndex, allAccounts.length)}</span> of{' '}
                  <span className="font-medium text-slate-700">{allAccounts.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}>
                    <ChevronLeft size={18} /><span>Previous</span>
                  </Button>
                  <div className="text-sm text-slate-500 min-w-[110px] text-center">
                    Page <span className="font-medium text-slate-700">{currentPage}</span> / <span className="font-medium text-slate-700">{totalPages}</span>
                  </div>
                  <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>
                    <span>Next</span><ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Volunteer Application Modal */}
        <Dialog
          open={applicationOpen}
          onOpenChange={(open: boolean) => {
            setApplicationOpen(open);
            if (!open) setSelectedApplication(null);
          }}
        >
          <DialogContent className="sm:max-w-[760px] max-h-[90vh] overflow-y-auto rounded-3xl border-none p-0 shadow-2xl">
            <DialogHeader className="bg-[#1F3C5B] p-6 text-white">
              <DialogTitle className="text-2xl font-bold">
                Volunteer Application Review
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm">
                {selectedApplication?.full_name || selectedApplication?.name || "Volunteer applicant"} · Submitted on {selectedApplication?.created_at ? String(selectedApplication.created_at).slice(0, 10) : "N/A"}
              </DialogDescription>
            </DialogHeader>

            {selectedApplication ? (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-slate-100 shadow-sm"><CardContent className="p-4 space-y-2">
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="font-semibold text-[#1F3C5B]">{selectedApplication.full_name || selectedApplication.name || "-"}</p>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm text-slate-700">{selectedApplication.email || "-"}</p>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-slate-700">{selectedApplication.phone || "-"}</p>
                  </CardContent></Card>

                  <Card className="border border-slate-100 shadow-sm"><CardContent className="p-4 space-y-2">
                    <p className="text-xs text-slate-500">City</p>
                    <p className="text-sm text-slate-700">{selectedApplication.city || "-"}</p>
                    <p className="text-xs text-slate-500">National ID</p>
                    <p className="text-sm text-slate-700">{selectedApplication.national_id || "-"}</p>
                    <p className="text-xs text-slate-500">Date of Birth</p>
                    <p className="text-sm text-slate-700">{selectedApplication.date_of_birth || "-"}</p>
                  </CardContent></Card>
                </div>

                <Card className="border border-slate-100 shadow-sm"><CardContent className="p-4 space-y-3">
                  <p className="text-xs text-slate-500">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {parseList(selectedApplication.volunteer_languages).length > 0 ? parseList(selectedApplication.volunteer_languages).map((lang: string) => (
                      <Badge key={lang} variant="outline" className="text-[#1F3C5B] border-[#1F3C5B]/20 bg-[#EAF2FB]">{lang}</Badge>
                    )) : <span className="text-sm text-slate-500">No languages provided.</span>}
                  </div>

                  <p className="text-xs text-slate-500 pt-1">Availability</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedApplication.volunteer_availability || "No availability details provided."}</p>

                  <p className="text-xs text-slate-500 pt-1">Motivation</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedApplication.volunteer_motivation || "No motivation details provided."}</p>
                </CardContent></Card>

                <Card className="border border-slate-100 shadow-sm"><CardContent className="p-4 space-y-3">
                  <p className="text-xs text-slate-500">Uploaded Documents</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-600">ID document</span>
                      {selectedApplication.id_document_path ? (
                        <a href={selectedApplication.id_document_path} target="_blank" rel="noreferrer" className="text-[#1F3C5B] underline underline-offset-2">Open document</a>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-600">Certification document</span>
                      {selectedApplication.certification_document_path ? (
                        <a href={selectedApplication.certification_document_path} target="_blank" rel="noreferrer" className="text-[#1F3C5B] underline underline-offset-2">Open document</a>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>
                  </div>
                </CardContent></Card>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={() => setApplicationOpen(false)}>Close</Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={async () => {
                      await rejectRequest(selectedApplication.id);
                      setApplicationOpen(false);
                      setSelectedApplication(null);
                    }}
                  >
                    Refuse Application
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={async () => {
                      await approveRequest(selectedApplication.id);
                      setApplicationOpen(false);
                      setSelectedApplication(null);
                    }}
                  >
                    Activate Volunteer
                  </Button>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>

        {/* Volunteer Analytics Modal */}
        <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto rounded-3xl border-none p-0 shadow-2xl">
            <DialogHeader className="bg-[#1F3C5B] p-6 text-white">
              <DialogTitle className="text-2xl font-bold">
                {analyticsData?.volunteer?.full_name || analyticsData?.volunteer?.name || 'Volunteer'} — Analytics
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm">
                {analyticsData?.volunteer?.email} · Member since {analyticsData?.volunteer?.created_at ? String(analyticsData.volunteer.created_at).slice(0, 10) : 'N/A'}
              </DialogDescription>
            </DialogHeader>

            {analyticsLoading ? (
              <div className="p-16 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#1F3C5B]" />
                <p className="text-slate-500 font-medium">Loading volunteer analytics...</p>
              </div>
            ) : analyticsData ? (
              <div className="p-6 space-y-6">
                {/* Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {(['impact', 'earnings', 'performance', 'reviews'] as const).map((tab) => (
                    <Button
                      key={tab}
                      variant={analyticsTab === tab ? 'default' : 'outline'}
                      className={`rounded-xl capitalize text-sm ${analyticsTab === tab ? 'bg-[#1F3C5B] text-white' : ''}`}
                      onClick={() => setAnalyticsTab(tab)}
                    >
                      {tab === 'impact' && <BarChart3 size={14} className="mr-1" />}
                      {tab === 'earnings' && <DollarSign size={14} className="mr-1" />}
                      {tab === 'performance' && <Award size={14} className="mr-1" />}
                      {tab === 'reviews' && <Star size={14} className="mr-1" />}
                      {tab}
                    </Button>
                  ))}
                </div>

                {/* Impact Tab */}
                {analyticsTab === 'impact' && (() => {
                  const impact = analyticsData.impact || {};
                  const summary = impact.summary || {};
                  const thisMonth = impact.this_month || {};
                  const weeklyActivity: any[] = Array.isArray(impact.weekly_activity) ? impact.weekly_activity : [];
                  const requestTypes: any[] = Array.isArray(impact.request_types) ? impact.request_types : [];
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Completed</p>
                          <p className="text-2xl font-bold text-[#1F3C5B]">{summary.completed_requests_count ?? 0}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Avg Rating</p>
                          <p className="text-2xl font-bold text-amber-600">{summary.avg_rating ?? '-'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Net Earnings</p>
                          <p className="text-2xl font-bold text-emerald-700">{summary.net_earnings_all_time ?? 0} {summary.currency || 'EGP'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Pending</p>
                          <p className="text-2xl font-bold text-orange-600">{summary.pending_requests_count ?? 0}</p>
                        </CardContent></Card>
                      </div>

                      <Card className="border-none shadow-sm"><CardContent className="p-4">
                        <p className="text-sm font-semibold text-[#1F3C5B] mb-1">This Month</p>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#1F3C5B]">{thisMonth.net_earnings ?? 0} EGP</span>
                          <Badge variant="outline" className={Number(thisMonth.change_percentage_vs_last_month) >= 0 ? 'text-emerald-700 border-emerald-200' : 'text-red-700 border-red-200'}>
                            {Number(thisMonth.change_percentage_vs_last_month) >= 0 ? '+' : ''}{thisMonth.change_percentage_vs_last_month ?? 0}% vs last month
                          </Badge>
                        </div>
                      </CardContent></Card>

                      {weeklyActivity.length > 0 && (
                        <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Weekly Activity</CardTitle></CardHeader><CardContent>
                          <div className="h-[200px] w-full">
                            <ResponsiveContainer width="99%" height={200}>
                              <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="completed_requests" name="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={24} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent></Card>
                      )}

                      {requestTypes.length > 0 && (
                        <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Request Types</CardTitle></CardHeader><CardContent>
                          <div className="space-y-2">
                            {requestTypes.map((rt: any) => (
                              <div key={rt.type} className="flex items-center justify-between text-sm">
                                <span className="text-slate-700">{rt.label}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-[#1F3C5B]" style={{ width: `${rt.percentage}%` }} /></div>
                                  <span className="text-xs font-medium text-slate-500 w-12 text-right">{rt.count} ({rt.percentage}%)</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent></Card>
                      )}
                    </div>
                  );
                })()}

                {/* Earnings Tab */}
                {analyticsTab === 'earnings' && (() => {
                  const earnings = analyticsData.earnings || {};
                  const es = earnings.summary || {};
                  const monthlyNet: any[] = Array.isArray(earnings.monthly_net_earnings) ? earnings.monthly_net_earnings : [];
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Gross Earnings</p>
                          <p className="text-xl font-bold text-[#1F3C5B]">{es.gross_earnings ?? 0} {es.currency || 'EGP'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Platform Fees ({es.service_fee_percentage ?? 30}%)</p>
                          <p className="text-xl font-bold text-red-600">{es.platform_fees ?? 0} {es.currency || 'EGP'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Net Earnings</p>
                          <p className="text-xl font-bold text-emerald-700">{es.net_earnings ?? 0} {es.currency || 'EGP'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Cleared</p>
                          <p className="text-xl font-bold text-blue-700">{es.cleared_earnings ?? 0} {es.currency || 'EGP'}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Pending Clearance</p>
                          <p className="text-xl font-bold text-amber-700">{es.pending_clearance ?? 0} {es.currency || 'EGP'}</p>
                        </CardContent></Card>
                      </div>

                      {earnings.fee_info && (
                        <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
                          <p className="text-sm font-semibold text-blue-800">{earnings.fee_info.title}</p>
                          <p className="text-xs text-blue-700 mt-1">{earnings.fee_info.description}</p>
                        </div>
                      )}

                      {monthlyNet.length > 0 && (
                        <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Monthly Net Earnings (6 months)</CardTitle></CardHeader><CardContent>
                          <div className="h-[200px] w-full">
                            <ResponsiveContainer width="99%" height={200}>
                              <BarChart data={monthlyNet} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="amount" name="Net (EGP)" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={28} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent></Card>
                      )}
                    </div>
                  );
                })()}

                {/* Performance Tab */}
                {analyticsTab === 'performance' && (() => {
                  const perf = analyticsData.performance || {};
                  const pm = perf.metrics || {};
                  const badges: any[] = Array.isArray(perf.badges) ? perf.badges : [];
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Avg Rating</p>
                          <div className="flex items-center gap-1 mt-1"><Star size={16} fill="#f59e0b" className="text-amber-500" /><span className="text-xl font-bold text-[#1F3C5B]">{pm.average_rating ?? '-'}</span><span className="text-xs text-slate-400">/ {pm.average_rating_out_of ?? 5}</span></div>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">On-Time Rate</p>
                          <p className="text-xl font-bold text-emerald-700">{pm.on_time_rate ?? 0}%</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Users Helped</p>
                          <p className="text-xl font-bold text-[#1F3C5B]">{pm.users_helped ?? 0}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">5-Star Ratings</p>
                          <p className="text-xl font-bold text-amber-600">{pm.five_star_ratings ?? 0}</p>
                        </CardContent></Card>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card className="border-none shadow-sm"><CardContent className="p-4 text-center">
                          <p className="text-xs text-slate-500">Completed</p>
                          <p className="text-2xl font-bold text-[#1F3C5B]">{pm.completed_requests ?? 0}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4 text-center">
                          <p className="text-xs text-slate-500">Pending</p>
                          <p className="text-2xl font-bold text-orange-600">{pm.pending_requests ?? 0}</p>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4 text-center">
                          <p className="text-xs text-slate-500">Positive Reviews</p>
                          <p className="text-2xl font-bold text-emerald-700">{pm.positive_reviews ?? 0}</p>
                        </CardContent></Card>
                      </div>

                      {badges.length > 0 && (
                        <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Earned Badges</CardTitle></CardHeader><CardContent>
                          <div className="flex flex-wrap gap-3">
                            {badges.map((badge: any) => (
                              <div key={badge.code} className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-4 py-2">
                                <Award size={16} className="text-amber-600" />
                                <span className="text-sm font-semibold text-amber-800">{badge.title}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent></Card>
                      )}
                    </div>
                  );
                })()}

                {/* Reviews Tab */}
                {analyticsTab === 'reviews' && (() => {
                  const reviewsData = analyticsData.reviews || {};
                  const rSummary = reviewsData.summary || {};
                  const rDist = rSummary.distribution || {};
                  const reviewItems: any[] = Array.isArray(reviewsData.data) ? reviewsData.data : [];
                  const rMeta = reviewsData.meta || {};
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Avg Rating</p>
                          <div className="flex items-center gap-1 mt-1"><Star size={16} fill="#f59e0b" className="text-amber-500" /><span className="text-xl font-bold text-[#1F3C5B]">{rSummary.average_rating ?? '-'}</span></div>
                        </CardContent></Card>
                        <Card className="border-none shadow-sm"><CardContent className="p-4">
                          <p className="text-xs text-slate-500">Total Reviews</p>
                          <p className="text-xl font-bold text-[#1F3C5B]">{rSummary.total_reviews ?? 0}</p>
                        </CardContent></Card>
                      </div>

                      <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Rating Distribution</CardTitle></CardHeader><CardContent>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = rDist[String(star)] || rDist[star] || 0;
                            const maxCount = Math.max(...[5, 4, 3, 2, 1].map((s) => rDist[String(s)] || rDist[s] || 0), 1);
                            return (
                              <div key={star} className="flex items-center gap-3">
                                <span className="text-sm font-medium w-8 text-slate-600">{star}★</span>
                                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${(count / maxCount) * 100}%` }} />
                                </div>
                                <span className="text-sm font-semibold w-8 text-right text-slate-700">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent></Card>

                      {reviewItems.length > 0 && (
                        <Card className="border-none shadow-sm"><CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-[#1F3C5B]">Recent Reviews ({rMeta.total ?? reviewItems.length} total)</CardTitle></CardHeader><CardContent>
                          <div className="space-y-3">
                            {reviewItems.map((review: any, idx: number) => (
                              <div key={review.id || idx} className="rounded-xl border border-slate-100 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-semibold text-[#1F3C5B]">{review.reviewer?.name || review.reviewer_name || 'Anonymous'}</span>
                                  <div className="flex items-center gap-1 text-amber-500">
                                    {Array.from({ length: review.rating || 0 }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                  </div>
                                </div>
                                {review.comment && <p className="text-sm text-slate-600">{review.comment}</p>}
                                <p className="text-xs text-slate-400 mt-2">{review.date || (review.created_at ? String(review.created_at).slice(0, 10) : '')}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent></Card>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
