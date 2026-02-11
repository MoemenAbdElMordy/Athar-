import React, { useState } from "react";
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

const initialReports = [
  { id: 1, type: "Incorrect Info", place: "Mall of Egypt", description: "Elevator on floor 2 is actually out of service for 3 months now.", status: "Pending", user: "Ahmed Y.", date: "2024-02-09" },
  { id: 2, type: "Inaccessible", place: "Nile Hospital", description: "Ramp at the emergency entrance is too steep and slippery.", status: "In Review", user: "Sara K.", date: "2024-02-08" },
  { id: 3, type: "Spam", place: "Unknown Location", description: "Ads for another service inside the description.", status: "Resolved", user: "System", date: "2024-02-07" },
  { id: 4, type: "Incorrect Info", place: "Public Library", description: "Wrong working hours, it closes at 5pm not 8pm.", status: "Pending", user: "Omar G.", date: "2024-02-06" },
];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);

  const resolveReport = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: "Resolved" } : r));
    toast.success("Report marked as resolved");
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
                          onClick={() => {
                            setReports(reports.map(r => r.id === report.id ? { ...r, status: "In Review" } : r));
                            toast.info(`Information request sent to ${report.user}`);
                          }}
                        >
                          Request Info
                        </Button>
                        <Button variant="ghost" className="w-full rounded-xl text-red-500 hover:bg-red-50">
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
