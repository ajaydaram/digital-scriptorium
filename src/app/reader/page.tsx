
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GuidedAscent } from "@/components/guided-ascent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getScripture, type Scripture, SUPPORTED_VERSIONS } from "@/services/bibleService";
import { BibleVersionSwitcher } from "@/components/bible-version-switcher";
import { saveAnnotation, getAnnotationsQuery } from "@/services/annotationService";
import { 
  useUser, 
  useFirestore, 
  useCollection, 
  useMemoFirebase 
} from "@/firebase";
import { 
  Sparkles, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Search, 
  Loader2,
  Sun,
  Moon,
  MessageSquare,
  Send,
  User as UserIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ReaderContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('reference') || "John 3:16";
  const initialPath = searchParams.get('path') || null;

  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Annotation State
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Annotations
  const annotationsQuery = useMemoFirebase(() => {
    if (!db || !currentRef) return null;
    return getAnnotationsQuery(db, currentRef);
  }, [db, currentRef]);

  const { data: annotations, isLoading: annotationsLoading } = useCollection(annotationsQuery);

  useEffect(() => {
    loadScripture(currentRef, version);
  }, [currentRef, version]);

  const loadScripture = async (ref: string, v: string) => {
    setLoading(true);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Passage Not Found",
        description: `Could not retrieve "${ref}". Try a different reference.`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentRef(searchQuery.trim());
    }
  };

  const handleAnnotate = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save scholarly annotations.",
      });
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      saveAnnotation(db!, user, currentRef, scripture?.text || "", newComment);
      setNewComment("");
      toast({
        title: "Annotation Saved",
        description: "Your scholarly insight has been added to the social feed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save annotation.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-headline font-bold">Enhanced Reader</h1>
            {initialPath && (
              <Badge variant="secondary" className="bg-primary/10 text-primary font-bold uppercase tracking-widest border-none">
                {initialPath.charAt(0).toUpperCase() + initialPath.slice(1)} Path
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Search & Versions */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Romans 8:28..."
              className={cn(
                "pl-11 h-12 rounded-xl transition-all shadow-sm",
                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200"
              )}
            />
          </form>
          
          <div className="flex items-center gap-4">
            <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon" className="rounded-xl"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Reading Column */}
          <div className="lg:col-span-2">
            <Card className={cn(
              "border-none shadow-xl overflow-hidden rounded-3xl min-h-[500px]",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-2 w-full" />
              <CardContent className="p-8 md:p-12">
                <div className="mb-12">
                  <GuidedAscent currentStep="Read" onStepClick={() => {}} />
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 opacity-40">
                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                    <p className="text-sm font-medium">Retrieving Scripture...</p>
                  </div>
                ) : scripture ? (
                  <div className="space-y-8 animate-in fade-in duration-700">
                    <div className="flex items-center justify-between">
                      <h3 className={cn("text-3xl font-headline font-bold", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h3>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">
                        {SUPPORTED_VERSIONS.find(v => v.id === version)?.name}
                      </Badge>
                    </div>
                    <div className={cn(
                      "prose lg:prose-xl max-w-none leading-relaxed font-serif",
                      isDark ? "prose-invert" : "prose-slate"
                    )}>
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            {/* Annotation Input */}
            <Card className={cn("mt-8 border-none shadow-lg", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h4 className="font-headline font-bold">Add Scholarly Annotation</h4>
                </div>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Share your theological insight or contextual observation..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={cn(
                      "min-h-[100px] rounded-xl focus:ring-primary/20",
                      isDark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"
                    )}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAnnotate} 
                      disabled={isSubmitting || !newComment.trim()}
                      className="btn-gradient px-8 py-5 h-auto font-bold rounded-xl gap-2"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      Publish Insight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Social Feed & AI */}
          <div className="space-y-6">
            <Card className={cn("border-none shadow-lg", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="pb-4 border-b border-slate-100/10">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" /> Scholarly Study Feed
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest">
                  {currentRef} Insights
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="divide-y divide-slate-100/10">
                    {annotationsLoading ? (
                      <div className="p-8 text-center opacity-40">
                        <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                        <p className="text-[10px] font-bold uppercase">Loading Insights...</p>
                      </div>
                    ) : annotations && annotations.length > 0 ? (
                      annotations.map((ann) => (
                        <div key={ann.id} className="p-5 hover:bg-slate-500/5 transition-colors group">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                                {ann.userDisplayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {ann.userDisplayName}
                              </p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                {ann.createdAt?.toDate ? new Date(ann.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                            "{ann.comment}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center opacity-20">
                        <MessageSquare className="h-10 w-10 mx-auto mb-4" />
                        <p className="text-xs font-medium italic">No annotations yet for this passage. Be the first to share an insight!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* AI Guide Card */}
            <Card className={cn("border-none shadow-lg bg-primary/5", isDark ? "border-primary/20" : "")}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Scholarly Guide</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Unlock AI-powered analysis of {currentRef}. Get historical context, original language roots, and theological coherence mapping.
                </p>
                <Button className="w-full btn-gradient font-bold h-10 text-xs rounded-xl shadow-lg shadow-primary/20">
                  Generate Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
