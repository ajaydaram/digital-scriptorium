"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GuidedAscentStepper } from "@/components/guided-ascent-stepper";
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
import { getPlanDay, type PathId } from "@/lib/reading-plans";
import { 
  useUser, 
  useFirestore, 
  useCollection, 
  useMemoFirebase 
} from "@/firebase";
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Bookmark, 
  Share2, 
  Search, 
  Loader2,
  Sun,
  Moon,
  MessageSquare,
  Send,
  AlertCircle,
  Calendar,
  Users,
  Quote
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ReaderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const pathParam = searchParams.get('path') as PathId | null;
  const dayParam = parseInt(searchParams.get('day') || "0");
  const initialRef = searchParams.get('reference') || "John 3:16";

  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentRef, setCurrentRef] = useState(initialRef);
  const [version, setVersion] = useState(SUPPORTED_VERSIONS[0].id);
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [error, setError] = useState<string | null>(null);
  
  // Annotation State
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync reference with plan if path and day are present
  useEffect(() => {
    if (pathParam && dayParam > 0) {
      const planDay = getPlanDay(pathParam, dayParam);
      if (planDay) {
        setCurrentRef(planDay.reference);
        setSearchQuery(planDay.reference);
      }
    } else if (!searchQuery) {
      setSearchQuery(initialRef);
    }
  }, [pathParam, dayParam, initialRef]);

  // Fetch Annotations in real-time
  const annotationsQuery = useMemoFirebase(() => {
    if (!db || !currentRef) return null;
    return getAnnotationsQuery(db, currentRef);
  }, [db, currentRef]);

  const { data: annotations, isLoading: annotationsLoading } = useCollection(annotationsQuery);

  useEffect(() => {
    if (currentRef) {
      loadScripture(currentRef, version);
    }
  }, [currentRef, version]);

  const loadScripture = async (ref: string, v: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
    } catch (error: any) {
      setError(error.message || "Could not retrieve this passage. Please try a different reference.");
      toast({
        variant: "destructive",
        title: "Passage Error",
        description: `Could not retrieve "${ref}".`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentRef(searchQuery.trim());
      if (pathParam) {
        router.push(`/reader?reference=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleNextDay = () => {
    if (pathParam && dayParam) {
      router.push(`/reader?path=${pathParam}&day=${dayParam + 1}`);
    }
  };

  const handlePrevDay = () => {
    if (pathParam && dayParam > 1) {
      router.push(`/reader?path=${pathParam}&day=${dayParam - 1}`);
    }
  };

  const handleAnnotate = () => {
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to publish scholarly insights." });
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Non-blocking save to global annotations
      saveAnnotation(db!, user, currentRef, scripture?.text || "", newComment);
      setNewComment("");
      toast({ title: "Insight Published", description: "Your theological note is now part of the living commentary." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save annotation." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === "dark";
  const planDay = pathParam && dayParam > 0 ? getPlanDay(pathParam, dayParam) : null;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 selection:bg-primary/20",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-headline font-bold tracking-tight">Enhanced Reader</h1>
              <Button 
                variant="ghost" size="icon" 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className="rounded-full hover:bg-primary/10"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            {pathParam && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-[0.2em] border-primary/30 text-primary">
                  {pathParam.toUpperCase()} PATH
                </Badge>
                {planDay && (
                  <span className="text-xs text-slate-500 font-bold">
                    • {planDay.title}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 lg:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Reference e.g. Romans 8:28"
                  className={cn(
                    "pl-11 h-11 rounded-xl transition-all shadow-sm border-slate-200 focus:ring-primary/20",
                    isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white"
                  )}
                />
              </form>
              <BibleVersionSwitcher currentVersion={version} onVersionChange={setVersion} />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-11 w-11 shadow-sm"><Bookmark className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-11 w-11 shadow-sm"><Share2 className="h-4 w-4" /></Button>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Reading Column */}
          <div className="lg:col-span-3 space-y-8">
            <Card className={cn(
              "border-none shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[700px] flex flex-col",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-1.5 w-full" />
              
              <div className="px-8 md:px-16 pt-12">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-8 md:p-20 flex-1 pt-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 opacity-30">
                    <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                    <p className="text-sm font-bold uppercase tracking-widest">Consulting the Scriptorium...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center max-w-md mx-auto">
                    <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Retrieval Error</h3>
                    <p className="text-sm text-slate-500 mb-6">{error}</p>
                    <Button variant="outline" onClick={() => loadScripture(currentRef, version)} className="rounded-xl">Try Again</Button>
                  </div>
                ) : scripture ? (
                  <article className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <header className="text-center space-y-4">
                      <h2 className={cn("text-5xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h2>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {SUPPORTED_VERSIONS.find(v => v.id === version)?.name}
                      </p>
                    </header>
                    
                    <div className={cn(
                      "bible-reader-text leading-[2.2] font-serif transition-colors duration-500",
                      isDark ? "text-slate-300" : "text-slate-800"
                    )}>
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    </div>
                    
                    {pathParam && (
                      <div className="pt-12 flex items-center justify-center gap-6">
                        <Button 
                          variant="ghost" 
                          onClick={handlePrevDay} 
                          disabled={dayParam <= 1}
                          className="rounded-xl gap-2 font-bold text-xs uppercase tracking-widest"
                        >
                          <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                        <Separator orientation="vertical" className="h-10" />
                        <Button 
                          variant="ghost" 
                          onClick={handleNextDay}
                          className="rounded-xl gap-2 font-bold text-xs uppercase tracking-widest"
                        >
                          Next <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </article>
                ) : null}
              </CardContent>
            </Card>

            {/* Annotation Input - Horizontal Polish */}
            <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Quote className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xl">Capture Insight</h4>
                    <p className="text-sm text-slate-500">Attach your theological observation to {currentRef}.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Textarea 
                    placeholder="What does this passage reveal about the Grand Historical Narrative?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={cn(
                      "min-h-[120px] rounded-2xl p-6 text-base leading-relaxed focus:ring-primary/20 border-slate-200",
                      isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50"
                    )}
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAnnotate} 
                      disabled={isSubmitting || !newComment.trim()}
                      className="btn-gradient px-10 py-6 h-auto font-bold rounded-xl gap-3 shadow-xl shadow-primary/20"
                    >
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      Post Insight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Community Feed */}
          <aside className="space-y-6">
            <Card className={cn("border-none shadow-xl rounded-[2rem] overflow-hidden flex flex-col", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="p-6 pb-4 border-b border-slate-100/10 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> Scholarly Feed
                  </CardTitle>
                  <Badge variant="secondary" className="text-[9px] font-bold h-5">
                    {annotationsLoading ? "..." : annotations?.length || 0}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <ScrollArea className="h-[500px]">
                  <div className="divide-y divide-slate-100/10">
                    {annotationsLoading ? (
                      <div className="p-12 text-center opacity-30">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Reading Feed...</p>
                      </div>
                    ) : annotations && annotations.length > 0 ? (
                      annotations.map((ann) => (
                        <div key={ann.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-8 w-8 border border-slate-200">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                                {ann.userDisplayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate">{ann.userDisplayName}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                {ann.createdAt?.toDate ? new Date(ann.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                            {ann.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center opacity-20">
                        <MessageSquare className="h-10 w-10 mx-auto mb-4" />
                        <p className="text-xs font-bold italic uppercase tracking-widest leading-loose">
                          Be the first to share<br />an insight on this passage
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className={cn("border-none shadow-xl rounded-[2rem] bg-brand-gradient/5 border border-primary/10", isDark ? "bg-slate-900/40" : "")}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">AI Scholarly Guide</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate a deep-dive analysis of the original language and narrative context of <strong>{currentRef}</strong>.
                </p>
                <Button className="w-full btn-gradient font-bold h-11 text-[10px] rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20">
                  Analyze Context
                </Button>
              </CardContent>
            </Card>
            
            {pathParam && (
              <Card className={cn("border-none shadow-xl rounded-[2rem] bg-slate-100 dark:bg-slate-900/40 border border-slate-200")}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Journey Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400">
                      <span>Day {dayParam}</span>
                      <span className="text-primary">{Math.round((dayParam / 365) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gradient" style={{ width: `${(dayParam / 365) * 100}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </main>

      <style jsx global>{`
        .bible-reader-text {
          font-size: 1.35rem;
          line-height: 2.2;
          max-width: 75ch;
          margin-left: auto;
          margin-right: auto;
        }
        .bible-reader-text sup {
          font-size: 0.65rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 0.8rem;
          vertical-align: super;
          font-family: 'Space Grotesk', sans-serif;
        }
        .bible-reader-text p {
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .bible-reader-text {
            font-size: 1.15rem;
            line-height: 1.9;
          }
        }
      `}</style>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <ReaderContent />
    </Suspense>
  );
}
