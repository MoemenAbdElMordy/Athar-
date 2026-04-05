import React, { useState, useEffect, useMemo } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Archive,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Loader2,
  Star,
  ShieldCheck
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

const createEmptyReport = () => ({
  verified: false,
  wide_entrance: false,
  wheelchair_accessible: false,
  elevator_available: false,
  ramp_available: false,
  parking: false,
  accessible_toilet: false,
  notes: "",
});

const createEmptyPlaceForm = () => ({
  name: "",
  address: "",
  government_id: "",
  category_id: "",
  latitude: "",
  longitude: "",
  report: createEmptyReport(),
});

function normalizePlaceForm(place?: any) {
  return {
    name: place?.name || "",
    address: place?.address || "",
    government_id: String(place?.government_id || ""),
    category_id: String(place?.category_id || ""),
    latitude: place?.latitude ? String(place.latitude) : "",
    longitude: place?.longitude ? String(place.longitude) : "",
    report: {
      ...createEmptyReport(),
      ...(place?.accessibility_report || {}),
      notes: place?.accessibility_report?.notes || "",
    },
  };
}

function hasReportData(report: any) {
  return Boolean(
    report?.verified ||
    report?.wide_entrance ||
    report?.wheelchair_accessible ||
    report?.elevator_available ||
    report?.ramp_available ||
    report?.parking ||
    report?.accessible_toilet ||
    String(report?.notes || "").trim(),
  );
}

