import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Globe,
  ExternalLink,
  User as UserIcon,
  X,
  Share2,
  ArrowLeft
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
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
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { api } from "../../utils/server-api";

function mapTutorial(item: any) {
  return {
    id: item.id,
    title: item.title,
    author: "Admin",
    status: item.is_published ? "Published" : "Draft",
    date: item.created_at ? String(item.created_at).slice(0, 10) : new Date().toISOString().slice(0, 10),
    views: "0",
    description: item.description || "",
    raw: item,
  };
}

export default function TutorialsAdmin() {
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "Admin",
    status: "Draft",
    description: ""
  });

  const fetchTutorials = async () => {
    try {
      const data = await api.tutorials.getAll();
      setTutorials((data || []).map(mapTutorial));
    } catch {
      toast.error("Failed to load tutorials");
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData({ title: "", author: "Admin", status: "Draft", description: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (tutorial: any) => {
    setIsEditing(true);
    setCurrentEditId(tutorial.id);
    setFormData({ 
      title: tutorial.title, 
      author: tutorial.author, 
      status: tutorial.status,
      description: tutorial.description || ""
    });
    setIsDialogOpen(true);
  };

  const handleSaveTutorial = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      if (isEditing && currentEditId !== null) {
        const updated = await api.tutorials.update(currentEditId, {
          title: formData.title,
          description: formData.description,
          is_published: formData.status === "Published",
        });
        const mapped = mapTutorial(updated);
        setTutorials(tutorials.map((t) => (t.id === currentEditId ? mapped : t)));
        toast.success("Tutorial updated successfully");
      } else {
        const created = await api.tutorials.create({
          title: formData.title,
          description: formData.description,
          video_url: null,
          thumbnail_url: null,
          category: null,
          is_published: formData.status === "Published",
        });
        setTutorials([mapTutorial(created), ...tutorials]);
        toast.success("Tutorial created successfully");
      }

      setIsDialogOpen(false);
    } catch {
      toast.error("Failed to save tutorial");
    }
  };

  const deleteTutorial = async (id: number) => {
    try {
      await api.tutorials.delete(id);
      setTutorials(tutorials.filter(t => t.id !== id));
      toast.success("Tutorial deleted");
    } catch {
      toast.error("Failed to delete tutorial");
    }
  };

  const handleViewPreview = (tutorial: any) => {
    setSelectedTutorial(tutorial);
    setShowFullContent(false);
    setIsPreviewOpen(true);
  };

  return (
    <AdminLayout title="Tutorials & Content">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search articles..." className="pl-10 rounded-xl bg-white border-slate-200" />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate} className="bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 rounded-xl gap-2 px-6">
                <Plus size={18} />
                <span>New Tutorial</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none p-0 overflow-hidden shadow-2xl">
              <div className="bg-[#1F3C5B] p-6 text-white relative">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {isEditing ? "Edit Tutorial" : "Create New Tutorial"}
                  </DialogTitle>
                  <DialogDescription className="text-white/70 text-sm mt-1">
                    {isEditing 
                      ? "Modify the details of this tutorial article." 
                      : "Fill in the details to publish a new guide for Athar users."}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-6 space-y-6 bg-white">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#1F3C5B] font-bold">Tutorial Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Navigating Cairo Metro with Wheelchairs" 
                    className="rounded-xl border-slate-200 h-12"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-[#1F3C5B] font-bold">Author</Label>
                    <Input 
                      id="author" 
                      value={formData.author}
                      className="rounded-xl border-slate-200"
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-[#1F3C5B] font-bold">Status</Label>
                    <select 
                      id="status"
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3C5B]/20"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[#1F3C5B] font-bold">Brief Description</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Provide a short summary of what this tutorial covers..."
                    className="rounded-xl border-slate-200 min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter className="p-6 pt-0 bg-white flex items-center justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl text-slate-500">
                  Cancel
                </Button>
                <Button onClick={handleSaveTutorial} className="bg-[#C9A24D] hover:bg-[#C9A24D]/90 text-white rounded-xl px-8 font-bold">
                  {isEditing ? "Update Changes" : "Create Tutorial"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl border-none p-0 shadow-2xl bg-[#EAF2FB]">
            <DialogHeader className="sr-only">
              <DialogTitle>Tutorial Preview</DialogTitle>
              <DialogDescription>
                Viewing a live preview of how the tutorial will appear to public users.
              </DialogDescription>
            </DialogHeader>
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#C9A24D] text-white hover:bg-[#C9A24D] px-4 py-1 rounded-full">
                  Tutorial Preview
                </Badge>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1F3C5B] leading-tight">
                  {selectedTutorial?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1F3C5B] flex items-center justify-center text-white text-xs font-bold">
                      {selectedTutorial?.author?.charAt(0)}
                    </div>
                    <span className="font-medium text-sm md:text-base">{selectedTutorial?.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base">
                    <Clock size={16} />
                    <span>{selectedTutorial?.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base">
                    <Eye size={16} />
                    <span>{selectedTutorial?.views} views</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm leading-relaxed text-[#1F3C5B]/80 text-lg border border-slate-100">
                {!showFullContent ? (
                  <>
                    <p className="mb-6">{selectedTutorial?.description || "No description provided for this tutorial."}</p>
                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          className="rounded-xl border-slate-200 gap-2"
                          onClick={() => {
                            const link = `${window.location.origin}/tutorials/${selectedTutorial?.id || ''}`;
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                              navigator.clipboard.writeText(link)
                                .then(() => toast.success("Tutorial link copied to clipboard!"))
                                .catch(() => {
                                  console.log("Clipboard blocked, showing link in toast instead");
                                  toast.info(`Tutorial Link: ${link}`, { duration: 5000 });
                                });
                            } else {
                              toast.info(`Tutorial Link: ${link}`, { duration: 5000 });
                            }
                          }}
                        >
                          <Share2 size={16} />
                          Share
                        </Button>
                      </div>
                      <Button 
                        className="bg-[#1F3C5B] text-white rounded-xl px-6"
                        onClick={() => setShowFullContent(true)}
                      >
                        Read Full Article
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowFullContent(false)}
                      className="text-[#C9A24D] hover:text-[#C9A24D]/80 p-0 mb-4 h-auto flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Back to Summary
                    </Button>
                    <div className="prose prose-slate max-w-none">
                      <p className="font-bold text-xl text-[#1F3C5B]">Introduction</p>
                      <p>Welcome to this detailed guide on {selectedTutorial?.title}. This article provides a comprehensive look at the accessibility features and community initiatives we've built at Athar.</p>
                      
                      <div className="aspect-video w-full bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-400">
                        <FileText size={48} />
                      </div>
                      
                      <p className="font-bold text-xl text-[#1F3C5B]">Understanding the Impact</p>
                      <p>{selectedTutorial?.description}</p>
                      <p>Living with accessibility challenges in modern urban environments requires both resilience and the right tools. Athar aims to be that tool, providing real-time data and a supportive community for everyone.</p>
                      
                      <p className="font-bold text-xl text-[#1F3C5B]">Key Takeaways</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Always verify accessibility status before traveling to a new location.</li>
                        <li>Contribute your own reviews to help the community grow.</li>
                        <li>Use the filter settings to find facilities that match your specific needs.</li>
                      </ul>
                      
                      <p className="mt-8 italic text-slate-500 text-sm">Last updated: {selectedTutorial?.date} by {selectedTutorial?.author}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-slate-400 hover:text-[#1F3C5B] gap-2"
                >
                  <X size={18} />
                  Close Preview
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 gap-4">
          {tutorials.map((item) => (
            <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white border border-slate-100">
              <CardContent className="p-0">
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#C9A24D]">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1F3C5B] text-lg">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <UserIcon size={12} /> {item.author}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {item.date}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Eye size={12} /> {item.views} views
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                    <Badge className={
                      item.status === "Published" 
                        ? "bg-green-100 text-green-700 hover:bg-green-100" 
                        : "bg-slate-100 text-slate-500 hover:bg-slate-100"
                    }>
                      {item.status === "Published" ? <Globe size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                      {item.status}
                    </Badge>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-lg text-slate-400 hover:text-[#1F3C5B] hover:bg-slate-100"
                        onClick={() => handleOpenEdit(item)}
                      >
                        <Edit2 size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-lg text-slate-400 hover:text-[#1F3C5B] hover:bg-slate-100"
                        onClick={() => handleViewPreview(item)}
                      >
                        <ExternalLink size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => deleteTutorial(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
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
