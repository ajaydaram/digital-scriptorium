
"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Link2, 
  Languages, 
  Columns, 
  StickyNote, 
  Map, 
  History, 
  Pickaxe, 
  Library,
  ChevronRight,
  Sparkles,
  Search,
  BookText,
  FileText,
  Compass,
  Plus,
  Users,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase, useAuth } from "@/firebase";
import { createCircle, inviteMemberToCircle, getUserCirclesQuery, type StudyCircle } from "@/services/circleService";
import { saveAnnotation, toggleAnnotationReaction } from "@/services/annotationService";
import { collection, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const QUICK_TOOLS = [
  { name: "Cross References", description: "Find related verses", count: "63,779", icon: Link2, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Word Study", description: "Original language lookup", count: "14,298", icon: Languages, color: "text-accent", bg: "bg-purple-50" },
  { name: "Parallel Passages", description: "Compare across Gospels", count: "1,247", icon: Columns, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Commentary Notes", description: "Scholar insights", count: "31,102", icon: StickyNote, color: "text-amber-500", bg: "bg-amber-50" },
];

const RESOURCE_CATEGORIES = [
  {
    title: "Biblical Commentary",
    description: "Verse-by-verse explanations from trusted scholars",
    icon: BookText,
    items: [
      { name: "Matthew Henry Commentary", detail: "31,102 • Classic" },
      { name: "ESV Study Bible Notes", detail: "25,000+ • Modern" },
      { name: "Reformer Notes", detail: "15,847 • Reformed" }
    ],
    action: "Explore Biblical Commentary"
  },
  {
    title: "Biblical Maps & Geography",
    description: "Visualize the biblical world and understand context",
    icon: Map,
    items: [
      { name: "Biblical World Atlas", detail: "127 maps • All Eras" },
      { name: "Paul's Missionary Journeys", detail: "12 detailed maps • NT" },
      { name: "Old Testament Locations", detail: "89 maps • OT" }
    ],
    action: "Explore Biblical Maps & Geography"
  },
  {
    title: "Historical Timeline",
    description: "Place events in chronological context",
    icon: History,
    items: [
      { name: "Biblical Timeline", detail: "2,400+ events • 4000 BC - 100 AD" },
      { name: "Kings & Prophets", detail: "340 events • 1050-400 BC" },
      { name: "NT Church History", detail: "150 events • 30-100 AD" }
    ],
    action: "Explore Historical Timeline"
  },
  {
    title: "Original Languages",
    description: "Hebrew and Greek word studies with definitions",
    icon: Languages,
    items: [
      { name: "Hebrew Lexicon", detail: "8,674 words • Hebrew" },
      { name: "Greek Lexicon", detail: "5,624 words • Greek" },
      { name: "Aramaic Terms", detail: "267 words • Aramaic" }
    ],
    action: "Explore Original Languages"
  },
  {
    title: "Archaeological Insights",
    description: "Discoveries that illuminate biblical texts",
    icon: Pickaxe,
    items: [
      { name: "Dead Sea Scrolls", detail: "972 texts • 1947-1956" },
      { name: "Biblical Archaeology", detail: "500+ sites • Ongoing" },
      { name: "Ancient Manuscripts", detail: "5,800+ NT manuscripts • Various" }
    ],
    action: "Explore Archaeological Insights"
  },
  {
    title: "Theological Themes",
    description: "Explore major biblical doctrines and themes",
    icon: Library,
    items: [
      { name: "Biblical Theology", detail: "200+ topics • Systematic" },
      { name: "Covenant Theology", detail: "12 covenants • Reformed" },
      { name: "Kingdom Theology", detail: "50+ aspects • Christocentric" }
    ],
    action: "Explore Theological Themes"
  }
];

export default function StudyHubPage() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  const [showCreateCircle, setShowCreateCircle] = useState(false);
  const [newCircleName, setNewCircleName] = useState("");
  const [newCircleDesc, setNewCircleDesc] = useState("");
  const [newCirclePath, setNewCirclePath] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [circlePostComment, setCirclePostComment] = useState("");
  const [circlePostRef, setCirclePostRef] = useState("John 3:16");

  const circlesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getUserCirclesQuery(firestore, user.uid);
  }, [firestore, user]);

  const { data: circles, isLoading: isCirclesLoading } = useCollection(circlesQuery);

  const selectedCircle = useMemo(() => {
    if (!circles || !selectedCircleId) return null;
    return (circles as any[]).find(c => c.id === selectedCircleId) || null;
  }, [circles, selectedCircleId]);

  useEffect(() => {
    if (circles && circles.length > 0 && !selectedCircleId) {
      setSelectedCircleId(circles[0].id);
    }
  }, [circles, selectedCircleId]);

  const circleFeedQuery = useMemoFirebase(() => {
    if (!firestore || !selectedCircleId) return null;
    return query(
      collection(firestore, 'annotations'),
      where('circleId', '==', selectedCircleId)
    );
  }, [firestore, selectedCircleId]);

  const { data: circleFeed, isLoading: isCircleFeedLoading } = useCollection(circleFeedQuery);

  const sortedCircleFeed = useMemo(() => {
    if (!circleFeed) return [];
    return [...(circleFeed as any[])].sort((a: any, b: any) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  }, [circleFeed]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Error",
        description: error.message,
      });
    }
  };

  const handleCreateCircle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user || !newCircleName.trim()) return;
    setIsCreating(true);
    try {
      const id = await createCircle(
        firestore,
        newCircleName.trim(),
        newCircleDesc.trim(),
        user,
        newCirclePath || undefined
      );
      toast({
        title: "Study Circle Created",
        description: `Successfully created group "${newCircleName}".`,
      });
      setNewCircleName("");
      setNewCircleDesc("");
      setNewCirclePath("");
      setShowCreateCircle(false);
      setSelectedCircleId(id);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Creation Error",
        description: err.message || "Failed to create study circle.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !selectedCircleId || !inviteEmail.trim()) return;
    setIsInviting(true);
    try {
      const result = await inviteMemberToCircle(firestore, selectedCircleId, inviteEmail.trim());
      if (result.success) {
        toast({
          title: "Member Invited",
          description: result.message,
        });
        setInviteEmail("");
      } else {
        toast({
          variant: "destructive",
          title: "Invite Failed",
          description: result.message,
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Invite Error",
        description: err.message || "Failed to send invitation.",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const handlePostCircleInsight = () => {
    if (!firestore || !user || !selectedCircleId || !circlePostComment.trim() || !circlePostRef.trim()) return;
    try {
      saveAnnotation(
        firestore,
        user,
        circlePostRef.trim(),
        "",
        circlePostComment.trim(),
        selectedCircleId
      );
      setCirclePostComment("");
      toast({
        title: "Insight Posted",
        description: "Shared notes with the circle feed.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Post Error",
        description: err.message || "Failed to post insight.",
      });
    }
  };

  const handleToggleReaction = async (annId: string, type: 'insightful' | 'needsContext') => {
    if (!firestore || !user) {
      handleSignIn();
      return;
    }
    try {
      await toggleAnnotationReaction(firestore, annId, user.uid, type);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-white border-b border-slate-200 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary font-bold uppercase tracking-widest border-primary/20">STUDY HUB</Badge>
                <h1 className="text-4xl font-headline font-bold text-slate-900">Study Hub</h1>
                <p className="text-lg text-slate-500 font-body">
                  Comprehensive biblical study resources for deeper understanding
                </p>
              </div>
              <div className="bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 text-center md:text-left">
                <div className="text-2xl font-bold text-primary">15,000+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Resources</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="library" className="space-y-12">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger 
                  value="library" 
                  className="bg-transparent border-none p-0 text-slate-400 data-[state=active]:text-primary data-[state=active]:shadow-none relative after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Resource Library
                </TabsTrigger>
                <TabsTrigger 
                  value="interactive" 
                  className="bg-transparent border-none p-0 text-slate-400 data-[state=active]:text-primary data-[state=active]:shadow-none relative after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Interactive Session
                </TabsTrigger>
              </TabsList>
              
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <TabsContent value="library" className="space-y-12 m-0 outline-none">
              {/* Quick Tools Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" /> Quick Study Tools
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {QUICK_TOOLS.map((tool) => (
                    <Card key={tool.name} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-slate-900">{tool.name}</h3>
                          <p className="text-xs text-slate-500">{tool.description}</p>
                          <div className="text-[10px] font-bold text-slate-400 pt-1">{tool.count} items</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Main Resources Grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                  <Library className="h-5 w-5 text-accent" /> Study Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {RESOURCE_CATEGORIES.map((cat) => (
                    <Card key={cat.title} className="flex flex-col border-none shadow-lg rounded-2xl overflow-hidden group">
                      <div className="bg-white p-6 pb-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                            <cat.icon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">FEATURED</Badge>
                        </div>
                        <h3 className="text-lg font-headline font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                      
                      <CardContent className="px-6 flex-1">
                        <div className="space-y-4">
                          {cat.items.map((item) => (
                            <div key={item.name} className="flex items-center justify-between group/item cursor-pointer">
                              <div className="space-y-0.5">
                                <div className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors">{item.name}</div>
                                <div className="text-[10px] font-medium text-slate-400">{item.detail}</div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-slate-200 group-hover/item:text-primary transition-colors" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      
                      <div className="p-6 pt-2">
                        <Separator className="mb-4" />
                        <Button variant="link" className="p-0 text-primary font-bold text-xs gap-1 h-auto hover:no-underline">
                          {cat.action} <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="m-0 outline-none">
              {!user ? (
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden text-center p-12 max-w-md mx-auto space-y-6">
                  <div className="h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold">Sign In Required</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-body">
                      Please sign in with your Google account to create, join, or view your private Study Circles.
                    </p>
                  </div>
                  <Button onClick={handleSignIn} className="btn-gradient px-8 py-6 h-auto font-bold rounded-xl shadow-lg w-full">
                    Sign In with Google
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: My Circles & Creation Form */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Create Circle button/form */}
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <Plus className="h-4.5 w-4.5 text-primary" /> Create Group
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCreateCircle(!showCreateCircle)}
                            className="text-xs text-primary font-bold hover:bg-primary/5 rounded-lg px-3"
                          >
                            {showCreateCircle ? "Cancel" : "New"}
                          </Button>
                        </div>
                      </CardHeader>

                      {showCreateCircle && (
                        <CardContent className="p-6 pt-0">
                          <form onSubmit={handleCreateCircle} className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Circle Name</label>
                              <Input
                                placeholder="e.g. Reformation Class"
                                value={newCircleName}
                                onChange={(e) => setNewCircleName(e.target.value)}
                                required
                                className="h-10 text-sm rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description</label>
                              <Textarea
                                placeholder="What is this study group about?"
                                value={newCircleDesc}
                                onChange={(e) => setNewCircleDesc(e.target.value)}
                                className="min-h-[80px] text-sm rounded-xl"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reading Path (Optional)</label>
                              <Select value={newCirclePath} onValueChange={(val) => setNewCirclePath(val)}>
                                <SelectTrigger className="h-10 text-sm rounded-xl bg-white">
                                  <SelectValue placeholder="No path linked" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="chronological" className="text-xs">Chronological Path</SelectItem>
                                  <SelectItem value="thematic" className="text-xs">Thematic Path</SelectItem>
                                  <SelectItem value="genre" className="text-xs">Genre Path</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button type="submit" disabled={isCreating} className="w-full btn-gradient rounded-xl font-bold h-10 gap-2">
                              {isCreating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>Create Circle <ChevronRight className="h-4 w-4" /></>
                              )}
                            </Button>
                          </form>
                        </CardContent>
                      )}
                    </Card>

                    {/* Circles List */}
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                      <CardHeader className="p-6 border-b border-slate-50">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-slate-700">
                          <Users className="h-4.5 w-4.5" /> My Circles
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {isCirclesLoading ? (
                          <div className="py-20 flex flex-col items-center opacity-30 gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Loading circles...</span>
                          </div>
                        ) : circles && circles.length > 0 ? (
                          <div className="divide-y divide-slate-50 max-h-[450px] overflow-y-auto">
                            {circles.map((circle: any) => (
                              <button
                                key={circle.id}
                                onClick={() => setSelectedCircleId(circle.id)}
                                className={cn(
                                  "w-full text-left p-6 hover:bg-slate-50/50 transition-colors flex flex-col gap-1.5",
                                  selectedCircleId === circle.id && "bg-primary/5 hover:bg-primary/5"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-sm text-slate-900">{circle.name}</span>
                                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-[9px] font-bold rounded-full">
                                    {circle.memberIds?.length || 1} member(s)
                                  </Badge>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1">{circle.description || "No description provided."}</p>
                                {circle.readingPath && (
                                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-primary font-bold uppercase tracking-wider">
                                    <Compass className="h-3.5 w-3.5" /> Day {circle.currentDay || 1}: {circle.readingPath}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="py-20 text-center opacity-30 flex flex-col items-center gap-4">
                            <Users className="h-8 w-8" />
                            <p className="text-xs font-bold uppercase tracking-widest">No Circles joined.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column: Selected Circle Dashboard */}
                  <div className="lg:col-span-8 space-y-6">
                    {selectedCircle ? (
                      <div className="space-y-6 animate-in fade-in duration-500">
                        {/* Circle Details & Invite */}
                        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
                          <div className="bg-brand-gradient h-1.5 w-full" />
                          <CardContent className="p-8 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="space-y-1">
                                <h2 className="text-2xl font-headline font-bold text-slate-900">{selectedCircle.name}</h2>
                                <p className="text-sm text-slate-500 leading-relaxed font-body">{selectedCircle.description || "No description provided."}</p>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                                  Circle Admin: {selectedCircle.ownerName}
                                </div>
                              </div>

                              {selectedCircle.readingPath && (
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col gap-2 shrink-0">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Linked Reading Plan</span>
                                  <div className="flex items-center justify-between gap-6">
                                    <span className="text-sm font-bold text-primary uppercase">{selectedCircle.readingPath}</span>
                                    <Badge className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">Day {selectedCircle.currentDay || 1}</Badge>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    className="w-full text-[11px] font-bold rounded-lg h-8 border-none btn-gradient mt-1 shadow-sm"
                                    onClick={() => {
                                      window.location.href = `/reader?path=${selectedCircle.readingPath}&day=${selectedCircle.currentDay || 1}`;
                                    }}
                                  >
                                    Study Today's Verse
                                  </Button>
                                </div>
                              )}
                            </div>

                            <Separator />

                            {/* Invite Section */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Add Circle Members
                              </h4>
                              <form onSubmit={handleInviteMember} className="flex gap-3">
                                <Input
                                  type="email"
                                  placeholder="Enter scholar email address (e.g. john@example.com)..."
                                  value={inviteEmail}
                                  onChange={(e) => setInviteEmail(e.target.value)}
                                  required
                                  className="h-10 text-xs rounded-xl"
                                />
                                <Button type="submit" disabled={isInviting} size="sm" className="h-10 px-6 font-bold rounded-xl btn-gradient shrink-0">
                                  {isInviting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Invite"}
                                </Button>
                              </form>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Circle feed */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Feed post form */}
                          <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white p-6 md:col-span-4 h-fit space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                              <StickyNote className="h-4 w-4" /> Share Insight
                            </h3>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verse Reference</label>
                                <Input
                                  value={circlePostRef}
                                  onChange={(e) => setCirclePostRef(e.target.value)}
                                  placeholder="e.g. John 3:16"
                                  className="h-9 text-xs rounded-xl"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Insight/Annotation</label>
                                <Textarea
                                  value={circlePostComment}
                                  onChange={(e) => setCirclePostComment(e.target.value)}
                                  placeholder="Commentary on the verse..."
                                  className="min-h-[100px] text-xs rounded-xl p-3"
                                />
                              </div>
                              <Button
                                onClick={handlePostCircleInsight}
                                disabled={!circlePostComment.trim() || !circlePostRef.trim()}
                                className="w-full btn-gradient rounded-xl font-bold h-9 text-xs gap-1.5"
                              >
                                Post Insight <Send className="h-3 w-3" />
                              </Button>
                            </div>
                          </Card>

                          {/* Feed comments stream */}
                          <Card className="border-none shadow-md rounded-3xl overflow-hidden bg-white flex flex-col md:col-span-8 min-h-[450px]">
                            <CardHeader className="p-6 pb-4 border-b border-slate-50">
                              <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-slate-700">
                                <Compass className="h-4 w-4" /> Discussion Feed
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 flex-1 flex flex-col">
                              <ScrollArea className="flex-1 max-h-[450px]">
                                {isCircleFeedLoading ? (
                                  <div className="py-20 flex flex-col items-center opacity-30 gap-2">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Syncing feed...</span>
                                  </div>
                                ) : sortedCircleFeed && sortedCircleFeed.length > 0 ? (
                                  <div className="divide-y divide-slate-50">
                                    {sortedCircleFeed.map((item: any) => (
                                      <div key={item.id} className="p-6 space-y-3 hover:bg-slate-50/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                          <div className="h-9 w-9 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {item.userDisplayName?.charAt(0) || "S"}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                              <span className="font-bold text-xs text-slate-900 truncate">{item.userDisplayName}</span>
                                              <Badge className="bg-slate-100 text-slate-600 border-none text-[9px] hover:bg-slate-100 font-bold px-1.5 py-0.5 rounded">
                                                {item.passageRef}
                                              </Badge>
                                            </div>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                              {item.createdAt?.seconds 
                                                ? new Date(item.createdAt.seconds * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' })
                                                : "Just now"}
                                            </span>
                                          </div>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed font-body pl-1">{item.comment}</p>
                                        
                                        {/* Reactions row */}
                                        <div className="flex gap-2 pt-1 pl-1">
                                          <button
                                            onClick={() => handleToggleReaction(item.id, 'insightful')}
                                            className={cn(
                                              "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-slate-150 hover:bg-primary/5 transition-colors font-bold text-slate-400",
                                              user && item.reactions?.insightful?.includes(user.uid) && "bg-primary/10 border-primary/20 text-primary"
                                            )}
                                          >
                                            💡 {item.reactions?.insightful?.length || 0}
                                          </button>
                                          <button
                                            onClick={() => handleToggleReaction(item.id, 'needsContext')}
                                            className={cn(
                                              "flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-slate-150 hover:bg-primary/5 transition-colors font-bold text-slate-400",
                                              user && item.reactions?.needsContext?.includes(user.uid) && "bg-amber-500/10 border-amber-500/20 text-amber-600"
                                            )}
                                          >
                                            ❓ {item.reactions?.needsContext?.length || 0}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="py-20 text-center opacity-30 flex flex-col items-center gap-4">
                                    <StickyNote className="h-8 w-8" />
                                    <p className="text-xs font-bold uppercase tracking-widest">Feed is empty.</p>
                                  </div>
                                )}
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <Card className="border-none shadow-sm rounded-3xl flex flex-col items-center justify-center text-center p-20 h-[500px] opacity-40">
                        <Users className="h-12 w-12 mb-4 text-slate-400" />
                        <h3 className="text-xl font-headline font-bold">Select a Study Circle</h3>
                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed font-body pt-1">
                          Select one of your circles from the list to synchronize path and view notes.
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
