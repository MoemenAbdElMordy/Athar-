import React, { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { User as UserIcon, Bell, Database, ClipboardList, Accessibility, Loader2, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

type Preference = { id: string; label: string; description: string; checked: boolean };

const preferenceDefaults: Preference[] = [
  { id: "notif_reports", label: "Email notifications for new reports", description: "Get alerted when a user flags incorrect accessibility info", checked: true },
  { id: "notif_help", label: "Push notifications for help requests", description: "Real-time alerts for urgent mobility assistance", checked: true },
  { id: "notif_summary", label: "Weekly analytics summary", description: "Receive a performance report every Monday morning", checked: false },
  { id: "maintenance", label: "Maintenance mode", description: "Temporarily disable public submissions", checked: false },
];

const createEmptyReportForm = () => ({
  verified: false,
  wide_entrance: false,
  wheelchair_accessible: false,
  elevator_available: false,
  ramp_available: false,
  parking: false,
  accessible_toilet: false,
  notes: "",
});

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Profile Information");
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({ email: "admin@athar.app", name: "Admin" });
  const [preferences, setPreferences] = useState<Preference[]>(preferenceDefaults);

  const [categories, setCategories] = useState<any[]>([]);
  const [governments, setGovernments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [submissionSearch, setSubmissionSearch] = useState("");
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState("all");
  const [places, setPlaces] = useState<any[]>([]);

  const [submissionsPage, setSubmissionsPage] = useState(1);
  const [placesPage, setPlacesPage] = useState(1);

  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [newGovernment, setNewGovernment] = useState("");

  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [reportForm, setReportForm] = useState(createEmptyReportForm());

  const selectedSubmissionStats = useMemo(
    () => ({
      pending: submissions.filter((item) => item.status === "pending").length,
      approved: submissions.filter((item) => item.status === "approved").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
    }),
    [submissions],
  );

  const filteredSubmissions = useMemo(() => {
    const q = submissionSearch.toLowerCase();
    return submissions.filter((item) => {
      const matchesSearch = !q ||
        String(item.name || "").toLowerCase().includes(q) ||
        String(item.address || "").toLowerCase().includes(q) ||
        String(item.submitter?.full_name || item.submitter?.name || "").toLowerCase().includes(q) ||
        String(item.category?.name || "").toLowerCase().includes(q);
      const matchesStatus = submissionStatusFilter === "all" || item.status === submissionStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, submissionSearch, submissionStatusFilter]);

  const selectedPlace = useMemo(
    () => places.find((place) => String(place.id) === selectedLocationId),
    [places, selectedLocationId],
  );

  const settingsStats = useMemo(() => ({
    categories: categories.length,
    governments: governments.length,
    pendingSubmissions: selectedSubmissionStats.pending,
    verifiedPlaces: places.filter((place) => place.verified).length,
  }), [categories.length, governments.length, selectedSubmissionStats.pending, places]);

  const submissionsPageSize = 10;
  const submissionsTotalPages = Math.max(1, Math.ceil(filteredSubmissions.length / submissionsPageSize));
  const submissionsStartIndex = (submissionsPage - 1) * submissionsPageSize;
  const submissionsEndIndex = submissionsStartIndex + submissionsPageSize;
  const pagedSubmissions = filteredSubmissions.slice(submissionsStartIndex, submissionsEndIndex);

  const placesPageSize = 10;
  const placesTotalPages = Math.max(1, Math.ceil(places.length / placesPageSize));
  const placesStartIndex = (placesPage - 1) * placesPageSize;
  const placesEndIndex = placesStartIndex + placesPageSize;
  const pagedPlaces = places.slice(placesStartIndex, placesEndIndex);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [me, categoriesData, governmentsData, submissionsData, placesData] = await Promise.all([
        api.auth.me(),
        api.categories.getAll(),
        api.governments.getAll(),
        api.placeSubmissions.getIndex(),
        api.places.getAll(),
      ]);

      setProfile({
        email: me?.email || "admin@athar.app",
        name: me?.name || me?.full_name || "Admin",
      });
      setCategories(categoriesData);
      setGovernments(governmentsData);
      setSubmissions(submissionsData.items || []);
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

  useEffect(() => {
    setSubmissionsPage(1);
  }, [filteredSubmissions.length, submissionSearch, submissionStatusFilter]);

  useEffect(() => {
    setPlacesPage(1);
  }, [places.length]);

  useEffect(() => {
    if (!selectedPlace) {
      setReportForm(createEmptyReportForm());
      return;
    }

    setReportForm({
      ...createEmptyReportForm(),
      ...(selectedPlace.accessibility_report || {}),
      notes: selectedPlace.accessibility_report?.notes || "",
    });
  }, [selectedPlace]);

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
      await loadAdminData();
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm bg-white"><CardContent className="p-4"><p className="text-xs text-slate-500">Categories</p><p className="text-2xl font-bold text-[#1F3C5B] mt-1">{settingsStats.categories}</p></CardContent></Card>
            <Card className="border-none shadow-sm bg-white"><CardContent className="p-4"><p className="text-xs text-slate-500">Governments</p><p className="text-2xl font-bold text-[#1F3C5B] mt-1">{settingsStats.governments}</p></CardContent></Card>
            <Card className="border-none shadow-sm bg-white"><CardContent className="p-4"><p className="text-xs text-slate-500">Pending Submissions</p><p className="text-2xl font-bold text-amber-700 mt-1">{settingsStats.pendingSubmissions}</p></CardContent></Card>
            <Card className="border-none shadow-sm bg-white"><CardContent className="p-4"><p className="text-xs text-slate-500">Verified Places</p><p className="text-2xl font-bold text-emerald-700 mt-1">{settingsStats.verifiedPlaces}</p></CardContent></Card>
          </div>

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

                <div className="flex flex-col md:flex-row gap-3">
                  <Input value={submissionSearch} onChange={(e) => setSubmissionSearch(e.target.value)} placeholder="Search submissions by name, address, submitter, category..." className="rounded-xl" />
                  <Select value={submissionStatusFilter} onValueChange={setSubmissionStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px] rounded-xl"><SelectValue placeholder="Filter status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  {pagedSubmissions.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1F3C5B]">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.address}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500">
                          <span>Category: {item.category?.name || 'Uncategorized'}</span>
                          <span>Submitter: {item.submitter?.full_name || item.submitter?.name || `User #${item.submitter_id ?? '-'}`}</span>
                          <span>Status: {item.status}</span>
                          {item.reviewer ? <span>Reviewer: {item.reviewer.full_name || item.reviewer.name}</span> : null}
                        </div>
                        {item.rejection_reason ? <p className="text-xs text-red-500 mt-1">Rejection reason: {item.rejection_reason}</p> : null}
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
                  {pagedSubmissions.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">No submissions found for the current filters.</div>
                  )}
                </div>

                {!loading && filteredSubmissions.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="text-sm text-slate-500">
                      Showing <span className="font-medium text-slate-700">{Math.min(submissionsStartIndex + 1, filteredSubmissions.length)}</span> -{' '}
                      <span className="font-medium text-slate-700">{Math.min(submissionsEndIndex, filteredSubmissions.length)}</span> of{' '}
                      <span className="font-medium text-slate-700">{filteredSubmissions.length}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 gap-2"
                        onClick={() => setSubmissionsPage((p) => Math.max(1, p - 1))}
                        disabled={submissionsPage <= 1}
                      >
                        <ChevronLeft size={18} />
                        <span>Previous</span>
                      </Button>

                      <div className="text-sm text-slate-500 min-w-[110px] text-center">
                        Page <span className="font-medium text-slate-700">{submissionsPage}</span> /{' '}
                        <span className="font-medium text-slate-700">{submissionsTotalPages}</span>
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 gap-2"
                        onClick={() => setSubmissionsPage((p) => Math.min(submissionsTotalPages, p + 1))}
                        disabled={submissionsPage >= submissionsTotalPages}
                      >
                        <span>Next</span>
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                )}
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

                {selectedPlace && (
                  <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#1F3C5B]">{selectedPlace.name}</p>
                        <p className="text-xs text-slate-500">{selectedPlace.address}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className={selectedPlace.verified ? "text-emerald-700 border-emerald-200 bg-emerald-50" : "text-slate-600 border-slate-200 bg-white"}>{selectedPlace.status}</Badge>
                        <Badge variant="outline" className="bg-white">Rating {Number(selectedPlace.average_rating || 0).toFixed(1)}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(selectedPlace.tags || []).length > 0 ? selectedPlace.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-teal-50 text-teal-700">{tag}</Badge>
                      )) : <span className="text-xs text-slate-500">No existing accessibility tags.</span>}
                    </div>
                  </div>
                )}

                {!loading && places.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-slate-500">
                      Showing <span className="font-medium text-slate-700">{Math.min(placesStartIndex + 1, places.length)}</span> -{' '}
                      <span className="font-medium text-slate-700">{Math.min(placesEndIndex, places.length)}</span> of{' '}
                      <span className="font-medium text-slate-700">{places.length}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 gap-2"
                        onClick={() => setPlacesPage((p) => Math.max(1, p - 1))}
                        disabled={placesPage <= 1}
                      >
                        <ChevronLeft size={18} />
                        <span>Previous</span>
                      </Button>

                      <div className="text-sm text-slate-500 min-w-[110px] text-center">
                        Page <span className="font-medium text-slate-700">{placesPage}</span> /{' '}
                        <span className="font-medium text-slate-700">{placesTotalPages}</span>
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 gap-2"
                        onClick={() => setPlacesPage((p) => Math.min(placesTotalPages, p + 1))}
                        disabled={placesPage >= placesTotalPages}
                      >
                        <span>Next</span>
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(reportForm).map(([key, value]) => (
                    key !== 'notes' ? (
                    <label key={key} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-sm">
                      <span className="capitalize text-slate-700">{key.replace(/_/g, " ")}</span>
                      <Switch
                        checked={Boolean(value)}
                        onCheckedChange={(checked: boolean) => setReportForm((prev) => ({ ...prev, [key]: checked }))}
                      />
                    </label>
                    ) : null
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" className="rounded-xl min-h-[100px]" value={reportForm.notes} onChange={(e) => setReportForm((prev) => ({ ...prev, notes: e.target.value }))} placeholder="Add admin verification notes or context..." />
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