export default function Places() {
  const [places, setPlaces] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [governments, setGovernments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [newPlace, setNewPlace] = useState(createEmptyPlaceForm());
  const [editPlace, setEditPlace] = useState(createEmptyPlaceForm());

  const loadData = async () => {
    try {
      setLoading(true);
      const [placesData, categoriesData, governmentsData] = await Promise.all([
        api.places.getAll(),
        api.categories.getAll(),
        api.governments.getAll(),
      ]);
      setPlaces(placesData);
      setCategories(categoriesData);
      setGovernments(governmentsData);
    } catch (error) {
      console.error("Failed to fetch places:", error);
      toast.error("Failed to load places from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickVerify = async (place: any, verified: boolean) => {
    try {
      await api.places.upsertAccessibilityReport(place.id, {
        ...createEmptyReport(),
        ...(place.accessibility_report || {}),
        verified,
      });
      await loadData();
      toast.success(verified ? "Place marked as verified" : "Verification removed");
    } catch {
      toast.error("Failed to update accessibility verification");
    }
  };

  const handleAddPlace = async () => {
    if (!newPlace.name.trim() || !newPlace.address.trim() || !newPlace.government_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const created = await api.places.create({
        name: newPlace.name,
        address: newPlace.address,
        government_id: newPlace.government_id,
        category_id: newPlace.category_id,
        latitude: newPlace.latitude,
        longitude: newPlace.longitude,
      });

      if (hasReportData(newPlace.report)) {
        await api.places.upsertAccessibilityReport(created.id, newPlace.report);
      }

      setIsAddModalOpen(false);
      setNewPlace(createEmptyPlaceForm());
      await loadData();
      toast.success("Place added successfully");
    } catch {
      toast.error("Failed to add place");
    }
  };

  const openPlaceDetails = (place: any) => {
    setSelectedPlace(place);
    setIsDetailsOpen(true);
  };

  const openEditPlace = (place: any) => {
    setSelectedPlace(place);
    setEditPlace(normalizePlaceForm(place));
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPlace) return;
    if (!editPlace.name.trim() || !editPlace.address.trim() || !editPlace.government_id) {
      toast.error("Name, address, and government are required");
      return;
    }

    try {
      await api.places.update(selectedPlace.id, {
        name: editPlace.name,
        address: editPlace.address,
        government_id: editPlace.government_id,
        category_id: editPlace.category_id || undefined,
        latitude: editPlace.latitude || undefined,
        longitude: editPlace.longitude || undefined,
      });
      await api.places.upsertAccessibilityReport(selectedPlace.id, editPlace.report);
      setIsEditOpen(false);
      setSelectedPlace(null);
      await loadData();
      toast.success("Place updated");
    } catch {
      toast.error("Failed to update place");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.places.delete(id);
      setPlaces(places.filter((p: any) => p.id !== id));
      toast.success("Place deleted");
    } catch {
      toast.error("Failed to delete place");
    }
  };

  const filteredPlaces = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return places.filter((p: any) => {
      const matchesSearch = !q ||
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || String(p.category_id) === categoryFilter;
      const matchesVerified = verifiedFilter === "all" ||
        (verifiedFilter === "verified" && p.verified) ||
        (verifiedFilter === "reported" && !p.verified && (p.tags?.length || 0) > 0) ||
        (verifiedFilter === "unverified" && !p.verified && (p.tags?.length || 0) === 0);
      return matchesSearch && matchesCategory && matchesVerified;
    });
  }, [places, searchTerm, categoryFilter, verifiedFilter]);

  const stats = useMemo(() => ({
    total: places.length,
    verified: places.filter((place: any) => place.verified).length,
    reported: places.filter((place: any) => !place.verified && (place.tags?.length || 0) > 0).length,
    averageRating: places.length ? (places.reduce((sum: number, place: any) => sum + Number(place.average_rating || 0), 0) / places.length).toFixed(1) : "0.0",
  }), [places]);

  const exportCsv = () => {
    const header = ["ID", "Name", "Government", "Category", "Address", "Status", "Average Rating", "Reviews Count", "Accessibility Tags"];
    const rows = filteredPlaces.map((place: any) => [
      place.id,
      place.name,
      place.government_name || place.city,
      place.category,
      place.address,
      place.status,
      place.average_rating || 0,
      place.reviews_count || 0,
      (place.tags || []).join(" | "),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "athar-places.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredPlaces.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedPlaces = filteredPlaces.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, places.length, categoryFilter, verifiedFilter]);

  return (
    <AdminLayout title="Manage Places">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm"><CardContent className="p-4">
            <p className="text-xs text-slate-500">Total Places</p>
            <p className="text-2xl font-bold text-[#1F3C5B] mt-1">{stats.total}</p>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4">
            <p className="text-xs text-slate-500">Verified Places</p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.verified}</p>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4">
            <p className="text-xs text-slate-500">Accessibility Tagged</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">{stats.reported}</p>
          </CardContent></Card>
          <Card className="border-none shadow-sm"><CardContent className="p-4">
            <p className="text-xs text-slate-500">Avg Rating</p>
            <p className="text-2xl font-bold text-[#1F3C5B] mt-1">{stats.averageRating}</p>
          </CardContent></Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search by name, category, or city..." 
                className="pl-10 bg-slate-50 border-slate-200 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] rounded-xl bg-slate-50 border-slate-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
              <SelectTrigger className="w-[180px] rounded-xl bg-slate-50 border-slate-200">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2" onClick={exportCsv}>
              <Download size={18} />
              <span>Export CSV</span>
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl gap-2 px-6">
                  <Plus size={18} />
                  <span>Add New Place</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#1F3C5B]">Add Accessibility Place</DialogTitle>
                  <DialogDescription>Create a real location record and optionally attach accessibility data.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Place Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter name" 
                        className="rounded-xl"
                        value={newPlace.name}
                        onChange={(e) => setNewPlace((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newPlace.category_id} onValueChange={(val: string) => setNewPlace((prev) => ({ ...prev, category_id: val }))}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category: any) => (
                            <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="government">Government *</Label>
                      <Select value={newPlace.government_id} onValueChange={(val: string) => setNewPlace((prev) => ({ ...prev, government_id: val }))}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select government" />
                        </SelectTrigger>
                        <SelectContent>
                          {governments.map((government: any) => (
                            <SelectItem key={government.id} value={String(government.id)}>{government.accessible_locations}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address</Label>
                      <Input 
                        id="address" 
                        placeholder="Street, District" 
                        className="rounded-xl"
                        value={newPlace.address}
                        onChange={(e) => setNewPlace((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" className="rounded-xl" value={newPlace.latitude} onChange={(e) => setNewPlace((prev) => ({ ...prev, latitude: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" className="rounded-xl" value={newPlace.longitude} onChange={(e) => setNewPlace((prev) => ({ ...prev, longitude: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["verified", "Verified"],
                      ["wide_entrance", "Wide Entrance"],
                      ["wheelchair_accessible", "Wheelchair Accessible"],
                      ["elevator_available", "Elevator Available"],
                      ["ramp_available", "Ramp Available"],
                      ["parking", "Parking"],
                      ["accessible_toilet", "Accessible Toilet"],
                    ].map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                        <span className="text-sm text-slate-700">{label}</span>
                        <Switch checked={Boolean((newPlace.report as any)[key])} onCheckedChange={(checked: boolean) => setNewPlace((prev) => ({ ...prev, report: { ...prev.report, [key]: checked } }))} />
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="rounded-xl">Cancel</Button>
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={handleAddPlace}
                  >
                    Save Place
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-[#1F3C5B] animate-spin" />
                <p className="text-slate-500 font-medium">Connecting to Athar DB...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Place Details</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Category & Government</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Accessibility</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Rating</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Status</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm text-right" style={{width: '80px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pagedPlaces.length > 0 ? (
                    pagedPlaces.map((place: any) => (
                      <tr key={place.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#EAF2FB] rounded-xl flex items-center justify-center text-[#1F3C5B]">
                              <MapPin size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-[#1F3C5B]">{place.name}</p>
                              <p className="text-xs text-slate-400">ID: #ATH-{place.id?.toString().slice(0, 5)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium">
                              {place.category}
                            </Badge>
                            <p className="text-sm text-slate-500 ml-1">{place.government_name || place.city}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {(place.tags || []).length > 0 ? (place.tags || []).map((tag: string) => (
                              <span key={tag} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-100">
                                {tag}
                              </span>
                            )) : <span className="text-xs text-slate-400">No accessibility tags</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-semibold text-slate-700">{Number(place.average_rating || 0).toFixed(1)}</span>
                            <span className="text-xs text-slate-400">({place.reviews_count || 0})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={
                            place.status === "Verified" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            place.status === "Reported" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                            "bg-slate-100 text-slate-700 hover:bg-slate-100"
                          }>
                            {place.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-200">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem className="gap-2" onClick={() => openPlaceDetails(place)}>
                                <Eye size={16} /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => openEditPlace(place)}>
                                <Edit2 size={16} /> Edit Info
                              </DropdownMenuItem>
                              {!place.verified ? (
                                <DropdownMenuItem className="gap-2 text-green-600" onClick={() => handleQuickVerify(place, true)}>
                                  <ShieldCheck size={16} /> Mark Verified
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="gap-2 text-amber-700" onClick={() => handleQuickVerify(place, false)}>
                                  <ShieldCheck size={16} /> Remove Verification
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="gap-2 text-slate-400"
                                onClick={() => handleDelete(place.id)}
                              >
                                <Archive size={16} /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                        No places found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {!loading && filteredPlaces.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">{Math.min(startIndex + 1, filteredPlaces.length)}</span> -{' '}
              <span className="font-medium text-slate-700">{Math.min(endIndex, filteredPlaces.length)}</span> of{' '}
              <span className="font-medium text-slate-700">{filteredPlaces.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 gap-2"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-slate-500 min-w-[110px] text-center">
                Page <span className="font-medium text-slate-700">{currentPage}</span> /{' '}
                <span className="font-medium text-slate-700">{totalPages}</span>
              </div>

              <Button
                variant="outline"
                className="rounded-xl border-slate-200 text-slate-600 gap-2"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[700px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1F3C5B]">{selectedPlace?.name}</DialogTitle>
              <DialogDescription>{selectedPlace?.address}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Government</p>
                  <p className="font-semibold text-[#1F3C5B]">{selectedPlace?.government_name || selectedPlace?.city}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-semibold text-[#1F3C5B]">{selectedPlace?.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Coordinates</p>
                  <p className="font-semibold text-[#1F3C5B]">{selectedPlace?.latitude || "-"}, {selectedPlace?.longitude || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">User Rating</p>
                  <p className="font-semibold text-[#1F3C5B]">{Number(selectedPlace?.average_rating || 0).toFixed(1)} ({selectedPlace?.reviews_count || 0} reviews)</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#1F3C5B]">Accessibility Features</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["verified", "Verified"],
                    ["wide_entrance", "Wide Entrance"],
                    ["wheelchair_accessible", "Wheelchair Accessible"],
                    ["elevator_available", "Elevator"],
                    ["ramp_available", "Ramp"],
                    ["parking", "Parking"],
                    ["accessible_toilet", "Accessible Toilet"],
                  ].map(([key, label]) => (
                    <div key={key} className="rounded-xl border border-slate-100 p-3 text-sm flex items-center justify-between">
                      <span className="text-slate-700">{label}</span>
                      <Badge variant="outline" className={selectedPlace?.accessibility_report?.[key] ? "border-emerald-200 text-emerald-700 bg-emerald-50" : "border-slate-200 text-slate-500"}>
                        {selectedPlace?.accessibility_report?.[key] ? "Yes" : "No"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[700px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1F3C5B]">Edit Place</DialogTitle>
              <DialogDescription>Update location information and accessibility metadata.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input className="rounded-xl" value={editPlace.name} onChange={(e) => setEditPlace((prev: any) => ({ ...prev, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input className="rounded-xl" value={editPlace.address} onChange={(e) => setEditPlace((prev: any) => ({ ...prev, address: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Government</Label>
                  <Select value={editPlace.government_id} onValueChange={(value: string) => setEditPlace((prev: any) => ({ ...prev, government_id: value }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select government" /></SelectTrigger>
                    <SelectContent>{governments.map((government: any) => <SelectItem key={government.id} value={String(government.id)}>{government.accessible_locations}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editPlace.category_id} onValueChange={(value: string) => setEditPlace((prev: any) => ({ ...prev, category_id: value }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{categories.map((category: any) => <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["verified", "Verified"],
                  ["wide_entrance", "Wide Entrance"],
                  ["wheelchair_accessible", "Wheelchair Accessible"],
                  ["elevator_available", "Elevator Available"],
                  ["ramp_available", "Ramp Available"],
                  ["parking", "Parking"],
                  ["accessible_toilet", "Accessible Toilet"],
                ].map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                    <span className="text-sm text-slate-700">{label}</span>
                    <Switch checked={Boolean((editPlace.report as Record<string, any>)?.[key])} onCheckedChange={(checked: boolean) => setEditPlace((prev: any) => ({ ...prev, report: { ...prev.report, [key]: checked } }))} />
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl" onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
