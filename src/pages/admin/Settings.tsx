import React, { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { User as UserIcon, Bell, Database, ClipboardList, Accessibility, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

type Preference = { id: string; label: string; description: string; checked: boolean };

const preferenceDefaults: Preference[] = [
  { id: "notif_reports", label: "Email notifications for new reports", description: "Get alerted when a user flags incorrect accessibility info", checked: true },
  { id: "notif_help", label: "Push notifications for help requests", description: "Real-time alerts for urgent mobility assistance", checked: true },
  { id: "notif_summary", label: "Weekly analytics summary", description: "Receive a performance report every Monday morning", checked: false },
  { id: "maintenance", label: "Maintenance mode", description: "Temporarily disable public submissions", checked: false },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Profile Information");
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({ email: "admin@athar.app", name: "Admin" });
  const [preferences, setPreferences] = useState<Preference[]>(preferenceDefaults);

  const [categories, setCategories] = useState<any[]>([]);
  const [governments, setGovernments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);

  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [newGovernment, setNewGovernment] = useState("");

  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [reportForm, setReportForm] = useState({
    verified: false,
    wide_entrance: false,
    wheelchair_accessible: false,
    elevator_available: false,
    ramp_available: false,
    parking: false,
  });

  const selectedSubmissionStats = useMemo(
    () => ({
      pending: submissions.filter((item) => item.status === "pending").length,
      approved: submissions.filter((item) => item.status === "approved").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
    }),
    [submissions],
  );

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [me, categoriesData, governmentsData, submissionsData, placesData] = await Promise.all([
        api.auth.me(),
        api.categories.getAll(),
        api.governments.getAll(),
        api.placeSubmissions.getAll(),
        api.places.getAll(),
      ]);

      setProfile({
        email: me?.email || "admin@athar.app",
        name: me?.name || me?.full_name || "Admin",
      });
      setCategories(categoriesData);
      setGovernments(governmentsData);
      setSubmissions(submissionsData);
      setPlaces(placesData);
    } catch (error) {
      console.error("Failed to load settings data", error);
      toast.error("Failed to load admin settings from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await api.categories.create({ name: newCategory.name.trim(), icon: newCategory.icon.trim() || undefined });
      setNewCategory({ name: "", icon: "" });
      await loadAdminData();
      toast.success("Category created");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const handleUpdateCategory = async (item: any) => {
    const updatedName = window.prompt("Update category name", item.name || "");
    if (!updatedName || updatedName.trim() === item.name) return;

    try {
      await api.categories.update(item.id, { name: updatedName.trim() });
      await loadAdminData();
      toast.success("Category updated");
    } catch {
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: string | number) => {
    try {
      await api.categories.delete(id);
      await loadAdminData();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleCreateGovernment = async () => {
    try {
      await api.governments.create(newGovernment.trim() || "");
      setNewGovernment("");
      await loadAdminData();
      toast.success("Government created");
    } catch {
      toast.error("Failed to create government");
    }
  };

  const handleApproveSubmission = async (submission: any) => {
    const governmentId = Number(governments[0]?.id || 0);
    if (!governmentId) {
      toast.error("Create at least one government before approving to location");
      return;
    }

    try {
      await api.placeSubmissions.approve(submission.id, { create_location: true, government_id: governmentId });
      await loadAdminData();
      toast.success("Submission approved");
    } catch {
      toast.error("Failed to approve submission");
    }
  };

  const handleRejectSubmission = async (submission: any) => {
    const reason = window.prompt("Rejection reason", "Insufficient details");
    if (!reason?.trim()) return;

    try {
      await api.placeSubmissions.reject(submission.id, reason.trim());
      await loadAdminData();
      toast.success("Submission rejected");
    } catch {
      toast.error("Failed to reject submission");
    }
  };

  const handleUpsertAccessibilityReport = async () => {
    if (!selectedLocationId) {
      toast.error("Please select a place");
      return;
    }

    try {
      await api.places.upsertAccessibilityReport(selectedLocationId, reportForm);
      toast.success("Accessibility report saved");
      setReportForm({
        verified: false,
        wide_entrance: false,
        wheelchair_accessible: false,
        elevator_available: false,
        ramp_available: false,
        parking: false,
      });
    } catch {
      toast.error("Failed to save accessibility report");
    }
  };

  if (loading) {
    return (
      <AdminLayout title="System Settings">
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#1F3C5B]" size={32} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="System Settings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {[
                  { icon: UserIcon, label: "Profile Information" },
                  { icon: Bell, label: "Notification Prefs" },
                  { icon: Database, label: "Data Dictionaries" },
                  { icon: ClipboardList, label: "Place Submissions" },
                  { icon: Accessibility, label: "Accessibility Reports" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveSection(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                      activeSection === item.label ? "bg-[#EAF2FB] text-[#1F3C5B]" : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {activeSection === "Profile Information" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Admin Profile</CardTitle>
                <CardDescription>Loaded from /admin/me endpoint.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={profile.name} readOnly className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.email} readOnly className="rounded-xl" />
                </div>
                <p className="text-xs text-slate-500">Profile updates are not exposed by backend admin routes yet.</p>
              </CardContent>
            </Card>
          )}

          {activeSection === "Notification Prefs" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">System Preferences</CardTitle>
                <CardDescription>Frontend-only toggles (UI state).</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {preferences.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#1F3C5B]">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                    <Switch
                      checked={item.checked}
                      onCheckedChange={(checked: boolean) => {
                        setPreferences((prev) => prev.map((p) => (p.id === item.id ? { ...p, checked } : p)));
                      }}
                      className="data-[state=checked]:bg-[#1F3C5B]"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "Data Dictionaries" && (
            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-lg font-bold text-[#1F3C5B]">Categories</CardTitle>
                  <CardDescription>Connected to /admin/categories CRUD.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Category name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="Icon (optional)"
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory((prev) => ({ ...prev, icon: e.target.value }))}
                      className="rounded-xl"
                    />
                    <Button onClick={handleCreateCategory} className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl">Add Category</Button>
                  </div>

                  <div className="space-y-2">
                    {categories.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                        <div>
                          <p className="font-semibold text-[#1F3C5B]">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.icon || "No icon"}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleUpdateCategory(item)} className="rounded-lg"><Pencil size={14} /></Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(item.id)} className="rounded-lg text-red-600"><Trash2 size={14} /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-lg font-bold text-[#1F3C5B]">Governments</CardTitle>
                  <CardDescription>Connected to /admin/governments list/create.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Government name"
                      value={newGovernment}
                      onChange={(e) => setNewGovernment(e.target.value)}
                      className="rounded-xl"
                    />
                    <Button onClick={handleCreateGovernment} className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl">Add Government</Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {governments.map((item) => (
                      <Badge key={item.id} variant="secondary" className="bg-slate-100 text-slate-700">
                        {item.accessible_locations || `Government #${item.id}`}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "Place Submissions" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Place Submissions Moderation</CardTitle>
                <CardDescription>Connected to /admin/place-submissions and approve/reject endpoints.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-orange-100 text-orange-700">Pending: {selectedSubmissionStats.pending}</Badge>
                  <Badge className="bg-green-100 text-green-700">Approved: {selectedSubmissionStats.approved}</Badge>
                  <Badge className="bg-red-100 text-red-700">Rejected: {selectedSubmissionStats.rejected}</Badge>
                </div>

                <div className="space-y-3">
                  {submissions.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1F3C5B]">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.address}</p>
                        <p className="text-xs text-slate-500">Status: {item.status}</p>
                      </div>
                      {item.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApproveSubmission(item)} className="bg-green-600 hover:bg-green-700 rounded-lg">Approve</Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectSubmission(item)} className="rounded-lg text-red-600">Reject</Button>
                        </div>
                      ) : (
                        <Badge variant="outline">Reviewed</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "Accessibility Reports" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Accessibility Report Upsert</CardTitle>
                <CardDescription>Connected to /admin/locations/{`{id}`}/accessibility-report.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label>Select Place</Label>
                  <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select place" />
                    </SelectTrigger>
                    <SelectContent>
                      {places.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(reportForm).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
                      <span className="capitalize text-slate-700">{key.replace(/_/g, " ")}</span>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked: boolean) => setReportForm((prev) => ({ ...prev, [key]: checked }))}
                      />
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleUpsertAccessibilityReport} className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8">
                    Save Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
