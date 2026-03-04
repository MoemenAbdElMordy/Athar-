import React, { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../utils/server-api";
import { toast } from "sonner";

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
        if (!q) return true;
        return (
          String(item?.name || "").toLowerCase().includes(q) ||
          String(item?.full_name || "").toLowerCase().includes(q) ||
          String(item?.email || "").toLowerCase().includes(q) ||
          String(item?.phone || "").toLowerCase().includes(q)
        );
      })
      .sort((a: any, b: any) => Number(b.id || 0) - Number(a.id || 0));
  }, [pendingRequests, volunteers, users, search]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(allAccounts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedAccounts = allAccounts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, pendingRequests.length, volunteers.length, users.length]);

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

  return (
    <AdminLayout title="Accounts & Volunteer Requests">
      <div className="space-y-6">
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
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
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
                    <p className="text-xs text-slate-500">{req.email || "No email"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => approveRequest(req.id)}>Confirm</Button>
                    <Button size="sm" variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50" onClick={() => activatePendingAccount(req.id)}>Activate</Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => rejectRequest(req.id)}>Refuse</Button>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-500">No pending requests.</p>}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1F3C5B]">Accounts CRUD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Search by name/email/phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">Loading accounts...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-sm text-slate-500">Name</th>
                      <th className="pb-3 text-sm text-slate-500">Email</th>
                      <th className="pb-3 text-sm text-slate-500">Role</th>
                      <th className="pb-3 text-sm text-slate-500">Status</th>
                      <th className="pb-3 text-sm text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pagedAccounts.map((account: any) => {
                      const isEditing = editingId === account.id;
                      const isPendingVolunteer = account.role === "volunteer" && !account.role_verified_at;

                      return (
                        <tr key={account.id}>
                          <td className="py-3 pr-3">
                            {isEditing ? (
                              <div className="space-y-2">
                                <Input value={editForm.name || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, name: e.target.value }))} />
                                <Input placeholder="Full name" value={editForm.full_name || ""} onChange={(e) => setEditForm((prev: any) => ({ ...prev, full_name: e.target.value }))} />
                              </div>
                            ) : (
                              <span className="font-medium text-[#1F3C5B]">{account.full_name || account.name || `Account #${account.id}`}</span>
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
                                <SelectTrigger>
                                  <SelectValue placeholder="Role" />
                                </SelectTrigger>
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
                              <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Pending Approval</Badge>
                            ) : (
                              <Badge variant="outline" className={account.is_active ? "text-green-700 border-green-200 bg-green-50" : "text-red-700 border-red-200 bg-red-50"}>
                                {account.is_active ? "Active" : "Inactive"}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-2">
                              {isPendingVolunteer && (
                                <>
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => approveRequest(account.id)}>Confirm</Button>
                                  <Button size="sm" variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50" onClick={() => activatePendingAccount(account.id)}>Activate</Button>
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => rejectRequest(account.id)}>Refuse</Button>
                                </>
                              )}
                              {isEditing ? (
                                <>
                                  <Button size="sm" onClick={saveEdit}>Save</Button>
                                  <Button size="sm" variant="outline" onClick={() => { setEditingId(null); setEditForm({}); }}>Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => startEdit(account)}>Edit</Button>
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => deleteAccount(account.id)}>Delete</Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {allAccounts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-sm text-slate-500">No accounts found.</td>
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
