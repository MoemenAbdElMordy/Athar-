import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  Archive,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Loader2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
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
  DialogFooter
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

export default function Places() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    category: "",
    city: "",
    address: "",
    description: "",
    tags: [] as string[]
  });

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await api.places.getAll();
      setPlaces(data);
    } catch (error) {
      console.error("Failed to fetch places:", error);
      toast.error("Failed to load places from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    try {
      const updated = await api.places.update(id, { status: newStatus });
      setPlaces(places.map((p: any) => p.id === id ? updated : p));
      toast.success(`Place ${newStatus.toLowerCase()} successfully`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAddPlace = async () => {
    if (!newPlace.name || !newPlace.category || !newPlace.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const placeToAdd = {
        ...newPlace,
        status: "Pending",
        tags: ["Ramp"] // default for now
      };

      const created = await api.places.create(placeToAdd);
      setPlaces([created, ...places]);
      setIsAddModalOpen(false);
      setNewPlace({ name: "", category: "", city: "", address: "", description: "", tags: [] });
      toast.success("Place added to moderation queue");
    } catch (error) {
      toast.error("Failed to add place");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await api.places.delete(id);
      setPlaces(places.filter((p: any) => p.id !== id));
      toast.success("Place deleted");
    } catch (error) {
      toast.error("Failed to delete place");
    }
  };

  const filteredPlaces = places.filter((p: any) => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Manage Places">
      <div className="space-y-6">
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
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2">
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
                        onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(val: string) => setNewPlace({...newPlace, category: val})}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Tourism">Tourism</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city" 
                        placeholder="e.g. Cairo" 
                        className="rounded-xl"
                        value={newPlace.city}
                        onChange={(e) => setNewPlace({...newPlace, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address</Label>
                      <Input 
                        id="address" 
                        placeholder="Street, District" 
                        className="rounded-xl"
                        value={newPlace.address}
                        onChange={(e) => setNewPlace({...newPlace, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description & Accessibility Details</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe accessibility features..." 
                      className="rounded-xl min-h-[100px]"
                      value={newPlace.description}
                      onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                    />
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
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Category & City</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Accessibility</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm">Status</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 text-sm text-right" style={{width: '80px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place: any) => (
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
                            <p className="text-sm text-slate-500 ml-1">{place.city}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {(place.tags || []).map((tag: string) => (
                              <span key={tag} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={
                            place.status === "Approved" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            place.status === "Pending" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                            "bg-red-100 text-red-700 hover:bg-red-100"
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
                              <DropdownMenuItem className="gap-2">
                                <Eye size={16} /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Edit2 size={16} /> Edit Info
                              </DropdownMenuItem>
                              {place.status !== "Approved" && (
                                <DropdownMenuItem 
                                  className="gap-2 text-green-600"
                                  onClick={() => handleStatusChange(place.id, "Approved")}
                                >
                                  <CheckCircle size={16} /> Approve
                                </DropdownMenuItem>
                              )}
                              {place.status !== "Rejected" && (
                                <DropdownMenuItem 
                                  className="gap-2 text-red-600"
                                  onClick={() => handleStatusChange(place.id, "Rejected")}
                                >
                                  <XCircle size={16} /> Reject
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
                      <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                        No places found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
