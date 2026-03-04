"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  AlertCircle
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
  const [error, setError] = useState<string | null>(null);
  
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
    setError(null);
    try {
      const data = await getScripture(ref, v);
      setScripture(data);
    } catch (error: any) {
      setError(error.message || "Could not retrieve this passage. Please try a different reference or check your connection.");
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
      "min-h-screen transition-colors duration-300 selection:bg-primary/20",
      isDark ? "bg-[#0F172A] text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Top Navigation & Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-headline font-bold tracking-tight">Enhanced Reader</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className="rounded-full hover:bg-primary/10"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            {initialPath && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-[0.2em] border-primary/30 text-primary">
                  {initialPath} JOURNEY
                </Badge>
                <Separator orientation="vertical" className="h-3" />
                <span className="text-xs text-slate-500 font-medium">Currently following the {initialPath} reading path</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 lg:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter reference e.g. Romans 8:28"
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
          {/* Main Reading Area */}
          <div className="lg:col-span-3 space-y-8">
            <Card className={cn(
              "border-none shadow-2xl rounded-[2rem] overflow-hidden min-h-[600px] flex flex-col",
              isDark ? "bg-[#1E293B]" : "bg-white"
            )}>
              <div className="bg-brand-gradient h-1.5 w-full" />
              
              <div className="px-8 md:px-12 pt-8">
                <GuidedAscentStepper />
              </div>

              <CardContent className="p-12 md:p-20 flex-1 pt-4">
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
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{error}</p>
                    <Button variant="outline" onClick={() => loadScripture(currentRef, version)} className="rounded-xl font-bold">
                      Try Again
                    </Button>
                  </div>
                ) : scripture ? (
                  <article className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <header className="text-center space-y-4">
                      <h2 className={cn("text-5xl font-headline font-bold tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                        {scripture.reference}
                      </h2>
                      <div className="flex items-center justify-center gap-4">
                        <Separator className="w-12" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                          {SUPPORTED_VERSIONS.find(v => v.id === version)?.name}
                        </span>
                        <Separator className="w-12" />
                      </div>
                    </header>
                    
                    <div className={cn(
                      "bible-reader-text leading-[2] font-serif transition-colors duration-500",
                      isDark ? "text-slate-300" : "text-slate-800"
                    )}>
                      <div dangerouslySetInnerHTML={{ __html: scripture.text }} />
                    </div>
                    
                    <footer className="pt-12 border-t border-slate-100/10 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        End of Passage • Content Provided by API.Bible
                      </p>
                    </footer>
                  </article>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 opacity-20 text-center">
                    <Search className="h-16 w-16 mb-6" />
                    <p className="text-lg font-medium">Search for a reference to begin your ascent</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scholarly Input Section */}
            <Card className={cn("border-none shadow-xl rounded-3xl", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Scholarly Annotation</h4>
                    <p className="text-xs text-slate-500">Capture your theological insights for the community.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Attach a contextual observation or theological note to this passage..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={cn(
                      "min-h-[120px] rounded-2xl p-6 text-base leading-relaxed focus:ring-primary/20 border-slate-200",
                      isDark ? "bg-slate-900 border-slate-800" : "bg-slate-50"
                    )}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {newComment.length} characters
                    </p>
                    <Button 
                      onClick={handleAnnotate} 
                      disabled={isSubmitting || !newComment.trim()}
                      className="btn-gradient px-10 py-6 h-auto font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      Publish Insight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Metadata & Social */}
          <aside className="space-y-6">
            <Card className={cn("border-none shadow-xl rounded-3xl overflow-hidden", isDark ? "bg-[#1E293B]" : "bg-white")}>
              <CardHeader className="pb-4 border-b border-slate-100/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> Community Insights
                  </CardTitle>
                  <Badge variant="outline" className="text-[9px] font-bold">{annotations?.length || 0}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="divide-y divide-slate-100/10">
                    {annotationsLoading ? (
                      <div className="p-12 text-center opacity-30">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Reading Stream...</p>
                      </div>
                    ) : annotations && annotations.length > 0 ? (
                      annotations.map((ann) => (
                        <div key={ann.id} className="p-6 hover:bg-primary/[0.02] transition-colors group">
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-9 w-9 border-2 border-slate-100/10 shadow-sm">
                              <AvatarImage src={ann.userAvatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {ann.userDisplayName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">
                                {ann.userDisplayName}
                              </p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                {ann.createdAt?.toDate ? new Date(ann.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-100/20 pl-4 py-1">
                            "{ann.comment}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-16 text-center opacity-20">
                        <MessageSquare className="h-12 w-12 mx-auto mb-6" />
                        <p className="text-xs font-bold italic uppercase tracking-widest">No Annotations Yet</p>
                        <p className="text-[10px] mt-2">Be the first scholar to contribute.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className={cn("border-none shadow-xl rounded-3xl bg-primary/5 border border-primary/10", isDark ? "bg-slate-900/40" : "")}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">AI Pedagogical Guide</span>
                </div>
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Analyze the historical context and original linguistic roots of <strong className="text-primary">{currentRef}</strong>.
                  </p>
                  <Button className="w-full btn-gradient font-bold h-12 text-xs rounded-xl shadow-lg shadow-primary/20 group">
                    Generate Context Analysis <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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
        .bible-reader-text p {
          margin-bottom: 2.5rem;
        }
        .bible-reader-text sup {
          font-size: 0.65rem;
          font-weight: 800;
          color: #94A3B8;
          margin-right: 0.75rem;
          vertical-align: super;
          font-family: 'Space Grotesk', sans-serif;
        }
        @media (max-width: 768px) {
          .bible-reader-text {
            font-size: 1.15rem;
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
