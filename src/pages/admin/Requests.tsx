import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Search, 
  LayoutGrid, 
  List, 
  MessageSquare, 
  MapPin, 
  Clock, 
  MoreHorizontal,
  XCircle,
  Loader2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

export default function Requests() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await api.requests.getAll();
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
  }, []);

  const updateStatus = async (id: string | number, status: string) => {
    try {
      const updated = await api.requests.update(id, { status });
      setRequests(requests.map((r: any) => r.id === id ? updated : r));
      toast.success(`Request marked as ${status.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.requests.delete(id);
      setRequests(requests.filter((r: any) => r.id !== id));
      toast.success("Request deleted");
    } catch (error) {
      toast.error("Failed to delete request");
    }
  };

  const filteredRequests = requests.filter((r: any) => 
    r.requester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Help Requests Queue">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search requests..." 
              className="pl-10 rounded-xl bg-white border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
            <Button 
              variant={view === 'grid' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={`rounded-lg ${view === 'grid' ? 'bg-[#EAF2FB] text-[#1F3C5B]' : 'text-slate-400'}`}
              onClick={() => setView('grid')}
            >
              <LayoutGrid size={18} className="mr-2" /> Grid
            </Button>
            <Button 
              variant={view === 'table' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={`rounded-lg ${view === 'table' ? 'bg-[#EAF2FB] text-[#1F3C5B]' : 'text-slate-400'}`}
              onClick={() => setView('table')}
            >
              <List size={18} className="mr-2" /> Table
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#1F3C5B] animate-spin" />
            <p className="text-slate-500 font-medium">Updating request queue...</p>
          </div>
        ) : (
          <div>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRequests.map((request: any) => (
                  <Card key={request.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#EAF2FB] rounded-full flex items-center justify-center text-[#1F3C5B] font-bold">
                              {request.requester?.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-[#1F3C5B]">{request.requester}</h3>
                              <div className="flex items-center text-xs text-slate-400 gap-1">
                                <Clock size={12} /> {request.time || "Recently"}
                              </div>
                            </div>
                          </div>
                          <Badge className={
                            request.status === "Pending" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                            request.status === "In Progress" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                            "bg-green-100 text-green-700 hover:bg-green-100"
                          }>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex gap-2 text-sm text-slate-600">
                            <MapPin size={16} className="text-[#C9A24D] shrink-0 mt-0.5" />
                            <span className="font-medium">{request.location}</span>
                          </div>
                          <div className="flex gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-xl italic">
                            <MessageSquare size={16} className="text-slate-400 shrink-0 mt-0.5" />
                            "{request.notes}"
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {request.status === "Pending" && (
                            <Button 
                              className="flex-1 bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl"
                              onClick={() => updateStatus(request.id, "In Progress")}
                            >
                              Claim Request
                            </Button>
                          )}
                          {request.status === "In Progress" && (
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl"
                              onClick={() => updateStatus(request.id, "Resolved")}
                            >
                              Resolve Now
                            </Button>
                          )}
                          {request.status === "Resolved" && (
                            <Button 
                              variant="outline" 
                              className="flex-1 rounded-xl border-slate-200"
                              disabled
                            >
                              Resolved
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-xl border-slate-200 shrink-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(request.id)}
                          >
                            <XCircle size={18} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Requester</th>
                      <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Location</th>
                      <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Notes</th>
                      <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Status</th>
                      <th className="px-6 py-4 font-semibold text-slate-500 text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredRequests.map((request: any) => (
                      <tr key={request.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#1F3C5B]">{request.requester}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{request.location}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 max-w-[300px] truncate">{request.notes}</td>
                        <td className="px-6 py-4">
                          <Badge className={
                            request.status === "Pending" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                            request.status === "In Progress" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                            "bg-green-100 text-green-700 hover:bg-green-100"
                          }>
                            {request.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDelete(request.id)}
                          >
                            <XCircle size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
