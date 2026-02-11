import React, { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  User as UserIcon, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Check,
  Loader2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Profile Information");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: "Athar",
    lastName: "Admin",
    email: "admin@athar.app"
  });

  const [preferences, setPreferences] = useState([
    { id: 'notif_reports', label: "Email notifications for new reports", description: "Get alerted when a user flags incorrect accessibility info", checked: true },
    { id: 'notif_help', label: "Push notifications for help requests", description: "Real-time alerts for urgent mobility assistance", checked: true },
    { id: 'notif_summary', label: "Weekly analytics summary", description: "Receive a performance report every Monday morning", checked: false },
    { id: 'maintenance', label: "Maintenance mode", description: "Temporarily disable public submissions", checked: false },
  ]);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a17bcab7`;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const [profileRes, prefRes] = await Promise.all([
        fetch(`${API_BASE}/settings/profile`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`${API_BASE}/settings/preferences`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);

      if (profileRes.ok) {
        const data = await profileRes.json();
        if (data.email) setProfile(data);
      }

      if (prefRes.ok) {
        const data = await prefRes.json();
        if (Array.isArray(data) && data.length > 0) setPreferences(data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: string) => {
    try {
      setSaving(true);
      const key = section === "Profile" ? "profile" : "preferences";
      const value = section === "Profile" ? profile : preferences;

      const res = await fetch(`${API_BASE}/settings/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(value)
      });

      if (res.ok) {
        toast.success(`${section} updated successfully`);
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      toast.error(`Error saving ${section}`);
      console.error(err);
    } finally {
      setSaving(false);
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
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {[
                  { icon: UserIcon, label: "Profile Information" },
                  { icon: Lock, label: "Security & Password" },
                  { icon: Bell, label: "Notification Prefs" },
                  { icon: Globe, label: "Site Configurations" },
                  { icon: Shield, label: "Privacy & Permissions" },
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

          <Card className="border-none shadow-sm bg-[#1F3C5B] text-white p-6">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-sm text-white/70 mb-4">Check our documentation or contact technical support.</p>
            <Button className="w-full bg-[#C9A24D] hover:bg-[#C9A24D]/90 text-white border-none rounded-xl">
              Support Center
            </Button>
          </Card>
        </div>

        {/* Right Content - Form */}
        <div className="lg:col-span-2 space-y-8">
          {activeSection === "Profile Information" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Admin Profile</CardTitle>
                <CardDescription>Update your account details and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 border-4 border-[#EAF2FB]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="rounded-xl border-slate-200 mr-2">Change Photo</Button>
                    <Button variant="ghost" className="rounded-xl text-red-500">Remove</Button>
                    <p className="text-xs text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={profile.firstName} 
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={profile.lastName} 
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="rounded-xl" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="rounded-xl" 
                  />
                </div>

                <div className="pt-4 border-t border-slate-50 flex justify-end">
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={() => handleSave("Profile")}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "Notification Prefs" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">System Preferences</CardTitle>
                <CardDescription>Manage how you receive alerts and summaries.</CardDescription>
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
                      onCheckedChange={(checked) => {
                        const newPrefs = preferences.map(p => p.id === item.id ? { ...p, checked } : p);
                        setPreferences(newPrefs);
                      }}
                      className="data-[state=checked]:bg-[#1F3C5B]" 
                    />
                  </div>
                ))}
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={() => handleSave("Preferences")}
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "Security & Password" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Security Settings</CardTitle>
                <CardDescription>Update your password and secure your account.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#1F3C5B] font-semibold">Current Password</Label>
                    <Input type="password" placeholder="••••••••" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#1F3C5B] font-semibold">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#1F3C5B] font-semibold">Confirm New Password</Label>
                      <Input type="password" placeholder="••••••••" className="rounded-xl border-slate-200" />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <p className="text-xs text-slate-400">Last changed: 3 months ago</p>
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={() => toast.success("Password updated successfully")}
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "Site Configurations" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Global Configuration</CardTitle>
                <CardDescription>Configure the public-facing application settings.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#1F3C5B] font-semibold">Application Name</Label>
                    <Input defaultValue="Athar Accessibility" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1F3C5B] font-semibold">Support Email Address</Label>
                    <Input defaultValue="support@athar-app.org" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#1F3C5B] font-semibold">System Language</Label>
                    <select className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3C5B]/20">
                      <option value="en">English (Universal)</option>
                      <option value="ar">Arabic (العربية)</option>
                      <option value="fr">French (Français)</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-end">
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={() => toast.success("Site configuration saved")}
                  >
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "Privacy & Permissions" && (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold text-[#1F3C5B]">Privacy Controls</CardTitle>
                <CardDescription>Manage your data visibility and usage permissions.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { id: 'p1', label: "Public Profile Visibility", desc: "Allow other volunteers to see your achievements.", checked: true },
                  { id: 'p2', label: "Data Analytics Usage", desc: "Share anonymous usage data to help improve Athar.", checked: true },
                  { id: 'p3', label: "Partner Sharing", desc: "Allow sharing of non-identifiable data with accessibility NGOs.", checked: false },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#1F3C5B]">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-[#1F3C5B]" />
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-50 flex justify-end">
                  <Button 
                    className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl px-8"
                    onClick={() => toast.success("Privacy permissions updated")}
                  >
                    Apply Changes
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
