import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  AlertTriangle, 
  Search, 
  MapPin, 
  User as UserIcon, 
  Calendar, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

function mapReport(flag: any) {
  return {
    id: flag.id,
    type: flag.reason || "Report",
    place: flag.flaggable?.name || flag.flaggable_type || "Unknown Location",
    description: flag.details || flag.admin_note || "No description",
    status: flag.status === 'resolved' ? 'Resolved' : flag.status === 'need_info' ? 'In Review' : flag.status === 'dismissed' ? 'Dismissed' : 'Pending',
    user: flag.flagger?.name || `User #${flag.flagger_id ?? '-'}`,
    date: flag.created_at || '',
  };
}

export default function Reports() {
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async () => {
    try {
      const data = await api.reports.getAll();
      setReports((data || []).map(mapReport));
    } catch {
      toast.error('Failed to load reports');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resolveReport = async (id: number) => {
    try {
      await api.reports.resolve(id);
      setReports(reports.map(r => r.id === id ? { ...r, status: "Resolved" } : r));
      toast.success("Report marked as resolved");
    } catch {
      toast.error('Failed to resolve report');
    }
  };

  return (
    <AdminLayout title="Quality Reports & Moderation">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search reports..." className="pl-10 rounded-xl bg-white border-slate-200" />
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1">2 Pending</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">1 In Review</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="border-none shadow-sm bg-white overflow-hidden border border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-[#1F3C5B]">{report.type}</CardTitle>
                    <p className="text-xs text-slate-400">{report.date} by {report.user}</p>
                  </div>
                </div>
                <Badge className={
                  report.status === "Pending" ? "bg-orange-100 text-orange-700" :
                  report.status === "In Review" ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                }>
                  {report.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="text-[#C9A24D] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#1F3C5B]">{report.place}</p>
                        <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          View Place Details <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-slate-50 p-4 rounded-2xl">
                      <MessageSquare size={18} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    {report.status !== "Resolved" && (
                      <>
                        <Button 
                          className="w-full bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl"
                          onClick={() => resolveReport(report.id)}
                        >
                          Resolve Issue
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-xl border-slate-200"
                          onClick={async () => {
                            try {
                              await api.reports.requestInfo(report.id, 'Please provide more details.');
                              setReports(reports.map(r => r.id === report.id ? { ...r, status: "In Review" } : r));
                              toast.info(`Information request sent to ${report.user}`);
                            } catch {
                              toast.error('Failed to request more information');
                            }
                          }}
                        >
                          Request Info
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full rounded-xl text-red-500 hover:bg-red-50"
                          onClick={async () => {
                            try {
                              await api.reports.dismiss(report.id, 'Dismissed by admin');
                              setReports(reports.map(r => r.id === report.id ? { ...r, status: "Dismissed" } : r));
                              toast.success('Report dismissed');
                            } catch {
                              toast.error('Failed to dismiss report');
                            }
                          }}
                        >
                          Dismiss Report
                        </Button>
                      </>
                    )}
                    {report.status === "Resolved" && (
                      <div className="text-center py-4 bg-green-50 rounded-2xl border border-green-100">
                        <CheckCircle className="mx-auto text-green-600 mb-2" size={24} />
                        <p className="text-sm font-semibold text-green-700">Resolved</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
