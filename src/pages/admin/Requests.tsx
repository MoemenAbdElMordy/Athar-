import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Search, 
  LayoutGrid, 
  List, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ChevronLeft,
  ChevronRight,
  XCircle,
  Loader2,
  Star,
  DollarSign,
  UserCheck,
  Filter,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Banknote
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

function statusBadgeClass(status: string) {
  switch (status) {
    case "Pending": return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    case "In Progress": return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "Resolved": return "bg-green-100 text-green-700 hover:bg-green-100";
    case "Cancelled": return "bg-red-100 text-red-700 hover:bg-red-100";
    default: return "bg-slate-100 text-slate-700 hover:bg-slate-100";
  }
}

function urgencyBadgeClass(level: string) {
  switch (level) {
    case "high": return "bg-red-100 text-red-700 border-red-200";
    case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
    case "low": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

export default function Requests() {
  const [view, setView] = useState<'grid' | 'table'>('table');
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [paymentCompletionFilter, setPaymentCompletionFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const paymentCompleted = paymentCompletionFilter === "all"
        ? undefined
        : paymentCompletionFilter === "paid";

      const requestFilters: Record<string, string | boolean> = {
        status: statusFilter,
      };

      if (typeFilter !== "all") {
        requestFilters.assistance_type = typeFilter;
      }

      if (paymentFilter !== "all") {
        requestFilters.payment_method = paymentFilter;
      }

      if (typeof paymentCompleted === "boolean") {
        requestFilters.payment_completed = paymentCompleted;
      }

      if (urgencyFilter !== "all") {
        requestFilters.urgency_level = urgencyFilter;
      }

      const data = await api.requests.getAll(requestFilters);
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      toast.error("Failed to load requests from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, typeFilter, paymentFilter, paymentCompletionFilter, urgencyFilter]);

  const updateStatus = async (id: string | number, status: string) => {
    try {
      const updated = await api.requests.update(id, { status });
      setRequests(requests.map((r: any) => r.id === id ? updated : r));
      toast.success(`Request marked as ${status.toLowerCase()}`);
    } catch { toast.error("Failed to update status"); }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.requests.delete(id);
      setRequests(requests.filter((r: any) => r.id !== id));
      toast.success("Request deleted");
    } catch { toast.error("Failed to delete request"); }
  };

  const filteredRequests = requests.filter((r: any) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || 
      r.requester?.toLowerCase().includes(q) ||
      r.volunteer?.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q) ||
      r.notes?.toLowerCase().includes(q) ||
      r.assistance_type?.toLowerCase().includes(q);
    return matchesSearch;
  });

  const pageSize = 15;
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedRequests = filteredRequests.slice(startIndex, endIndex);

  const uniqueTypes = [...new Set(requests.map((r: any) => r.assistance_type).filter(Boolean))];

  useEffect(() => { setCurrentPage(1); }, [searchTerm, requests.length, statusFilter, typeFilter, paymentFilter, paymentCompletionFilter, urgencyFilter]);

  // Summary stats
  const totalCount = requests.length;
  const completedCount = requests.filter(r => r.raw_status === 'completed').length;
  const totalRevenue = requests.reduce((sum, r) => sum + (r.service_fee || 0), 0);
  const avgRating = (() => {
    const rated = requests.filter(r => r.rating);
    return rated.length ? (rated.reduce((s, r) => s + r.rating, 0) / rated.length).toFixed(1) : "-";
  })();

  return (
    <AdminLayout title="Help Requests Management">
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600"><MessageSquare size={18} /></div>
            <div><p className="text-xs text-slate-500">Total Requests</p><p className="text-xl font-bold text-[#1F3C5B]">{totalCount}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600"><UserCheck size={18} /></div>
            <div><p className="text-xs text-slate-500">Completed</p><p className="text-xl font-bold text-[#1F3C5B]">{completedCount}</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600"><DollarSign size={18} /></div>
            <div><p className="text-xs text-slate-500">Total Revenue</p><p className="text-xl font-bold text-[#1F3C5B]">{totalRevenue.toFixed(2)} EGP</p></div>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-600"><Star size={18} /></div>
            <div><p className="text-xs text-slate-500">Avg Rating</p><p className="text-xl font-bold text-[#1F3C5B]">{avgRating}</p></div>
          </CardContent></Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search by name, volunteer, location, type..." className="pl-10 rounded-xl bg-white border-slate-200" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg gap-1" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} /> Filters {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
              <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" className={`rounded-lg ${view === 'grid' ? 'bg-[#EAF2FB] text-[#1F3C5B]' : 'text-slate-400'}`} onClick={() => setView('grid')}>
                <LayoutGrid size={16} className="mr-1" /> Grid
              </Button>
              <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" className={`rounded-lg ${view === 'table' ? 'bg-[#EAF2FB] text-[#1F3C5B]' : 'text-slate-400'}`} onClick={() => setView('table')}>
                <List size={16} className="mr-1" /> Table
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Assistance Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(t => <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Payment" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentCompletionFilter} onValueChange={setPaymentCompletionFilter}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Payment State" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="bg-white"><SelectValue placeholder="Urgency" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#1F3C5B] animate-spin" />
            <p className="text-slate-500 font-medium">Loading requests...</p>
          </div>
        ) : (
          <div>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pagedRequests.map((req: any) => (
                  <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#EAF2FB] rounded-full flex items-center justify-center text-[#1F3C5B] font-bold text-sm">
                              {req.requester?.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-[#1F3C5B] text-sm">{req.requester}</h3>
                              <div className="flex items-center text-xs text-slate-400 gap-1"><Clock size={11} /> {req.time ? new Date(req.time).toLocaleDateString() : "Recently"}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={statusBadgeClass(req.status)}>{req.status}</Badge>
                            {req.urgency_level && <Badge variant="outline" className={urgencyBadgeClass(req.urgency_level) + " text-xs"}>{req.urgency_level}</Badge>}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {req.assistance_type && (
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="capitalize text-xs">{req.assistance_type.replace(/_/g, " ")}</Badge>
                              {req.payment_method && (
                                <Badge variant="outline" className={req.payment_method === 'cash' ? 'text-amber-700 border-amber-200 bg-amber-50 text-xs' : 'text-violet-700 border-violet-200 bg-violet-50 text-xs'}>
                                  {req.payment_method === 'cash' ? <><Banknote size={12} className="mr-1" /> Cash</> : <><CreditCard size={12} className="mr-1" /> Card</>}
                                </Badge>
                              )}
                              <Badge variant="outline" className={req.payment_completed ? 'text-green-700 border-green-200 bg-green-50 text-xs' : 'text-red-700 border-red-200 bg-red-50 text-xs'}>
                                {req.payment_completed ? 'Paid' : 'Unpaid'}
                              </Badge>
                            </div>
                          )}
                          <div className="flex gap-2 text-sm text-slate-600">
                            <MapPin size={14} className="text-[#C9A24D] shrink-0 mt-0.5" />
                            <span className="text-xs">{req.location}</span>
                          </div>
                          {req.notes !== 'No details' && (
                            <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg italic line-clamp-2">"{req.notes}"</div>
                          )}
                        </div>

                        {/* Volunteer & Financial info */}
                        <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                          <div>
                            {req.volunteer ? (
                              <span className="text-teal-700 font-medium"><UserCheck size={12} className="inline mr-1" />{req.volunteer}</span>
                            ) : (
                              <span className="text-slate-400">No volunteer assigned</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {req.service_fee > 0 && <span className="font-semibold text-emerald-600">{req.service_fee} EGP</span>}
                            {req.rating && (
                              <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                                <Star size={12} fill="currentColor" />{req.rating}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          {req.status === "Pending" && (
                            <Button size="sm" className="flex-1 bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl h-8 text-xs" onClick={() => updateStatus(req.id, "In Progress")}>Claim</Button>
                          )}
                          {req.status === "In Progress" && (
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl h-8 text-xs" onClick={() => updateStatus(req.id, "Resolved")}>Resolve</Button>
                          )}
                          <Button variant="outline" size="icon" className="rounded-xl border-slate-200 shrink-0 text-red-500 hover:text-red-700 h-8 w-8" onClick={() => handleDelete(req.id)}>
                            <XCircle size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">ID</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Requester</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Volunteer</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Type</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Urgency</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Payment</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Payment State</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Fee</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Rating</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Status</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs">Date</th>
                        <th className="px-4 py-3 font-semibold text-slate-500 text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {pagedRequests.map((req: any) => (
                        <React.Fragment key={req.id}>
                          <tr className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}>
                            <td className="px-4 py-3 text-xs text-slate-400">#{req.id}</td>
                            <td className="px-4 py-3">
                              <p className="text-sm font-semibold text-[#1F3C5B]">{req.requester}</p>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{req.volunteer || <span className="text-slate-300">-</span>}</td>
                            <td className="px-4 py-3"><Badge variant="secondary" className="capitalize text-xs">{req.assistance_type?.replace(/_/g, " ") || "-"}</Badge></td>
                            <td className="px-4 py-3">{req.urgency_level ? <Badge variant="outline" className={urgencyBadgeClass(req.urgency_level) + " text-xs"}>{req.urgency_level}</Badge> : "-"}</td>
                            <td className="px-4 py-3">
                              {req.payment_method ? (
                                <Badge variant="outline" className={req.payment_method === 'cash' ? 'text-amber-700 border-amber-200 bg-amber-50 text-xs' : 'text-violet-700 border-violet-200 bg-violet-50 text-xs'}>
                                  {req.payment_method}
                                </Badge>
                              ) : "-"}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={req.payment_completed ? 'text-green-700 border-green-200 bg-green-50 text-xs' : 'text-red-700 border-red-200 bg-red-50 text-xs'}>
                                {req.payment_completed ? 'Paid' : 'Unpaid'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{req.service_fee > 0 ? `${req.service_fee}` : "-"}</td>
                            <td className="px-4 py-3">
                              {req.rating ? (
                                <span className="flex items-center gap-0.5 text-amber-600 font-semibold text-sm"><Star size={12} fill="currentColor" />{req.rating}</span>
                              ) : "-"}
                            </td>
                            <td className="px-4 py-3"><Badge className={statusBadgeClass(req.status) + " text-xs"}>{req.status}</Badge></td>
                            <td className="px-4 py-3 text-xs text-slate-400">{req.time ? new Date(req.time).toLocaleDateString() : "-"}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-1">
                                {req.status === "Pending" && <Button size="sm" className="h-7 text-xs bg-[#1F3C5B]" onClick={(e: React.MouseEvent) => { e.stopPropagation(); updateStatus(req.id, "In Progress"); }}>Claim</Button>}
                                {req.status === "In Progress" && <Button size="sm" className="h-7 text-xs bg-green-600" onClick={(e: React.MouseEvent) => { e.stopPropagation(); updateStatus(req.id, "Resolved"); }}>Resolve</Button>}
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDelete(req.id); }}><XCircle size={14} /></Button>
                              </div>
                            </td>
                          </tr>
                          {expandedId === req.id && (
                            <tr>
                              <td colSpan={12} className="px-4 py-4 bg-slate-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div className="space-y-2">
                                    <p className="font-semibold text-[#1F3C5B]">Request Details</p>
                                    <div className="text-xs space-y-1 text-slate-600">
                                      <p><span className="font-medium">From:</span> {req.from_name || req.location}</p>
                                      {req.to_name && <p><span className="font-medium">To:</span> {req.to_name}</p>}
                                      {req.notes !== 'No details' && <p><span className="font-medium">Notes:</span> {req.notes}</p>}
                                      {req.accepted_at && <p><span className="font-medium">Accepted:</span> {new Date(req.accepted_at).toLocaleString()}</p>}
                                      {req.completed_at && <p><span className="font-medium">Completed:</span> {new Date(req.completed_at).toLocaleString()}</p>}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="font-semibold text-[#1F3C5B]">People</p>
                                    <div className="text-xs space-y-1 text-slate-600">
                                      <p><span className="font-medium">Requester:</span> {req.requester} {req.requester_email && `(${req.requester_email})`}</p>
                                      {req.requester_phone && <p><span className="font-medium">Phone:</span> {req.requester_phone}</p>}
                                      {req.volunteer && <p><span className="font-medium">Volunteer:</span> {req.volunteer} {req.volunteer_email && `(${req.volunteer_email})`}</p>}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="font-semibold text-[#1F3C5B]">Financial & Rating</p>
                                    <div className="text-xs space-y-1 text-slate-600">
                                      {req.service_fee > 0 && (
                                        <>
                                          <p><span className="font-medium">Service Fee:</span> {req.service_fee} EGP</p>
                                          <p><span className="font-medium">Platform Fee:</span> {req.fee_amount} EGP</p>
                                          <p><span className="font-medium">Net to Volunteer:</span> {req.net_amount} EGP</p>
                                        </>
                                      )}
                                      <p><span className="font-medium">Payment State:</span> {req.payment_completed ? 'Paid' : 'Unpaid'}</p>
                                      {req.payment_status && <p><span className="font-medium">Payment Status:</span> {req.payment_status}</p>}
                                      {req.payment_paid_at && <p><span className="font-medium">Paid At:</span> {new Date(req.payment_paid_at).toLocaleString()}</p>}
                                      {req.rating && (
                                        <div className="flex items-center gap-1 mt-1">
                                          <span className="font-medium">Rating:</span>
                                          {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= req.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"} />)}
                                          <span className="ml-1">({req.rating}/5)</span>
                                        </div>
                                      )}
                                      {req.review_comment && <p className="italic text-slate-500">"{req.review_comment}"</p>}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {pagedRequests.length === 0 && (
                        <tr><td colSpan={12} className="py-12 text-center text-sm text-slate-500">No requests found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!loading && filteredRequests.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-2">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium text-slate-700">{Math.min(startIndex + 1, filteredRequests.length)}</span> -{' '}
                  <span className="font-medium text-slate-700">{Math.min(endIndex, filteredRequests.length)}</span> of{' '}
                  <span className="font-medium text-slate-700">{filteredRequests.length}</span>
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
